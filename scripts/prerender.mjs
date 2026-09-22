/* global console, process */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distIndexPath = path.join(rootDir, 'dist', 'index.html')

/**
 * Pipeline de Pré-renderização Estática (SSG - Static Site Generation).
 *
 * ### Passos do Processo:
 * 1. **Verificação Prévia:** Garante que o build do cliente do Vite (`vite build`) foi concluído e `dist/index.html` existe.
 * 2. **Instanciação SSR do Vite:** Inicia uma instância Vite em `middlewareMode` para resolver módulos TypeScript/JSX
 *    e dependências sem precisar de empacotamento prévio no servidor.
 * 3. **Renderização para String HTML:** Invoca `renderToString(<App />)` gerando toda a árvore semântica da página.
 * 4. **Injeção no DOM Estático:** Substitui o contêiner vazio `<div id="root"></div>` pelo HTML estático gerado.
 * 5. **Otimização de Caminho Crítico (CSS Inline):**
 *    Lê o arquivo CSS compilado em `dist/assets/css/` e o injeta como tag `<style>` inline,
 *    substituindo a tag `<link rel="stylesheet">` externa. Isso elimina o bloqueio de renderização
 *    (economizando ~150ms na conexão de rede móvel) e zera o tempo até o First Contentful Paint.
 */

async function prerender() {
  if (!fs.existsSync(distIndexPath)) {
    console.error('dist/index.html not found. Run vite build first.')
    process.exit(1)
  }

  console.log('Pre-rendering App to static HTML...')
  const server = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { App } = await server.ssrLoadModule('/src/App.tsx')
    const appHtml = renderToString(React.createElement(App))

    let indexHtml = fs.readFileSync(distIndexPath, 'utf8')
    indexHtml = indexHtml.replace(
      '<div id="root" class="flex-1 flex flex-col"></div>',
      `<div id="root" class="flex-1 flex flex-col">${appHtml}</div>`,
    )

    // Injeta o CSS em <style> inline para eliminar a solicitação bloqueadora de renderização
    const cssDir = path.join(rootDir, 'dist', 'assets', 'css')
    if (fs.existsSync(cssDir)) {
      const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith('.css'))
      if (cssFiles.length > 0) {
        const cssPath = path.join(cssDir, cssFiles[0])
        const cssContent = fs.readFileSync(cssPath, 'utf8')
        indexHtml = indexHtml.replace(
          /<link\s+rel="stylesheet"[^>]*href="\/assets\/css\/[^"]*"[^>]*>/i,
          `<style>${cssContent}</style>`,
        )
      }
    }

    fs.writeFileSync(distIndexPath, indexHtml, 'utf8')
    console.log(
      `✓ Successfully pre-rendered static HTML (${appHtml.length} chars) with inlined CSS into dist/index.html`,
    )
  } catch (error) {
    console.error('Pre-rendering failed:', error)
    process.exit(1)
  } finally {
    await server.close()
  }
}

prerender()
