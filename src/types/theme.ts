/**
 * Identificador do tema visual da interface.
 * - 'light': Modo claro editorial (paleta Alabaster & Warm Espresso).
 * - 'dark': Modo escuro noturno (paleta Obsidian com acentos Terracotta Silk).
 */

export type Theme = 'light' | 'dark'

/**
 * Coordenadas (x, y) de origem do disparo do tema (geralmente centro do botão alternador).
 */
export interface ThemeCoordinates {
  x: number
  y: number
}

/**
 * Contrato de contexto que expõe o estado global de tema e as ações de alternância.
 */

export interface ThemeContextType {
  /** Nome do tema atualmente ativo ('light' ou 'dark'). */
  theme: Theme
  /** Flag booleana de conveniência que indica se o tema atual é 'dark'. */
  isDark: boolean
  /** Alterna entre modo claro e escuro, persistindo a escolha no localStorage e atualizando o DOM. */
  toggleTheme: (coords?: ThemeCoordinates) => void
}
