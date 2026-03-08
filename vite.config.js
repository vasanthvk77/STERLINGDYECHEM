import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/STERLINGDYECHEM/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/products': 'http://localhost:5000'
    },
    watch: {
      ignored: ['**/src/data/**', '**/public/images/**']
    }
  }
})
