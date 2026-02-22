import { createIcons, Moon, Sun } from "lucide";

const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

function createThemeIcon(theme) {
  const icon = document.createElement("i");
  if (theme === DARK_THEME) {
    icon.setAttribute("data-lucide", "moon");
  } else {
    icon.setAttribute("data-lucide", "sun");
  }
  // Tamanho compatível com os ícones anteriores do FA
  icon.style.width = "1.15rem";
  icon.style.height = "1.15rem";
  return icon;
}

function applyTheme(theme) {
  const isDarkTheme = theme === DARK_THEME;

  document.documentElement.classList.toggle(DARK_THEME, isDarkTheme);
  localStorage.setItem(
    THEME_STORAGE_KEY,
    isDarkTheme ? DARK_THEME : LIGHT_THEME,
  );

  return isDarkTheme ? DARK_THEME : LIGHT_THEME;
}

function getCurrentTheme() {
  return document.documentElement.classList.contains(DARK_THEME)
    ? DARK_THEME
    : LIGHT_THEME;
}

function updateThemeIcons(containers, theme) {
  containers.forEach((container) => {
    container.replaceChildren(createThemeIcon(theme));
  });

  // Mágica necessária para o Lucide renderizar ícones injetados via JS
  createIcons({
    icons: { Moon, Sun },
    nameAttr: "data-lucide",
    attrs: { "stroke-width": 1.5 },
  });
}

function bindThemeToggle(buttonElement, onToggle) {
  buttonElement.addEventListener("click", onToggle);
}

export const ThemeManager = {
  get current() {
    return getCurrentTheme();
  },

  toggle() {
    const nextTheme = this.current === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    return applyTheme(nextTheme);
  },

  initToggleButtons(
    buttonClass = ".theme-toggle-btn",
    iconContainerClass = ".theme-icon-container",
  ) {
    const buttons = document.querySelectorAll(buttonClass);
    const iconContainers = document.querySelectorAll(iconContainerClass);

    if (!buttons.length || !iconContainers.length) {
      return;
    }

    const handleToggle = () => {
      document.documentElement.classList.add("theme-transitioning");

      // Icon animation — identical to reference repo
      iconContainers.forEach((container) => {
        container.style.transition =
          "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)";
        container.style.transform = "rotate(360deg) scale(0.85)";

        setTimeout(() => {
          container.style.transform = "rotate(0deg) scale(1)";
        }, 400);
      });

      const activeTheme = this.toggle();
      updateThemeIcons(iconContainers, activeTheme);

      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 400);
    };

    updateThemeIcons(iconContainers, this.current);

    buttons.forEach((button) => {
      bindThemeToggle(button, handleToggle);
    });
  },
};
