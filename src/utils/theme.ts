import type { Theme } from '@/types/theme'

export const updateThemeColorMeta = (isDark: boolean): void => {
  const color = isDark ? '#020617' : '#ffffff'
  const metaTags = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')

  if (metaTags.length > 0) {
    // Unifica as tags existentes removendo restrições de media query para que navegadores móveis
    // (iOS Safari e Chrome Android) respeitem a seleção manual do usuário
    metaTags.forEach((tag, index) => {
      if (index === 0) {
        tag.removeAttribute('media')
        tag.setAttribute('content', color)
      } else {
        tag.remove()
      }
    })
  } else {
    const metaThemeColor = document.createElement('meta')
    metaThemeColor.setAttribute('name', 'theme-color')
    metaThemeColor.setAttribute('content', color)
    document.head.appendChild(metaThemeColor)
  }
}

export const applyThemeState = (
  theme: Theme,
  toggleBtn?: HTMLElement | null,
  persist = true,
): void => {
  const isDark = theme === 'dark'

  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  if (persist) {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // Ignora restrições de permissão ou contextos sandbox em modo restrito
    }
  }

  if (toggleBtn) {
    // W3C ARIA APG: Em Toggle Buttons, o accessible name deve permanecer constante e neutro ('Modo escuro'),
    // enquanto o estado é comunicado pelo valor booleano em aria-pressed.
    toggleBtn.setAttribute('aria-label', 'Modo escuro')
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false')
    toggleBtn.setAttribute('title', isDark ? 'Ativar modo claro' : 'Ativar modo escuro')
  }

  updateThemeColorMeta(isDark)
}

export const initThemeToggle = (): void => {
  const themeToggleBtn = document.getElementById('theme-toggle')
  if (!themeToggleBtn) return

  const isInitiallyDark = document.documentElement.classList.contains('dark')
  // Sincroniza estado inicial do botão e meta tags sem forçar persistência em localStorage
  applyThemeState(isInitiallyDark ? 'dark' : 'light', themeToggleBtn, false)

  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    applyThemeState(isCurrentlyDark ? 'light' : 'dark', themeToggleBtn, true)
  })

  // Sincroniza dinamicamente se o usuário alterar a preferência do SO e não tiver escolha manual salva
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      let savedTheme: string | null = null
      try {
        savedTheme = localStorage.getItem('theme')
      } catch {
        // Armazenamento local inacessível
      }

      if (!savedTheme) {
        applyThemeState(e.matches ? 'dark' : 'light', themeToggleBtn, false)
      }
    })
  } catch {
    // MatchMedia não suportado ou restrito no ambiente
  }
}
