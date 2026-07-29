const notificationText = () => document.getElementById('notification-text').value || 'Hello!';

const showPopUp = () =>
    components.setPopUp({
        title: 'Pop-up',
        description: 'Confirm your choice',
        buttons: [
            { title: 'Cancel', color: 'red' },
            { title: 'Confirm', color: 'blue', cb: () => console.log('Confirmed') }
        ]
    });

const showContextMenu = () =>
    components.setContextMenu({
        title: 'Context menu',
        buttons: [
            { title: 'First option', color: 'blue', cb: () => console.log('First') },
            { title: 'Second option', cb: () => console.log('Second') }
        ]
    });

const pickFromGallery = () =>
    components.setGallery({
        includeImages: true,
        includeVideos: true,
        onSelect: (data) => {
            const photo = Array.isArray(data) ? data[0] : data;
            components.setPopUp({ title: 'Selected media', attachment: { src: photo.src }, buttons: [{ title: 'OK' }] });
        }
    });

const pickGif = () =>
    components.setGifPickerVisible({
        onSelect: (gif) => components.setPopUp({ title: 'Selected GIF', attachment: { src: gif }, buttons: [{ title: 'OK' }] })
    });

const pickEmoji = () =>
    components.setEmojiPickerVisible({
        onSelect: (emoji) => components.setPopUp({ title: 'Selected emoji', description: emoji?.emoji, buttons: [{ title: 'OK' }] })
    });

const pickColor = () =>
    components.setColorPicker({
        onSelect: () => {},
        onClose: (color) => components.setPopUp({ title: 'Selected color', description: color, buttons: [{ title: 'OK' }] })
    });

const pickContact = () =>
    components.setContactSelector({
        onSelect: (contact) => components.setPopUp({ title: contact.name ?? 'Contact', description: contact.number, buttons: [{ title: 'OK' }] })
    });

const openCamera = () =>
    components
        .fetchPhone('ShowComponent', { component: 'camera', default: { type: 'Photo', camera: 'rear' }, permissions: { takePhoto: true, flipCamera: true, toggleFlash: true } })
        .then((url) => {
            if (typeof url === 'string') components.setPopUp({ title: 'Photo taken', attachment: { src: url }, buttons: [{ title: 'OK' }] });
        });

const sendPhoneNotification = () => components.fetchPhone('SendNotification', { app: appIdentifier, title: 'Custom App Template', content: notificationText() });

const chevronRow = (title, onClick) => ({
    component: 'Row',
    props: { onClick },
    children: [
        { component: 'Row.Content', children: [{ component: 'Row.Title', children: title }] },
        { component: 'Row.Trailing', children: [{ component: 'Row.Chevron' }] }
    ]
});

LBKit.mount(document.getElementById('components-list'), {
    component: 'InsetGroup',
    children: [
        chevronRow('Pop-up', showPopUp),
        chevronRow('Context menu', showContextMenu),
        chevronRow('Gallery', pickFromGallery),
        chevronRow('GIF picker', pickGif),
        chevronRow('Emoji picker', pickEmoji),
        chevronRow('Color picker', pickColor),
        chevronRow('Contact selector', pickContact),
        chevronRow('Camera', openCamera)
    ]
});

LBKit.mount(document.getElementById('notification-actions'), {
    component: 'InsetGroup',
    children: [chevronRow('Send phone notification', sendPhoneNotification), chevronRow('Draw GTA notification', () => fetchNui('drawNotification', { message: notificationText() }))]
});

document.getElementById('controls').addEventListener('change', (event) => {
    if (event.target?.type === 'checkbox') console.log('airplane on?', event.target.checked);
});
