import BundledReact from 'react';
import * as BundledReactDOM from 'react-dom/client';

const runtime = window.LBKit;

const React = runtime?.React ?? BundledReact;
const ReactDOM = runtime?.ReactDOM ?? BundledReactDOM;

export default React;
export { ReactDOM };
export const { useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;
