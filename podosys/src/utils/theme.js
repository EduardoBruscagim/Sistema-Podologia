import { createIcons, Moon, Sun } from "lucide";

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const TRANSITION_CLASS = "theme-transitioning";
const TRANSITION_DURATION = 400; // ms — must match CSS

let transitionTimer = null;

function applyTheme(theme) {
  const isDarkTheme = theme === DARK_THEME;
  document.documentElement.classList.toggle(DARK_THEME, isDarkTheme);
  localStorage.setItem(THEME_STORAGE_KEY, isDarkTheme ? DARK_THEME : LIGHT_THEME);
  return isDarkTheme ? DARK_THEME : LIGHT_THEME;
}

function getCurrentTheme() {
  return document.documentElement.classList.contains(DARK_THEME) ? DARK_THEME : LIGHT_THEME;
}

export const ThemeManager = {
  get current() {
    return getCurrentTheme();
  },

  toggle() {
    const root = document.documentElement;

    // Limpa timer anterior se o usuário clicar rápido
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    // Ativa transições ANTES de trocar o tema
    root.classList.add(TRANSITION_CLASS);

    // Troca o tema
    const result = applyTheme(this.current === DARK_THEME ? LIGHT_THEME : DARK_THEME);

    // Remove a classe após a transição terminar
    transitionTimer = setTimeout(() => {
      root.classList.remove(TRANSITION_CLASS);
      transitionTimer = null;
    }, TRANSITION_DURATION + 50);

    return result;
  },

  initToggleButtons(
    buttonClass = ".theme-toggle-btn",
    iconContainerClass = ".theme-icon-container",
  ) {
    const buttons = document.querySelectorAll(buttonClass);
    const iconContainers = document.querySelectorAll(iconContainerClass);

    if (!buttons.length || !iconContainers.length) return;

    // O PADRÃO PREMIUM: Rotação oposta com Scale.
    // O Sol gira pra esquerda e some. A Lua vem da direita girando e cresce.
    iconContainers.forEach((container) => {
      container.classList.add("relative", "flex", "items-center", "justify-center");

      container.style = "";

      container.innerHTML = `
        <i data-lucide="sun" class="absolute h-[1.25rem] w-[1.25rem] rotate-0 scale-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] dark:-rotate-90 dark:scale-0"></i>
        <i data-lucide="moon" class="absolute h-[1.25rem] w-[1.25rem] rotate-90 scale-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] dark:rotate-0 dark:scale-100"></i>
      `;
    });

    createIcons({
      icons: { Moon, Sun },
      nameAttr: "data-lucide",
      attrs: { "stroke-width": 1.5 },
    });

    const handleToggle = () => {
      this.toggle();
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleToggle);
    });
  },
};