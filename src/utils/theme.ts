import type { Theme } from '@/types/theme'

export const updateThemeColorMeta = (isDark: boolean): void => {
  let metaThemeColor = document.querySelector('meta[name="theme-color"]:not([media])')
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta')
    metaThemeColor.setAttribute('name', 'theme-color')
    document.head.appendChild(metaThemeColor)
  }
  metaThemeColor.setAttribute('content', isDark ? '#020617' : '#ffffff')
}

export const applyThemeState = (theme: Theme, toggleBtn?: HTMLElement | null): void => {
  const isDark = theme === 'dark'

  if (isDark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }

  if (toggleBtn) {
    const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false')
    toggleBtn.setAttribute('aria-label', label)
    toggleBtn.setAttribute('title', label)
  }

  updateThemeColorMeta(isDark)
}

export const initThemeToggle = (): void => {
  const themeToggleBtn = document.getElementById('theme-toggle')
  if (!themeToggleBtn) return

  const isInitiallyDark = document.documentElement.classList.contains('dark')
  applyThemeState(isInitiallyDark ? 'dark' : 'light', themeToggleBtn)

  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    applyThemeState(isCurrentlyDark ? 'light' : 'dark', themeToggleBtn)
  })
}
