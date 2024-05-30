import { createApp } from 'vue'
import App from './App.vue'

import "./colors.css"
import "./index.css"

const devMode = !window.invokeNative
if (window.name === "" || devMode) {
	if (devMode) {
        createApp(App).mount('#app')
	} else {
		window.addEventListener("message", (event) => {
			if (event.data === "componentsLoaded") {
                createApp(App).mount('#app')
            }
		})
	}
}