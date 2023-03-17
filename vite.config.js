import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        global: true
    },
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            manifest: {
                id: 'music-pwa-app',
                name: 'Music App',
                start_url: '/',
                description: 'music catalog app',
                short_name: 'Music Lite',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#FF5E3A',
                icons: [{
                        src: 'assets/img/pwa-192x192.png',
                        size: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'assets/img/pwa-192x192.png',
                        size: '512x512',
                        type: 'image/png'
                    },
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js, css,ico, html, png, jpg}'],
                runtimeCaching: [{
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-font-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'fonts-gstatic',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 365
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            },
                        }
                    }
                ]
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    }
})