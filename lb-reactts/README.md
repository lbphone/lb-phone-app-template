# LB Phone - TypeScript React Template

If you don't know how react.js works, you should use the [vanilla js](https://github.com/lbphone/lb-phone-app-template/tree/main/vanilla-js) template instead.

## Installing modules

1. Install [node.js](https://nodejs.org/en/download)
2. CD to the `ui` folder and run `npm i`, wait for it to complete.

## Developing the app

1. Run `npm run dev`
2. Go to `http://localhost:3000` in your browser to see the app in your browser.
3. Comment out line 25 and uncomment line 24 in client.lua.
4. Refresh and ensure the resource

## Building the app

1. Run `npm run build` to build the app. The build will be in the `dist` folder.
2. Comment out line 24 and uncomment line 25 in client.lua.
3. Refresh and ensure the resource

## UI Kit

The demo (`src/App.tsx`) is built with the phone's own components, rendered as normal JSX and typed via `@lbphone/components`:

```tsx
import { GroupHeader, InsetGroup, Row, Toggle } from '@lbphone/components';

<InsetGroup>
    <Row>
        <Row.Content>
            <Row.Title>Airplane Mode</Row.Title>
        </Row.Content>
        <Row.Trailing>
            <Toggle checked={on} onChange={toggle} />
        </Row.Trailing>
    </Row>
</InsetGroup>;
```

Kit components such as `Toggle`, `Field` and `Sheet` run on the phone's React, so the app shares that single instance:

-   `src/lb/react.ts` returns the phone's React inside the phone, and a bundled React in standalone dev.
-   `src/index.tsx` waits for the phone's `componentsLoaded` message before booting.
-   Types come from `src/lb/lbkit.d.ts`; at runtime the components come from `window.LBKit`.

Kit components only render **inside LB Phone**. In browser dev the app shows a short notice instead; your own markup, styles and the phone-component pop-ups still work.
