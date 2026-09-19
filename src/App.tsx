import React from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { HomePage } from '@/pages/HomePage'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}
