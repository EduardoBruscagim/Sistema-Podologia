import React, { startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import type { Theme, ThemeCoordinates } from '@/types/theme'
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
 * Aplica o tema diretamente no DOM (atributos do <html>, meta-tags e localStorage).
 * Centraliza a mutação em um único ponto, eliminando trabalho duplicado.
 */
const applyThemeToDOM = (nextTheme: Theme): void => {
  const isDark = nextTheme === 'dark'
  const root = document.documentElement

  if (isDark) {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }

  updateThemeColorMeta(isDark)

  try {
    localStorage.setItem('theme', nextTheme)
  } catch {
    // Ignora restrições de segurança ou quotas do localStorage (ex: navegação anônima rígida)
  }
}

/**
 * Provedor do estado global de tema ('light' | 'dark').
 *
 * ### Fluxo de Execução Otimizado para 60 FPS:
 * 1. **Zero Bloqueio no Callback da View Transition:** O DOM é sincronizado diretamente no callback
 *    do `startViewTransition` sem usar `flushSync`. Como todos os estilos e variáveis de tema
 *    são governados por CSS (`data-theme`), o navegador captura o novo snapshot instantaneamente
 *    sem congelar o renderizador do React.
 * 2. **Transição Concorrente no React:** A atualização de estado do React é despachada via `startTransition`,
 *    permitindo que a UI mantenha 60 FPS estáveis enquanto o compositor da GPU anima o reveal circular.
 * 3. **Eliminação de Mutação Duplicada:** O `useEffect` monitora alterações externas (ex: SO)
 *    e só muta o DOM se os atributos atuais divergirem do novo estado.
 * 4. **Origem Dinâmica da Animação:** Permite injetar as coordenadas `--theme-x` e `--theme-y`
 *    para o clip-path expandir a partir do botão clicado.
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
  // 2. Sincronização Segura do DOM e Meta Tags (Zero Duplicação)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const targetTheme = isDark ? 'dark' : 'light'

    // Só muta o DOM se ainda não tiver sido sincronizado pelo toggle direto
    if (currentTheme !== targetTheme) {
      applyThemeToDOM(targetTheme)
    }
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

  const toggleTheme = useCallback(
    (coords?: ThemeCoordinates) => {
      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

      // Atualiza coordenadas no CSS para que o clip-path circular nasça exatamente do botão
      if (coords) {
        document.documentElement.style.setProperty('--theme-x', `${coords.x}px`)
        document.documentElement.style.setProperty('--theme-y', `${coords.y}px`)
      }

      if (
        typeof window === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        applyThemeToDOM(nextTheme)
        startTransition(() => {
          setTheme(nextTheme)
        })
        return
      }

      // Suporte nativo à View Transitions API do navegador (GPU accelerated circular clip-path reveal)
      const doc = document as Document & {
        startViewTransition?: (callback: () => void | Promise<void>) => {
          finished: Promise<void>
          ready: Promise<void>
          updateCallbackDone: Promise<void>
        }
      }

      if (typeof doc.startViewTransition === 'function') {
        document.documentElement.classList.add('view-transitioning')
        const transition = doc.startViewTransition(() => {
          // O DOM muda imediatamente aqui no callback síncrono.
          // O navegador captura o novo snapshot já com as classes e CSS variables atualizados.
          applyThemeToDOM(nextTheme)

          // O React atualiza seu estado sem bloquear o pipeline da View Transition (sem flushSync)
          startTransition(() => {
            setTheme(nextTheme)
          })
        })

        transition.finished
          .catch(() => {
            // Ignora cancelamento no caso de cliques repetidos e rápidos
          })
          .finally(() => {
            document.documentElement.classList.remove('view-transitioning')
          })
        return
      }

      // Fallback direto e instantâneo caso View Transitions API não esteja disponível
      applyThemeToDOM(nextTheme)
      startTransition(() => {
        setTheme(nextTheme)
      })
    },
    [theme],
  )

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
