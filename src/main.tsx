import React from 'react'
import ReactDOM from 'react-dom/client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './style.css'
import { App } from './App'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
