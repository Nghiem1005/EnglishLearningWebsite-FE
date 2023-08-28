import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    port: 3002,
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 3002
  }
})
