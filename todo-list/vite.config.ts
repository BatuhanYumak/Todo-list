import {defineConfig} from 'vite'

export default defineConfig({
  root: '',
  server: {
    watch: {
        usePolling: true,
        },
    host: true,
    strictPort: true,
  },
})