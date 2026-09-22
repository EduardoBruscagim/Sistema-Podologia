import { createContext } from 'react'
import type { ThemeContextType } from '@/types/theme'

/**
 * Instância isolada do Contexto React para gerenciamento de tema.
 *
 * Separado do arquivo `ThemeContext.tsx` (que exporta o componente `ThemeProvider`)
 * para evitar dependências circulares entre o provedor e o hook `useTheme()`,
 * além de otimizar o Fast Refresh no ambiente de desenvolvimento do Vite.
 */

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
