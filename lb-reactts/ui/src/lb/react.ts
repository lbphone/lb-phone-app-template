import BundledReact from 'react';
import * as BundledReactDOM from 'react-dom/client';

type ReactDOMClient = { createRoot: typeof BundledReactDOM.createRoot };
type PhoneRuntime = { React: typeof BundledReact; ReactDOM: ReactDOMClient };

const runtime = (window as unknown as { LBKit?: PhoneRuntime }).LBKit;

const React = runtime?.React ?? BundledReact;
const ReactDOM: ReactDOMClient = runtime?.ReactDOM ?? BundledReactDOM;

export default React;
export { ReactDOM };
export const { useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;
