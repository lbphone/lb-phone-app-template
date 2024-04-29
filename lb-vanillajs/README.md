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
