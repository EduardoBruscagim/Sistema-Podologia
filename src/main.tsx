import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './style.css'
import { App } from './App'

// -----------------------------------------------------------------------------
// 1. Registro Global de Plugins GSAP
// -----------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger, useGSAP)

// -----------------------------------------------------------------------------
// 2. Inicialização / Hidratação Híbrida do React no DOM
// -----------------------------------------------------------------------------

const rootElement = document.getElementById('root')

if (rootElement) {
  // Se o HTML estático já foi pré-renderizado pelo script SSG (prerender.mjs),
  // executa hydrateRoot para anexar listeners sem recriar o DOM do zero.
  // Caso contrário (ex: servidor de desenvolvimento Vite dev), utiliza createRoot padrão.
  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  }

  // ---------------------------------------------------------------------------
  // 3. Notificação de Carregamento GSAP (Prevenção de FOUC)
  // ---------------------------------------------------------------------------

  // Adiciona a classe .gsap-loaded no elemento raiz <html> via requestAnimationFrame,
  // liberando a visibilidade de elementos com opacidade inicial controlada pelo GSAP.
  requestAnimationFrame(() => {
    document.documentElement.classList.add('gsap-loaded')
  })
}
