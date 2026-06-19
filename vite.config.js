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
    // Deshabilita minificación CSS — lightningcss no soporta sintaxis Tailwind v4
    cssMinify: false,

    // Divide el bundle en chunks menores para carga más rápida
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('embla-carousel')) {
            return 'vendor-embla';
          }
          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'vendor-icons';
          }
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
})
