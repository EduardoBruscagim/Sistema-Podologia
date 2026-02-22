// ============================================================
//  PodoSys — ThemeManager
//  Controle centralizado de tema claro/escuro com transição
//  suave estilo Apple. Toda troca de tema passa por aqui.
// ============================================================

// Ícones Sun/Moon são registrados e renderizados pelo main.js
// para centralizar todas as chamadas de createIcons em um único ponto.

// ── Constantes ──────────────────────────────────────────────

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const TRANSITION_CLASS = "theme-transitioning";

// Duração sincronizada com o CSS (.theme-transitioning em global.css)
const TRANSITION_DURATION = 400;

// ── Estado interno ──────────────────────────────────────────

let transitionTimer = null;

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
   * Alterna entre claro/escuro com transição orquestrada:
   * 1. Adiciona classe de transição ANTES da troca
   * 2. Troca a classe de tema
   * 3. Remove a classe de transição após o tempo exato
   *
   * Debounce embutido: cliques rápidos cancelam o timer anterior
   * para evitar remoção prematura da classe de transição.
   */
  toggle() {
    const root = document.documentElement;

    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    // Ativa transição global ANTES da troca de tema
    root.classList.add(TRANSITION_CLASS);

    const result = applyTheme(
      this.current === DARK_THEME ? LIGHT_THEME : DARK_THEME,
    );

    // +50ms de margem para garantir que a animação CSS termine
    transitionTimer = setTimeout(() => {
      root.classList.remove(TRANSITION_CLASS);
      transitionTimer = null;
    }, TRANSITION_DURATION + 50);

    return result;
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