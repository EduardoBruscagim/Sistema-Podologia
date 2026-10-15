import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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
 * Sincroniza a aparência visual no DOM (atributos do <html> e meta-tags).
 * Não altera o localStorage para não transformar mudanças do SO em escolhas manuais.
 * Preserva as tags <meta name="theme-color" media="..."> originais a menos que haja escolha manual.
 */
const applyThemeToDOM = (nextTheme: Theme, isManualChange = false): void => {
  const isDark = nextTheme === 'dark'
  const root = document.documentElement

  if (isDark) {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }

  if (isManualChange || readThemePreference() !== null) {
    updateThemeColorMeta(isDark)
  }
}

/**
 * Recupera de forma segura a preferência salva no localStorage.
 * Trata exceções em ambientes com restrições rígidas (ex: navegação anônima do Safari ou iframes com sandbox)
 * e valida se o valor armazenado é estritamente 'dark' ou 'light'.
 */
const readThemePreference = (): Theme | null => {
  try {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}

/**
 * Salva a preferência explícita do usuário no localStorage.
 * Deve ser invocada exclusivamente quando o usuário aciona o botão manual de tema.
 */
const persistThemePreference = (nextTheme: Theme): void => {
  try {
    localStorage.setItem('theme', nextTheme)
  } catch {
    // O tema visual continua funcionando mesmo sem armazenamento (ex: navegação anônima rígida)
  }
}

/**
 * Provedor do estado global de tema ('light' | 'dark').
 *
 * ### Fluxo de Execução Resiliente e Otimizado para 60 FPS:
 * 1. **Separação Rígida de Responsabilidades:** `applyThemeToDOM` gerencia exclusivamente
 *    a camada visual. A gravação em `localStorage` é delegada a `persistThemePreference`
 *    e executada apenas em cliques manuais, preservando o acompanhamento do SO.
 * 2. **Leitura e Gravação 100% Seguras:** Tanto a leitura (`readThemePreference`) quanto
 *    a gravação (`persistThemePreference`) são encapsuladas contra falhas de quota ou permissão.
 * 3. **Sincronismo Preciso no Snapshot da View Transition:** O uso direcionado de `flushSync`
 *    dentro do callback do `startViewTransition` garante que tanto as variáveis CSS
 *    quanto os elementos controlados pelo React (ícone Sol/Lua e estados ARIA no Navbar)
 *    já estejam no novo estado antes da captura do snapshot pelo navegador.
 * 4. **Prevenção de Cliques Rápidos Concorrentes:** Uma ref `isTransitioningRef` atua como
 *    trava de reentrância, evitando que cliques múltiplos disparem transições sobrepostas
 *    ou limpem prematuramente a classe `.view-transitioning`.
 * 5. **Origem Dinâmica da Animação:** Injeta as coordenadas `--theme-x` e `--theme-y`
 *    para expansão do clip-path circular a partir do centro do botão clicado.
 */

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // 1. Estado Inicial do Tema
  // ---------------------------------------------------------------------------

  const [theme, setTheme] = useState<Theme>(() => {
    // Em tempo de pré-renderização (SSR) o objeto window não existe
    if (typeof window === 'undefined') return 'light'

    const saved = readThemePreference()
    if (saved) return saved

    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  const isDark = theme === 'dark'
  const isTransitioningRef = useRef(false)

  // ---------------------------------------------------------------------------
  // 2. Sincronização Segura do DOM e Meta Tags (Zero Poluição de LocalStorage)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const targetTheme = isDark ? 'dark' : 'light'

    // Só sincroniza o DOM se os atributos atuais divergirem do estado do React
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
        // Apenas acompanha o SO se o usuário NÃO tiver salvo uma escolha manual explícita
        if (!readThemePreference()) {
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
  // 4. Ação de Alternância (Toggle) Fluida, Segura e com Trava de Reentrância
  // ---------------------------------------------------------------------------

  const toggleTheme = useCallback(
    (coords?: ThemeCoordinates) => {
      // Evita conflitos de concorrência caso o usuário clique várias vezes em < 450ms
      if (isTransitioningRef.current) return

      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

      // Persistência ocorre exclusivamente pelo clique manual do usuário
      persistThemePreference(nextTheme)

      // Atualiza coordenadas no CSS para que o clip-path circular nasça exatamente do botão
      if (coords) {
        document.documentElement.style.setProperty('--theme-x', `${coords.x}px`)
        document.documentElement.style.setProperty('--theme-y', `${coords.y}px`)
      }

      if (
        typeof window === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        applyThemeToDOM(nextTheme, true)
        setTheme(nextTheme)
        return
      }

      // Suporte à View Transitions API do navegador (GPU accelerated circular clip-path reveal)
      const doc = document as Document & {
        startViewTransition?: (callback: () => void | Promise<void>) => {
          finished: Promise<void>
          ready: Promise<void>
          updateCallbackDone: Promise<void>
        }
      }

      if (typeof doc.startViewTransition === 'function') {
        isTransitioningRef.current = true
        document.documentElement.classList.add('view-transitioning')

        let transition: ReturnType<typeof doc.startViewTransition>
        try {
          transition = doc.startViewTransition(() => {
            // Sincroniza o DOM visual (classes e atributos de estilo)
            applyThemeToDOM(nextTheme, true)

            // flushSync garante que o React atualize o DOM de componentes (ícone Sol/Lua e
            // aria-pressed do Navbar) antes da captura do snapshot do novo estado pelo browser
            flushSync(() => {
              setTheme(nextTheme)
            })
          })
        } catch {
          // Se a inicialização falhar, restaura a trava e aplica diretamente
          isTransitioningRef.current = false
          document.documentElement.classList.remove('view-transitioning')
          applyThemeToDOM(nextTheme, true)
          setTheme(nextTheme)
          return
        }

        transition.finished
          .catch(() => {
            // Ignora cancelamento caso ocorra descarte pelo navegador
          })
          .finally(() => {
            isTransitioningRef.current = false
            document.documentElement.classList.remove('view-transitioning')
          })
        return
      }

      // Fallback instantâneo caso View Transitions API não esteja disponível
      applyThemeToDOM(nextTheme, true)
      setTheme(nextTheme)
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
