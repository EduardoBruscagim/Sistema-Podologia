// ============================================================
//  PodoSys — Vite Configuration
//  Setup minimalista: Vite + Tailwind, sem plugins extras.
// ============================================================

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],

  server: {
    port: 3000,
    host: true,
  },

  build: {
    target: 'es2024',
    minify: 'esbuild',
  },
})
