import { createIcons, Moon, Sun } from "lucide";

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

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
    return applyTheme(this.current === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  },

  initToggleButtons(
    buttonClass = ".theme-toggle-btn",
    iconContainerClass = ".theme-icon-container",
  ) {
    const buttons = document.querySelectorAll(buttonClass);
    const iconContainers = document.querySelectorAll(iconContainerClass);

    if (!buttons.length || !iconContainers.length) return;

    // 1. O PADRÃO PREMIUM: Rotação oposta com Scale. 
    // O Sol gira pra esquerda e some. A Lua vem da direita girando e cresce.
    iconContainers.forEach((container) => {
      container.classList.add("relative", "flex", "items-center", "justify-center");
      
      // Limpamos estilos inline antigos que podiam estar conflitando
      container.style = "";
      
      container.innerHTML = `
        <i data-lucide="sun" class="absolute h-[1.25rem] w-[1.25rem] rotate-0 scale-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] dark:-rotate-90 dark:scale-0"></i>
        <i data-lucide="moon" class="absolute h-[1.25rem] w-[1.25rem] rotate-90 scale-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] dark:rotate-0 dark:scale-100"></i>
      `;
    });

    // 2. Renderiza o SVG do Lucide
    createIcons({
      icons: { Moon, Sun },
      nameAttr: "data-lucide",
      attrs: { "stroke-width": 1.5 },
    });

    const handleToggle = () => {
      // Como o Tailwind cuida de toda a transição através das classes dark:, 
      // não precisamos de setTimeout, variáveis de controle ou hacks no JS.
      this.toggle();
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleToggle);
    });
  },
};