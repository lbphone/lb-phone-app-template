import React, { useEffect, useState } from './lb/react';
import Frame from './components/Frame';
import './App.css';

const devMode = !window.invokeNative;

export default function App() {
    return <AppProvider>{window.LBKit ? <Demo /> : <DevNotice />}</AppProvider>;
}

function Demo() {
    const { GroupHeader, InsetGroup, Row, Button, Toggle, Selectable, Field, TabSwitcher, Sheet, ActionSheet } = window.LBKit;

    const [airplane, setAirplane] = useState(false);
    const [plan, setPlan] = useState('weekly');
    const [tab, setTab] = useState('overview');
    const [notification, setNotification] = useState('Hello from my app!');
    const [sheetOpen, setSheetOpen] = useState(false);
    const [actionsOpen, setActionsOpen] = useState(false);

    return (
        <div className="demo">
            <Header />

            <GroupHeader>Rows &amp; controls</GroupHeader>
            <InsetGroup>
                <Row onClick={() => components.setPopUp({ title: 'Wi-Fi', description: 'This row is a plain LBKit Row.', buttons: [{ title: 'OK' }] })}>
                    <Row.Content>
                        <Row.Title>Wi-Fi</Row.Title>
                        <Row.Subtitle>Compound row with a value</Row.Subtitle>
                    </Row.Content>
                    <Row.Trailing>
                        <Row.Value>Home-5G</Row.Value>
                        <Row.Chevron />
                    </Row.Trailing>
                </Row>
                <Row>
                    <Row.Content>
                        <Row.Title>Airplane Mode</Row.Title>
                    </Row.Content>
                    <Row.Trailing>
                        <Toggle checked={airplane} onChange={() => setAirplane((value) => !value)} />
                    </Row.Trailing>
                </Row>
            </InsetGroup>

            <GroupHeader>Choose a plan</GroupHeader>
            <InsetGroup>
                <Selectable title="Weekly" description="Billed every week" selected={plan === 'weekly'} onSelect={() => setPlan('weekly')} />
                <Selectable title="Monthly" description="Billed every month" selected={plan === 'monthly'} onSelect={() => setPlan('monthly')} />
            </InsetGroup>

            <div className="demo-inset">
                <TabSwitcher
                    value={tab}
                    onChange={setTab}
                    options={[
                        { id: 'overview', label: 'Overview' },
                        { id: 'activity', label: 'Activity' }
                    ]}
                />
            </div>

            <GroupHeader>Buttons</GroupHeader>
            <div className="demo-inset demo-buttons">
                <Button variant="filled" onClick={() => setSheetOpen(true)}>
                    Open Sheet
                </Button>
                <Button variant="gray" onClick={() => setActionsOpen(true)}>
                    Action Sheet
                </Button>
                <Button variant="plain" onClick={() => setApp('Settings')}>
                    Open Settings app
                </Button>
                <Button variant="destructive" onClick={() => components.setPopUp({ title: 'Delete everything?', description: 'This cannot be undone.', buttons: [{ title: 'Cancel', color: 'blue' }, { title: 'Delete', color: 'red' }] })}>
                    Destructive
                </Button>
            </div>

            <GroupHeader>Phone components</GroupHeader>
            <InsetGroup>
                <ComponentRow title="Pop-up" onClick={showPopUp} />
                <ComponentRow title="Context menu" onClick={showContextMenu} />
                <ComponentRow title="Gallery" onClick={pickFromGallery} />
                <ComponentRow title="GIF picker" onClick={pickGif} />
                <ComponentRow title="Emoji picker" onClick={pickEmoji} />
                <ComponentRow title="Color picker" onClick={pickColor} />
                <ComponentRow title="Contact selector" onClick={pickContact} />
                <ComponentRow title="Camera" onClick={openCamera} />
            </InsetGroup>

            <GroupHeader>Notifications</GroupHeader>
            <InsetGroup>
                <div className="demo-field">
                    <Field value={notification} placeholder="Notification text" onChange={(event) => setNotification(event.target.value)} />
                </div>
                <ComponentRow title="Send phone notification" onClick={() => sendPhoneNotification(notification)} />
                <ComponentRow title="Draw GTA notification" onClick={() => fetchNui('drawNotification', { message: notification })} />
            </InsetGroup>

            <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
                <GroupHeader>Sheet content</GroupHeader>
                <InsetGroup>
                    <Row>
                        <Row.Content>
                            <Row.Title>Any LBKit component</Row.Title>
                            <Row.Subtitle>Sheets render on the phone's own React</Row.Subtitle>
                        </Row.Content>
                    </Row>
                </InsetGroup>
                <div className="demo-inset">
                    <Button variant="filled" fullWidth onClick={() => setSheetOpen(false)}>
                        Done
                    </Button>
                </div>
            </Sheet>

            <ActionSheet
                open={actionsOpen}
                onClose={() => setActionsOpen(false)}
                title="Share to"
                actions={[
                    { label: 'Copy link', onPress: () => components.setPopUp({ title: 'Copied', buttons: [{ title: 'OK' }] }) },
                    { label: 'Delete', destructive: true, onPress: () => setActionsOpen(false) }
                ]}
            />
        </div>
    );
}

function ComponentRow({ title, onClick }) {
    const { Row } = window.LBKit;
    return (
        <Row onClick={onClick}>
            <Row.Content>
                <Row.Title>{title}</Row.Title>
            </Row.Content>
            <Row.Trailing>
                <Row.Chevron />
            </Row.Trailing>
        </Row>
    );
}

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

const sendPhoneNotification = (content) => components.fetchPhone('SendNotification', { app: appIdentifier, title: 'Custom App Template', content: content || 'Hello!' });

function Header() {
    const [direction, setDirection] = useState('N');

    useEffect(() => {
        if (devMode) return;
        fetchNui('getDirection').then(setDirection);
        useNuiEvent('updateDirection', setDirection);
    }, []);

    return (
        <div className="demo-header">
            <div className="demo-title">Custom App Template</div>
            <div className="demo-subtitle">React JS · facing {direction}</div>
        </div>
    );
}

function DevNotice() {
    return (
        <div className="dev-notice">
            <div className="demo-title">Custom App Template</div>
            <p>The LB Phone UI kit is provided by the phone at runtime.</p>
            <p>Launch this app inside LB Phone to preview the components.</p>
        </div>
    );
}

function AppProvider({ children }) {
    useEffect(() => {
        if (devMode) {
            document.documentElement.style.visibility = 'visible';
            document.body.style.visibility = 'visible';
            return;
        }
        getSettings().then((current) => document.body.setAttribute('data-theme', current.display.theme));
        onSettingsChange((current) => document.body.setAttribute('data-theme', current.display.theme));
    }, []);

    if (!devMode) return <>{children}</>;

    return (
        <div className="dev-wrapper">
            <Frame>{children}</Frame>
        </div>
    );
}
