import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './colors.css'
import './index.css'

const devMode = !window?.['invokeNative']
const root = ReactDOM.createRoot(document.getElementById('root'))

if (window.name === '' || devMode) {
    const renderApp = () => {
        root.render(<App />)
    }

    if (devMode) {
        renderApp()
    } else {
        window.addEventListener('message', (event) => {
            if (event.data === 'componentsLoaded') renderApp()
        })
    }
}
