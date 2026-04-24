import { ReactNode, useEffect, useRef, useState } from 'react'
import './App.css'
import Frame from './components/Frame'

const devMode = !window?.['invokeNative']

function Header() {
    const [direction, setDirection] = useState('N')

    useEffect(() => {
        if (devMode) return

        fetchNui<string>('getDirection').then(setDirection)
        useNuiEvent('updateDirection', setDirection)
    }, [])

    return (
        <div className='header'>
            <div className='title'>Custom App Template</div>
            <div className='subtitle'>React TS</div>
            <a className='subtitle'>{direction}</a>
        </div>
    )
}

function GameRender({ remove }: { remove: (photo?: string, blob?: Blob) => void }) {
    const aspectRatio = 9 / 18

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameRenderRef = useRef<ReturnType<typeof components.createGameRender>>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const gameRender = components.createGameRender(canvasRef.current)

        gameRenderRef.current = gameRender

        gameRender.resizeByAspect(aspectRatio)

        fetchNui('toggleCamera', true)

        const checkDestroyedInterval = setInterval(() => {
            if (gameRender.destroyed) remove()
        }, 1000)

        return () => {
            fetchNui('toggleCamera', false)

            if (checkDestroyedInterval) clearInterval(checkDestroyedInterval)

            gameRenderRef.current?.destroy()
        }
    }, [canvasRef.current])

    return (
        <div
            className='gamerender-blur'
            onClick={() => {
                remove()
            }}
        >
            <div
                className='gamerender-container'
                style={{
                    aspectRatio: aspectRatio
                }}
                onClick={(event) => {
                    event.stopPropagation()

                    const gameRender = gameRenderRef.current

                    if (!gameRender || gameRender.destroyed) return

                    gameRender.takePhoto().then((blob) => {
                        const url = URL.createObjectURL(blob)

                        remove(url, blob)
                    })
                }}
            >
                <canvas
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    ref={canvasRef}
                />
            </div>
        </div>
    )
}

function Map({ close }: { close: () => void }) {
    const mapsRef = useRef<any>(null)

    useEffect(() => {
        const scrollPosition = { x: window.scrollX, y: window.scrollY }

        window.scrollTo(0, 0)

        const disableScroll = (event: any) => {
            event.preventDefault()
        }

        window.addEventListener('scroll', disableScroll, { passive: false })

        return () => {
            window.removeEventListener('scroll', disableScroll)
            window.scrollTo(scrollPosition.x, scrollPosition.y)
        }
    }, [])

    useEffect(() => {
        if (!mapsRef.current) return

        const map = new components.GameMap(mapsRef.current)

        map.setShowSelf(true).then(() => {
            if (map.currentCoords) map.setPosition(map.currentCoords)
        })

        return () => {
            map.destroy()
        }
    }, [mapsRef.current])

    return (
        <div
            className='gamerender-blur'
            onClick={(e) => {
                if (e.target === e.currentTarget) close()
            }}
        >
            <div
                ref={mapsRef}
                style={{
                    width: '85%',
                    height: '85%',
                    borderRadius: '2em'
                }}
            ></div>
        </div>
    )
}

function AppProvider({ children }: { children: ReactNode }) {
    if (devMode) {
        function handleResize() {
            const { innerWidth, innerHeight } = window

            const aspectRatio = innerWidth / innerHeight
            const phoneAspectRatio = 27.6 / 59

            if (phoneAspectRatio < aspectRatio) {
                document.documentElement.style.fontSize = '1.66vh'
            } else {
                document.documentElement.style.fontSize = '3.4vw'
            }
        }

        useEffect(() => {
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [])

        handleResize()

        return (
            <div className='dev-wrapper'>
                <Frame>{children}</Frame>
            </div>
        )
    } else return children
}

export default function App() {
    const [mapVisible, setMapVisible] = useState(false)
    const [gameRenderVisible, setGameRenderVisible] = useState(false)
    const [notificationText, setNotificationText] = useState('Notification text')

    const appDiv = useRef(null)

    useEffect(() => {
        if (devMode) {
            document.body.style.visibility = 'visible'
            return
        }
    }, [])

    useEffect(() => {
        if (notificationText === '') setNotificationText('Notification text')
    }, [notificationText])

    return (
        <AppProvider>
            <div className='app' ref={appDiv}>
                <Header />
                <div className='button-wrapper'>
                    <button
                        onClick={() => {
                            components.setPopUp({
                                title: 'Popup Menu',
                                description: 'Confirm your choice',
                                buttons: [
                                    {
                                        title: 'Cancel',
                                        color: 'red',
                                        cb: () => {
                                            console.log('Cancel')
                                        }
                                    },
                                    {
                                        title: 'Confirm',
                                        color: 'blue',
                                        cb: () => {
                                            console.log('Confirm')
                                        }
                                    }
                                ]
                            })
                        }}
                    >
                        Popup Menu
                    </button>
                    <button
                        onClick={() => {
                            components.setContextMenu({
                                title: 'Context menu',
                                buttons: [
                                    {
                                        title: 'Phone Notification',
                                        color: 'blue',
                                        cb: () => {
                                            sendNotification({ title: notificationText })
                                        }
                                    },
                                    {
                                        title: 'GTA Notification',
                                        color: 'red',
                                        cb: () => {
                                            fetchNui('drawNotification', { message: notificationText })
                                        }
                                    }
                                ]
                            })
                        }}
                    >
                        Context menu
                    </button>
                    <button
                        onClick={() => {
                            components.setContactSelector({
                                onSelect(contact) {
                                    components.setPopUp({
                                        title: 'Selected contact',
                                        description: `${contact.firstname ?? '??'} ${contact.lastname ?? ''} ${
                                            contact.number
                                        }`,
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                }
                            })
                        }}
                    >
                        Contact Selector
                    </button>
                    <button
                        onClick={() => {
                            components.setGifPickerVisible({
                                onSelect(gif) {
                                    components.setPopUp({
                                        title: 'Selected GIF',
                                        attachment: { src: gif },
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                }
                            })
                        }}
                    >
                        Gif Selector
                    </button>
                    <button
                        onClick={() => {
                            components.setGallery({
                                includeVideos: true,
                                includeImages: true,
                                allowExternal: true,
                                multiSelect: false,

                                onSelect(data) {
                                    components.setPopUp({
                                        title: 'Selected media',
                                        attachment: { src: Array.isArray(data) ? data[0].src : data.src },
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                }
                            })
                        }}
                    >
                        Gallery Selector
                    </button>
                    <button
                        onClick={() => {
                            components.setEmojiPickerVisible({
                                onSelect: (emoji) => {
                                    components.setEmojiPickerVisible(false)
                                    components.setPopUp({
                                        title: 'Selected emoji',
                                        description: emoji.emoji,
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                }
                            })
                        }}
                    >
                        Emoji Selector
                    </button>
                    <button
                        onClick={() => {
                            components.setShareComponent({
                                type: 'image',
                                data: {
                                    isVideo: false,
                                    src: 'https://docs.lbscripts.com/images/icons/icon.png'
                                }
                            })
                        }}
                    >
                        Share
                    </button>
                    <button
                        onClick={() => {
                            components.setColorPicker({
                                onSelect(color) {},
                                onClose(color) {
                                    components.setPopUp({
                                        title: 'Selected color',
                                        description: color,
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                }
                            })
                        }}
                    >
                        Color Picker
                    </button>
                    <button
                        onClick={() => {
                            useCamera(
                                (url) => {
                                    components.setPopUp({
                                        title: 'Media taken',
                                        attachment: { src: url },
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    })
                                },
                                {
                                    default: {
                                        type: 'Photo', // 'Photo' | 'Video' | 'Landscape'
                                        flash: false,
                                        camera: 'rear' // 'rear' | 'front'
                                    },
                                    permissions: {
                                        toggleFlash: true,
                                        flipCamera: true,
                                        takePhoto: true,
                                        takeVideo: true,
                                        takeLandscapePhoto: true
                                    }
                                }
                            )
                        }}
                    >
                        Camera Component
                    </button>
                    <button
                        onClick={() => {
                            setGameRenderVisible((prev) => !prev)
                        }}
                    >
                        Game render
                    </button>
                    {gameRenderVisible && (
                        <GameRender
                            remove={(url, blob) => {
                                setGameRenderVisible(false)

                                if (url) {
                                    components.setPopUp({
                                        title: 'Photo taken',
                                        attachment: { src: url },
                                        buttons: [
                                            {
                                                title: 'Close',
                                                color: 'red'
                                            },
                                            {
                                                title: 'Save',
                                                color: 'blue',
                                                cb: async () => {
                                                    const url = await components.uploadMedia('Image', blob)

                                                    if (!url) return

                                                    components.saveToGallery(url)
                                                }
                                            }
                                        ]
                                    })
                                }
                            }}
                        />
                    )}
                    <button
                        onClick={() => {
                            setMapVisible((prev) => !prev)
                        }}
                    >
                        Map
                    </button>
                    {mapVisible && <Map close={() => setMapVisible(false)} />}
                    <input
                        placeholder='Notification text'
                        onChange={(e: any) => setNotificationText(e.target.value)}
                    ></input>
                </div>
            </div>
        </AppProvider>
    )
}
