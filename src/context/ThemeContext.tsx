import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { Theme } from '@/types/theme'
import { updateThemeColorMeta } from '@/utils/theme'
import { ThemeContext } from './theme-context'

/**
 * Propriedades aceitas pelo provedor de tema.
 */

interface ThemeProviderProps {
  /** Elementos filhos que terão acesso ao contexto de tema via `useTheme()`. */
  children: React.ReactNode
}

/**
 * Provedor do estado global de tema ('light' | 'dark').
 *
 * ### Responsabilidades e Fluxo de Execução:
 * 1. **Inicialização Resiliente:** Verifica o `localStorage` do navegador; se ausente,
 *    consulta a preferência de sistema via `window.matchMedia('(prefers-color-scheme: dark)')`.
 *    Durante SSR/build, assume 'light' por padrão para consistência estática.
 * 2. **Sincronização com o DOM:** Adiciona/remove a classe `.dark` e o atributo `data-theme`
 *    no elemento raiz `<html>`, além de atualizar a meta tag `theme-color` para navegadores móveis.
 * 3. **Detecção Reativa do SO:** Escuta eventos de alteração de tema do sistema operacional
 *    quando o usuário ainda não tiver definido uma preferência manual explícita.
 * 4. **Persistência Segura:** Salva a escolha do usuário no `localStorage` protegendo contra
 *    exceções em ambientes restritivos (ex: iframes com sandbox ou navegação privada rígida).
 */

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // 1. Estado Inicial do Tema
  // ---------------------------------------------------------------------------

  const [theme, setTheme] = useState<Theme>(() => {
    // Em tempo de pré-renderização (SSR) o objeto window não existe
    if (typeof window === 'undefined') return 'light'

    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'dark' || saved === 'light') return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const isDark = theme === 'dark'

  // ---------------------------------------------------------------------------
  // 2. Sincronização do DOM e Meta Tags
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }

    updateThemeColorMeta(isDark)
  }, [isDark])

  // ---------------------------------------------------------------------------
  // 3. Listener Dinâmico para Preferência do Sistema Operacional
  // ---------------------------------------------------------------------------

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        // Apenas acompanha o SO se o usuário não tiver salvo uma preferência manual
        const saved = localStorage.getItem('theme')
        if (!saved) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch {
      // Ignora silenciosamente caso matchMedia ou addEventListener não estejam disponíveis
    }
  }, [])

  // ---------------------------------------------------------------------------
  // 4. Ação de Alternância (Toggle) Fluida e Otimizada
  // ---------------------------------------------------------------------------

  const toggleTheme = useCallback(() => {
    const applyTheme = () => {
      setTheme((prev) => {
        const nextTheme: Theme = prev === 'dark' ? 'light' : 'dark'
        try {
          localStorage.setItem('theme', nextTheme)
        } catch {
          // Ignora restrições de segurança ou quotas do localStorage
        }
        return nextTheme
      })
    }

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyTheme()
      return
    }

    // 1. Suporte nativo à View Transitions API do navegador (GPU accelerated, suave e sem lag)
    const doc = document as Document & {
      startViewTransition?: (callback: () => void | Promise<void>) => {
        finished: Promise<void>
        ready: Promise<void>
        updateCallbackDone: Promise<void>
      }
    }

    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        applyTheme()
      })
      return
    }

    // 2. Fallback fluido via classe temporária com interpolação de cores
    document.documentElement.classList.add('theme-transition')
    applyTheme()
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 320)
  }, [])

  // ---------------------------------------------------------------------------
  // 5. Memorização do Valor do Contexto
  // ---------------------------------------------------------------------------

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
    }),
    [theme, isDark, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
