import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import Sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // Enables importing SVGs as React components via the ?react suffix
      // e.g. import WhatsApp from './whatsapp.svg?react'
      svgrOptions: {
        // Preserve viewBox, remove hardcoded dimensions
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'removeViewBox', active: false },  // keep viewBox
            { name: 'removeDimensions', active: true }, // strip width/height attrs
          ]
        }
      }
    }),
    Sitemap({ hostname: 'https://safidottech.com' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor'
            }
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
              return 'animation-vendor'
            }
            if (id.includes('axios') || id.includes('react-hook-form') || id.includes('react-helmet-async')) {
              return 'utils-vendor'
            }
          }
        }
      }
    }
  }
})
