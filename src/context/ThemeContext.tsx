import React, { useEffect, useState } from 'react'
import type { Theme } from '@/types/theme'
import { updateThemeColorMeta } from '@/utils/theme'
import { ThemeContext } from './theme-context'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const isDark = theme === 'dark'

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }

    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Ignora restrições de sandbox
    }

    updateThemeColorMeta(isDark)
  }, [theme, isDark])

  // Sincroniza dinamicamente se a preferência do SO mudar e não houver escolha manual salva
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        const saved = localStorage.getItem('theme')
        if (!saved) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch {
      // MatchMedia indisponível
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
