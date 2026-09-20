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

    // Injeta o CSS em <style> inline para eliminar a solicitação bloqueadora de renderização (150ms no Mobile)
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
