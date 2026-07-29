# LB Phone - App Templates

This repository contains templates for [LB Phone](https://store.lbscripts.com/) apps, showcasing most functions provided by LB Phone.

## Templates

-   [react js](./lb-reactjs) - React app template
-   [react typescript](./lb-reactts) - React app template with TypeScript
-   [vanilla js](./lb-vanillajs) - Vanilla JavaScript app template
-   [vue js](./lb-vuejs) - Vue JS app template (Thanks to @RedrumRP)

Every template renders the same demo: the phone's own **UI kit** components, the imperative **phone components** (pop-ups, pickers, camera), and **notifications**.

## Documentation

Custom apps in LB Phone automatically include access to a few functions and variables. Please note that when you use react, you need to use the `window.` prefix for these functions and variables.

The variables are:

-   `resourceName` - The name of the custom app resource, use this when fetching data.
-   `appName` - The app identifier, useful for notifications.

For a full list, see [LB Phone documentation](https://docs.lbscripts.com/phone/custom-apps/).

## UI Kit (LBKit)

The phone exposes its own design-system components to same-origin custom apps at runtime, so your app can look native without rebuilding the UI yourself. The phone injects them into your app; there is nothing to install.

-   **React / React TS** — the app shares the phone's React instance and renders the components as normal JSX: `<Row>`, `<Toggle>`, `<Sheet>`, etc. (typed via `@lbphone/components` in the TS template).
-   **Vanilla / Vue** — the components are also registered as `lb-*` custom elements (`<lb-row>`, `<lb-button>`). Build dynamic lists imperatively with `LBKit.mount(element, tree)`.

The UI kit is provided by the phone, so kit components only render **inside LB Phone**. In standalone browser dev each template shows a short notice instead. See each template's README for details.
