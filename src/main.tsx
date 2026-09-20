import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './style.css'
import { App } from './App'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const rootElement = document.getElementById('root')
if (rootElement) {
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
  requestAnimationFrame(() => {
    document.documentElement.classList.add('gsap-loaded')
  })
}
