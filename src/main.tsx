import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './style.css'
import { App } from './App'

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
}
