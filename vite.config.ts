import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

/**
 * Plugin customizado para injeção automática de `<link rel="preload">` das fontes críticas WOFF2.
 *
 * Durante o build de produção, examina o bundle gerado e injeta preloads no `<head>` do HTML
 * para os subsets essenciais das fontes Newsreader e Outfit, eliminando flash de texto invisível (FOIT)
 * e acelerando o First Contentful Paint (FCP).
 */
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

/**
 * Configuração de Build do Vite.
 *
 * - Plugins: React com Fast Refresh, Tailwind CSS v4 e plugin de preload de fontes.
 * - Alias de importação: `@/` apontando para o diretório `./src`.
 * - Divisão de Chunks Manual (Rollup):
 *   - `vendor-gsap`: Isola GSAP, ScrollTrigger e @gsap/react em cache de longo prazo.
 *   - `vendor-react`: Isola o runtime do React e React-DOM.
 */
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
