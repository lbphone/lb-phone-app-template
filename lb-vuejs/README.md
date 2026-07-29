# LB Phone - Vue JS Template

If you don't know how vue.js works, you should use the [vanilla js](https://github.com/lbphone/lb-phone-app-template/tree/main/vanilla-js) template instead.

## Installing modules

1. Install [node.js](https://nodejs.org/en/download)
2. CD to the `ui` folder and run `npm i`, wait for it to complete.

## Developing the app

1. Run `npm run dev`
2. Go to `http://localhost:3000` in your browser to see the app in your browser.
3. Comment out line 15 and uncomment line 16 in fxmanifest.lua
4. Comment out line 25 and uncomment line 24 in client.lua.
5. Refresh and ensure the resource

## Building the app

1. Run `npm run build` to build the app. The build will be in the `dist` folder.
2. Comment out line 16 and uncomment line 15 in fxmanifest.lua
3. Comment out line 24 and uncomment line 25 in client.lua.
4. Refresh and ensure the resource

## UI Kit

`vite.config.js` tells Vue to treat `lb-*` as custom elements, so the phone's components can be used directly in your template (`src/App.vue`):

```vue
<lb-inset-group>
    <lb-row>
        <lb-row-content><lb-row-title>Wi-Fi</lb-row-title></lb-row-content>
        <lb-row-trailing><lb-toggle></lb-toggle></lb-row-trailing>
    </lb-row>
</lb-inset-group>
```

For interactive lists (rows with click handlers) build them with `LBKit.mount` inside `onMounted`, as in `src/App.vue`:

```js
LBKit.mount(componentsList.value, {
    component: 'InsetGroup',
    children: [{ component: 'Row', props: { onClick: openThing }, children: [{ component: 'Row.Content', children: [{ component: 'Row.Title', children: 'Open' }] }] }]
});
```

Kit components only render **inside LB Phone**. In browser dev the app shows a short notice instead.
