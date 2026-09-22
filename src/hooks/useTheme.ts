import { useContext } from 'react'
import { ThemeContext } from '@/context/theme-context'
import type { ThemeContextType } from '@/types/theme'

/**
 * Hook customizado para acesso ao contexto de tema da aplicação.
 *
 * Fornece:
 * - `theme`: Identificador do tema ativo ('light' | 'dark').
 * - `isDark`: Booleano conveniente para renderizações condicionais.
 * - `toggleTheme`: Função para alternar o tema e persistir a preferência.
 *
 * @throws {Error} Caso o hook seja invocado fora da árvore de um `<ThemeProvider>`.
 * @returns Objeto com o estado e as ações do tema visual.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
