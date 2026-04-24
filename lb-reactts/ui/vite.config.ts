import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/ui/dist' : undefined,
    define: {
        global: 'window'
    },
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 9999
    },
    server: {
        port: 3000,
        open: true
    },
    plugins: [react()]
}))
