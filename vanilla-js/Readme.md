# LB Phone - Vanilla JS Template
You can open the index.html file in your browser while editing the UI. Ensuring the script will add the app to your phone.

You need to wait for the components to load before you can use them. You can listen for the `componentsLoaded` message to know when the components are ready.

```js
window.addEventListener("message", (e) => {
    if (e.data !== "componentsLoaded") return;
    // Here you can access the components
});
```