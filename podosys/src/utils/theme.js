// ============================================================
//  PodoSys — ThemeManager
//  Controle centralizado de tema claro/escuro.
//  Toggle síncrono — transição visual delegada ao Tailwind CSS.
// ============================================================

// Ícones Sun/Moon são registrados e renderizados pelo main.js
// para centralizar todas as chamadas de createIcons em um único ponto.

// ── Constantes ──────────────────────────────────────────────

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// ── Helpers ─────────────────────────────────────────────────

/**
 * Aplica o tema no <html> e persiste no localStorage.
 * Retorna o tema efetivamente aplicado.
 */
function applyTheme(theme) {
  const isDark = theme === DARK_THEME;

  document.documentElement.classList.toggle(DARK_THEME, isDark);
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? DARK_THEME : LIGHT_THEME);

  return isDark ? DARK_THEME : LIGHT_THEME;
}

/**
 * Leitura direta do DOM — fonte de verdade sempre atualizada.
 */
function getCurrentTheme() {
  return document.documentElement.classList.contains(DARK_THEME)
    ? DARK_THEME
    : LIGHT_THEME;
}

// ── API pública ─────────────────────────────────────────────

export const ThemeManager = {
  get current() {
    return getCurrentTheme();
  },

  /**
   * Alterna entre claro e escuro de forma síncrona.
   * A suavização visual é responsabilidade do CSS (transition-colors)
   * aplicado diretamente nos elementos estruturais.
   */
  toggle() {
    return applyTheme(
      this.current === DARK_THEME ? LIGHT_THEME : DARK_THEME,
    );
  },

  /**
   * Inicializa todos os botões de toggle de tema na página.
   * Injeta os ícones Sol/Lua com animação de rotação + scale
   * controlada por Tailwind (classes dark:).
   */
  initToggleButtons(
    buttonClass = ".theme-toggle-btn",
    iconContainerClass = ".theme-icon-container",
  ) {
    const buttons = document.querySelectorAll(buttonClass);
    const iconContainers = document.querySelectorAll(iconContainerClass);

    if (!buttons.length || !iconContainers.length) return;

    // Animação premium: rotação ampla (180°) + scale + opacity crossfade
    iconContainers.forEach((container) => {
      container.classList.add(
        "relative",
        "flex",
        "items-center",
        "justify-center",
      );
      container.style = "";

      container.innerHTML = `
        <i
          data-lucide="sun"
          class="theme-icon-sun absolute h-[1.25rem] w-[1.25rem]"
        ></i>
        <i
          data-lucide="moon"
          class="theme-icon-moon absolute h-[1.25rem] w-[1.25rem]"
        ></i>
      `;
    });

    const handleToggle = () => {
      this.toggle();
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleToggle);
    });
  },
};