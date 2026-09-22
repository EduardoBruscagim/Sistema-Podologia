import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { HomePage } from '@/pages/HomePage'

/**
 * Componente raiz da aplicação React (App).
 *
 * Envolve a página inicial (`HomePage`) com os provedores globais de infraestrutura
 * (`ThemeProvider`), garantindo que tanto a hidratação no cliente quanto o pré-render
 * estático (SSG no Vite SSR) compartilhem a mesma árvore semântica de componentes.
 */
export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}
