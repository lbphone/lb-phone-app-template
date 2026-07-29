import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/ui/dist' : undefined,
    define: {
        global: 'window'
    },
    build: {
        sourcemap: false
    },
    server: {
        port: 3000,
        open: true
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('lb-')
                }
            }
        })
    ]
}));
