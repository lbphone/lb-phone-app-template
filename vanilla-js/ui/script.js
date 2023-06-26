document.getElementById('context').onclick = () => {
    let notificationText = document.getElementById('notificationText').value;
    if (notificationText === '') notificationText = 'Notification text';

    setContextMenu({
        title: 'Context menu',
        buttons: [
            {
                title: 'Phone Notification',
                color: 'blue',
                cb: () => {
                    sendNotification({ title: notificationText });
                }
            },
            {
                title: 'GTA Notification',
                color: 'red',
                cb: () => {
                    fetchNui('drawNotification', { message: notificationText });
                }
            }
        ]
    });
};

document.getElementById('gallery').onclick = () => {
    selectGallery({
        includeVideos: true,
        includeImages: true,
        cb: (data) => {
            setPopUp({
                title: 'Selected media',
                attachment: data,
                buttons: [
                    {
                        title: 'OK'
                    }
                ]
            });
        }
    });
};

document.getElementById('popup').onclick = () => {
    setPopUp({
        title: 'Popup Menu',
        description: 'Confirm your choice',
        buttons: [
            {
                title: 'Cancel',
                color: 'red',
                cb: () => {
                    console.log('Cancel');
                }
            },
            {
                title: 'Confirm',
                color: 'blue',
                cb: () => {
                    console.log('Confirm');
                }
            }
        ]
    });
};

document.getElementById('gif').onclick = () => {
    selectGIF((gif) => {
        setPopUp({
            title: 'Selected GIF',
            attachment: { src: gif },
            buttons: [
                {
                    title: 'OK'
                }
            ]
        });
    });
};

document.getElementById('emoji').onclick = () => {
    selectEmoji((emoji) => {
        setPopUp({
            title: 'Selected emoji',
            description: emoji,
            buttons: [
                {
                    title: 'OK'
                }
            ]
        });
    });
};

document.getElementById('colorpicker').onclick = () => {
    colorPicker((color) => {
        setPopUp({
            title: 'Selected color',
            description: color,
            buttons: [
                {
                    title: 'OK'
                }
            ]
        });
    });
};

document.getElementById('cameracomponent').onclick = () => {
    useCamera(
        (url) => {
            setPopUp({
                title: 'Media taken',
                attachment: { src: url },
                buttons: [
                    {
                        title: 'OK'
                    }
                ]
            });
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
    );
};

onSettingsChange((settings) => {
    let theme = settings.display.theme;
    document.getElementsByClassName('app')[0].dataset.theme = theme;
});

getSettings().then((settings) => {
    let theme = settings.display.theme;
    document.getElementsByClassName('app')[0].dataset.theme = theme;
});
