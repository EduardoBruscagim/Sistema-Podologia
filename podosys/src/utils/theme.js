const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const ICON_CONFIG = {
  [LIGHT_THEME]: {
    className: "lucide lucide-sun",
    paths: [
      { tag: "circle", attrs: { cx: "12", cy: "12", r: "4" } },
      { tag: "path", attrs: { d: "M12 2v2" } },
      { tag: "path", attrs: { d: "M12 20v2" } },
      { tag: "path", attrs: { d: "m4.93 4.93 1.41 1.41" } },
      { tag: "path", attrs: { d: "m17.66 17.66 1.41 1.41" } },
      { tag: "path", attrs: { d: "M2 12h2" } },
      { tag: "path", attrs: { d: "M20 12h2" } },
      { tag: "path", attrs: { d: "m6.34 17.66-1.41 1.41" } },
      { tag: "path", attrs: { d: "m19.07 4.93-1.41 1.41" } },
    ],
  },
  [DARK_THEME]: {
    className: "lucide lucide-moon",
    paths: [
      { tag: "path", attrs: { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" } },
    ],
  },
};

function createSvgElement(tagName, attributes) {
  const element = document.createElementNS(SVG_NAMESPACE, tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  return element;
}

function createThemeIcon(theme) {
  const iconDefinition = ICON_CONFIG[theme] ?? ICON_CONFIG[LIGHT_THEME];

  const svg = createSvgElement("svg", {
    xmlns: SVG_NAMESPACE,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: iconDefinition.className,
  });

  iconDefinition.paths.forEach(({ tag, attrs }) => {
    svg.appendChild(createSvgElement(tag, attrs));
  });

  return svg;
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
      const activeTheme = this.toggle();
      updateThemeIcons(iconContainers, activeTheme);
    };

    updateThemeIcons(iconContainers, this.current);

    buttons.forEach((button) => {
      bindThemeToggle(button, handleToggle);
    });
  },
};
