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
    esbuild: {
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment'
    },
    server: {
        port: 3000,
        open: true
    }
}));
