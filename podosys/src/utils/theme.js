// ============================================================
//  PodoSys — Theme Manager
//  Controle centralizado de tema claro/escuro.
//  Toggle síncrono — transição visual delegada ao Tailwind CSS.
// ============================================================

// ── Constantes ──────────────────────────────────────────────

const STORAGE_KEY = 'theme'
const DARK = 'dark'
const LIGHT = 'light'

// ── Helpers ─────────────────────────────────────────────────

/**
 * Aplica o tema no <html> e persiste no localStorage.
 * Retorna o tema efetivamente aplicado.
 */
function applyTheme(theme) {
  const isDark = theme === DARK

  document.documentElement.classList.toggle(DARK, isDark)
  localStorage.setItem(STORAGE_KEY, isDark ? DARK : LIGHT)

  return isDark ? DARK : LIGHT
}

/** Leitura direta do DOM — fonte de verdade sempre atualizada. */
function getCurrentTheme() {
  return document.documentElement.classList.contains(DARK) ? DARK : LIGHT
}

// ── API Pública ─────────────────────────────────────────────

export const ThemeManager = {
  get current() {
    return getCurrentTheme()
  },

  /**
   * Alterna entre claro e escuro de forma síncrona.
   * Suavização visual delegada ao CSS (transition-colors).
   */
  toggle() {
    return applyTheme(this.current === DARK ? LIGHT : DARK)
  },

  /**
   * Inicializa todos os botões de toggle de tema na página.
   * Injeta ícones Sol/Lua com animação de rotação + crossfade
   * controlada inteiramente por classes Tailwind (dark:).
   *
   * Layout classes (relative, flex, sizing) pertencem ao template HTML.
   * Este método injeta apenas o conteúdo (ícones).
   */
  initToggleButtons(buttonClass = '.theme-toggle-btn', iconContainerClass = '.theme-icon-container') {
    const buttons = document.querySelectorAll(buttonClass)
    const iconContainers = document.querySelectorAll(iconContainerClass)

    if (!buttons.length || !iconContainers.length) return

    iconContainers.forEach((container) => {
      container.innerHTML = `
        <i data-lucide="sun" class="theme-icon-sun absolute h-[1.25rem] w-[1.25rem]"></i>
        <i data-lucide="moon" class="theme-icon-moon absolute h-[1.25rem] w-[1.25rem]"></i>
      `
    })

    const handleToggle = () => this.toggle()

    buttons.forEach((button) => {
      button.addEventListener('click', handleToggle)
    })
  },
}