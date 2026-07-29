# LB Phone - Vanilla JS Template

You can open the index.html file in your browser while editing the UI. Ensuring the script will add the app to your phone.

You need to wait for the components to load before you can use them. You can listen for the `componentsLoaded` message to know when the components are ready.

```js
window.addEventListener("message", (e) => {
	if (e.data !== "componentsLoaded") return
	// Here you can access the components
})
```

## Developing the app

We recommend using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code when developing the app. This automatically refreshes the UI; meaning that you won't have to ensure the script/refresh the html file each time you make changes to the UI.

To use, follow these steps:

1. Install the extension
2. Right click on the ui/index.html file, and click "Open with Live Server"
3. Uncomment line 21 in client.lua
4. Comment out line 22 in client.lua

## UI Kit

The phone registers its components as `lb-*` custom elements, so you can use them directly in `index.html`:

```html
<lb-inset-group>
    <lb-row>
        <lb-row-content><lb-row-title>Wi-Fi</lb-row-title></lb-row-content>
        <lb-row-trailing>
            <lb-row-value>Home-5G</lb-row-value>
            <lb-row-chevron></lb-row-chevron>
        </lb-row-trailing>
    </lb-row>
</lb-inset-group>
```

For interactive lists (rows with click handlers) build them with `LBKit.mount`, as in `script.js`:

```js
LBKit.mount(document.getElementById('list'), {
    component: 'InsetGroup',
    children: [
        {
            component: 'Row',
            props: { onClick: openThing },
            children: [{ component: 'Row.Content', children: [{ component: 'Row.Title', children: 'Open' }] }]
        }
    ]
});
```

Only the outermost `lb-*` element stays in the DOM — nested tags are compiled into it — so listen for `click`/`change` on the top-level element. Kit components only render **inside LB Phone**.
