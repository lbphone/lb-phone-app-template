<template>
    <AppProvider>
        <div v-if="hasKit" class="demo">
            <div class="demo-header">
                <div class="demo-title">Custom App Template</div>
                <div class="demo-subtitle">Vue.js · facing {{ direction }}</div>
            </div>

            <lb-group-header>Rows &amp; controls</lb-group-header>
            <lb-inset-group ref="controls">
                <lb-row>
                    <lb-row-content>
                        <lb-row-title>Wi-Fi</lb-row-title>
                        <lb-row-subtitle>Static lb-* tags</lb-row-subtitle>
                    </lb-row-content>
                    <lb-row-trailing>
                        <lb-row-value>Home-5G</lb-row-value>
                        <lb-row-chevron></lb-row-chevron>
                    </lb-row-trailing>
                </lb-row>
                <lb-row>
                    <lb-row-content>
                        <lb-row-title>Airplane Mode</lb-row-title>
                    </lb-row-content>
                    <lb-row-trailing>
                        <lb-toggle></lb-toggle>
                    </lb-row-trailing>
                </lb-row>
            </lb-inset-group>

            <lb-group-header>Phone components</lb-group-header>
            <div ref="componentsList"></div>

            <lb-group-header>Notifications</lb-group-header>
            <div class="demo-field-row">
                <input v-model="notification" placeholder="Notification text" />
            </div>
            <div ref="notificationActions"></div>
        </div>

        <div v-else class="dev-notice">
            <div class="demo-title">Custom App Template</div>
            <p>The LB Phone UI kit is provided by the phone at runtime.</p>
            <p>Launch this app inside LB Phone to preview the components.</p>
        </div>
    </AppProvider>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AppProvider from './AppProvider.vue';

const devMode = !window.invokeNative;
const hasKit = ref(!!window.LBKit);
const direction = ref('N');
const notification = ref('Hello from my app!');

const controls = ref(null);
const componentsList = ref(null);
const notificationActions = ref(null);

const notificationText = () => notification.value || 'Hello!';

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

onMounted(() => {
    if (devMode || !window.LBKit) return;

    LBKit.mount(componentsList.value, {
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

    LBKit.mount(notificationActions.value, {
        component: 'InsetGroup',
        children: [chevronRow('Send phone notification', sendPhoneNotification), chevronRow('Draw GTA notification', () => fetchNui('drawNotification', { message: notificationText() }))]
    });

    controls.value?.addEventListener('change', (event) => {
        if (event.target?.type === 'checkbox') console.log('airplane on?', event.target.checked);
    });

    fetchNui('getDirection').then((value) => (direction.value = value));
    window.addEventListener('message', (event) => {
        if (event.data?.type === 'updateDirection') direction.value = event.data.direction;
    });
});
</script>
