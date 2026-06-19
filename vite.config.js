import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Deshabilita minificación CSS para evitar crash con sintaxis Tailwind v4
    // que lightningcss (minificador de Vite 8) no soporta
    cssMinify: false,
  },
})
