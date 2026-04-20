import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Hosted at github.com/EverlongProject/design-prototypes-ext
// inside the `manulife-demo-april/` subfolder.
// Pages URL: https://everlongproject.github.io/design-prototypes-ext/manulife-demo-april/
const BASE_PATH = '/design-prototypes-ext/manulife-demo-april/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/*'],
      manifest: {
        name: 'Manulife Demo',
        short_name: 'Jenn Demo',
        description: 'Manulife CEO demo prototype',
        theme_color: '#00874E',
        background_color: '#111827',
        display: 'standalone',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        icons: [
          {
            src: 'assets/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'assets/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  server: {
    host: true
  }
})
