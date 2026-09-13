import { useContext } from 'react'
import { ThemeContext } from '@/context/theme-context'
import type { ThemeContextType } from '@/types/theme'

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
