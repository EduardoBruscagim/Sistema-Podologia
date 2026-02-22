// Centralização da gestão de tema.
// Refatorado para suportar múltiplos botões (Desktop/Mobile) via querySelectorAll
// SVGs puros do Lucide hardcoded para performance extrema.

const ICONS = {
  light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  dark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
};

export const ThemeManager = {
  get current() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  },

  toggle() {
    const isDark = this.current === "dark";
    const newTheme = isDark ? "light" : "dark";

    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);

    return newTheme;
  },

  initToggleButtons(
    buttonClass = ".theme-toggle-btn",
    iconContainerClass = ".theme-icon-container",
  ) {
    const btns = document.querySelectorAll(buttonClass);
    const containers = document.querySelectorAll(iconContainerClass);

    if (!btns.length) return;

    const updateIcons = (theme) => {
      containers.forEach((container) => {
        container.innerHTML = theme === "dark" ? ICONS.dark : ICONS.light;
      });
    };

    updateIcons(this.current);

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        updateIcons(this.toggle());
      });
    });
  },
};
