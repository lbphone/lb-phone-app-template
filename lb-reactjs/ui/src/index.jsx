const devMode = !window.invokeNative;

const boot = () => import('./boot');

if (window.name === '' || devMode) {
    if (devMode) {
        boot();
    } else {
        window.addEventListener('message', (event) => {
            if (event.data === 'componentsLoaded') boot();
        });
    }
}
