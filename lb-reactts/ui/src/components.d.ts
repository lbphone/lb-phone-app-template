interface GameRender {
    quality: number
    xOffset: number
    yOffset: number
    recorder: MediaRecorder | undefined
    recording: boolean
    destroyed: boolean
    canvas: HTMLCanvasElement | null
    gl: WebGLRenderingContext | null
    program: WebGLProgram | null
    paused: boolean
    viewport: {
        x: number
        y: number
        width: number
        height: number
    }
    canvasSize: {
        width: number
        height: number
    }
    animationFrame: number | null
    mainTexture: WebGLTexture | null
    hasPrevFrame: boolean
    prevTextures: WebGLTexture[]
    prevBuffers: WebGLFramebuffer[]

    pause(): void
    resume(): void
    resize(width: number, height: number): void
    resizeByAspect(ratio: number): void
    setQuality(quality: number): void
    setXOffset(offset: number): void
    setYOffset(offset: number): void
    destroy(keepCanvas?: boolean): void
    takePhoto(): Promise<Blob>
    startRecording(cb: (blob: Blob) => void): MediaRecorder | undefined
    render(): void
}

type ContactsData = {
    number: string
    name?: string
    firstname?: string
    lastname?: string
    email?: string
    address?: string
    favourite?: boolean
    blocked?: boolean
    avatar?: string
    company?: string
    from?: string
}

type PopUp = {
    title: string
    description?: string
    vertical?: boolean

    inputs?: PopUpInput[]
    input?: PopUpInput

    contact?: ContactsData
    attachment?: {
        src: string
    }
    buttons: {
        title: string
        cb?: () => void
        disabled?: boolean
        bold?: boolean

        color?: 'red' | 'blue'
    }[]
}

type PopUpInput = Partial<HTMLInputElement> & {
    minCharacters?: number
    maxCharacters?: number
    onChange?: (value: string) => void
}

type CameraComponentData = {
    default?: {
        type?: 'Photo' | 'Video' | 'Landscape'
        flash?: boolean
        camera?: 'rear' | 'front'
    }
    permissions?: {
        toggleFlash?: boolean
        flipCamera?: boolean
        takePhoto?: boolean
        takeVideo?: boolean
        takeLandscapePhoto?: boolean
    }
    saveToGallery?: boolean
}

type MusicSelectorData = {
    onSelect: (data: { id: string; src: string; title: string; artist: string; album: string }) => void
    searchQuery?: string
    artist?: string
    album?: string
}

type Contextmenu = {
    title?: string
    buttons: {
        title: string
        color?: 'red' | 'blue'
        disabled?: boolean
        cb?: () => void
    }[]
}

type PhotoData = {
    id: number
    src: string
    timestamp?: number

    type?: string
    favourite?: boolean
    isVideo?: boolean

    size?: number

    duration?: number
}

type GalleryData = {
    includeVideos?: boolean
    includeImages?: boolean
    allowExternal?: boolean
    multiSelect?: boolean

    onCancel?: () => void
    onSelect: (data: PhotoData | PhotoData[]) => void
}

type GifSelectorData = {
    onSelect: (gif: string) => void
}

type SwitchProps = {
    disabled?: boolean
    theme?: 'light' | 'dark'
    checked?: boolean
    defaultChecked?: boolean
    onChange?: () => void
}

type FullscreenImagedata = {
    display: boolean
    image?: string
}

type ColorPickerData = {
    customApp?: boolean
    defaultColor?: string
    onSelect: (color: string) => void
    onClose?: (color: string) => void
}

type ShareComponentData = {
    type: 'image' | 'contact' | 'location' | 'note' | 'voicememo'
    data?: {
        // image
        isVideo?: boolean
        src?: string

        // contact
        number?: string
        firstname?: string
        lastname?: string
        avatar?: string
        email?: string
        address?: string

        //location
        name?: string
        location?: unknown

        //note
        title?: string
        content?: string
        timestamp?: number

        //voicememo
        duration?: number

        // timestamp?: number;
        // src?: string;
    }
}

type ContactSelectorData = {
    onSelect: (contact: ContactsData) => void
    filter?: string[]
    options?: {
        allowPhoneNumber?: boolean
    }
}

type Settings = {
    airplaneMode: boolean
    streamerMode: boolean
    doNotDisturb: boolean
    locale: string

    name: string
    avatar?: string
    address?: string
    email?: string

    display: {
        brightness: number
        size: number
        theme: 'dark' | 'light'
        automatic: boolean
        frameColor?: string
    }
    security: {
        pinCode: boolean
        faceId: boolean
    }
    wallpaper: {
        background: string
        blur?: boolean
    }
    time: {
        twelveHourClock: boolean
    }
    sound: {
        volume: number
        ringtone: string
        texttone: string
        silent: boolean
    }
    weather: {
        celcius: boolean
    }
    storage: {
        used: number
        total: number
    }
    phone: {
        showCallerId: boolean
    }
    notifications?: {
        [key: string]: {
            enabled: boolean
            sound: boolean
        }
    }
    lockscreen: {
        color: string
        fontStyle: number
        layout: number
    }
    apps: string[][]

    version?: string
    latestVersion?: string
}

declare global {
    var components: {
        createGameRender: (canvas: HTMLCanvasElement) => GameRender
        uploadMedia: (uploadType: 'Video' | 'Image' | 'Audio', blob: Blob) => Promise<string>
        saveToGallery: (url: string, size?: number, type?: 'screenshot' | 'selfie' | 'import', shouldLog?: boolean) => Promise<unknown>
        fetchPhone: (eventName: string, data?: unknown, mockData?: unknown) => Promise<unknown>
        setColorPicker: (data: ColorPickerData) => void
        setPopUp: (data: PopUp) => void
        setContextMenu: (data: Contextmenu) => void
        setMusicSelector: (data: MusicSelectorData) => void
        setContactSelector: (data: ContactSelectorData) => void
        setEmojiPickerVisible: (
            data?:
                | false
                | {
                      onSelect: (emoji?: { activeSkinTone?: string; emoji?: string; names?: string[] }) => void
                  }
        ) => void
        setShareComponent: (data: ShareComponentData) => void
        setGifPickerVisible: (data: GifSelectorData) => void
        setGallery: (data: GalleryData) => void
        setFullscreenImage: (data: string) => void
        setHomeIndicatorVisible: (visible: boolean) => void
    }
    var fetchNui: <T>(eventName: string, data?: unknown, mockData?: T) => Promise<T>
    var useNuiEvent: <T>(eventName: string, cb: (data: T) => void) => void
    var formatPhoneNumber: (number: string) => string
    var getSettings: () => Promise<Settings>
    var onSettingsChange: (cb: (settings: Settings) => void) => void
    var setApp: (app: string | { name: string; data: any }) => void
    var createCall: (options: { number?: string; videoCall?: boolean; company?: string; hideNumber?: boolean }) => void
    var sendNotification: (data: {
        title: string
        content?: string
        thumbnail?: string
        avatar?: string
        showAvatar?: boolean
        source?: number
    }) => void
    var useCamera: (cb: (url: string) => void, options: CameraComponentData) => void
    var settings: Settings
    var appName: string
    var resourceName: string
}

export {}
