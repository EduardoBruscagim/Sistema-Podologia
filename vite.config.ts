import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

function preloadFontsPlugin(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      const tags: Array<{
        tag: string
        attrs: Record<string, string | boolean>
        injectTo?: 'head-prepend' | 'head' | 'body' | 'body-prepend'
      }> = []

      for (const fileName of Object.keys(ctx.bundle)) {
        if (
          fileName.endsWith('.woff2') &&
          (fileName.includes('newsreader-latin-wght-normal') ||
            fileName.includes('outfit-latin-wght-normal'))
        ) {
          tags.push({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `/${fileName}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: 'anonymous',
            },
            injectTo: 'head-prepend',
          })
        }
      }
      return tags
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFontsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap/')) {
            return 'vendor-gsap'
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
