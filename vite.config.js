import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages project site: https://aybc2025.github.io/mandate/
const BASE = '/mandate/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: [
        'icons/favicon-32.png',
        'icons/apple-touch-icon.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-512-maskable.png',
      ],
      manifest: {
        // id is deliberately NOT equal to start_url (see CLAUDE.md → PWA install identity)
        id: `${BASE}app`,
        name: 'Mandate: Israel Coalition Watch',
        short_name: 'Mandate',
        description: 'Daily tracker of the talks to form Israel’s next government.',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        lang: 'en',
        dir: 'ltr',
        theme_color: '#0038B8',
        background_color: '#FFFFFF',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        cacheId: 'mandate',
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,woff2,png}'],
        // The daily content file must never be precached (it changes every morning).
        globIgnores: ['**/data/**'],
        navigateFallback: `${BASE}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('/data/coalition.json'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'mandate-data',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 2 },
            },
          },
        ],
      },
    }),
  ],
})
