import "./styles/global.css";
import {
  renderLandingPage,
  initLandingEvents,
} from "./features/landing/index.js";
import {
  createIcons,
  Footprints,
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
} from "lucide";

const ROOT_SELECTOR = "app";
const LUCIDE_ICONS = {
  Footprints,
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
};

function getRootElement() {
  const rootElement = document.getElementById(ROOT_SELECTOR);

  if (!rootElement) {
    throw new Error("Critical: Root element #app missing from index.html");
  }

  return rootElement;
}

function renderApplication(rootElement) {
  const template = document.createElement("template");
  template.innerHTML = renderLandingPage().trim();

  const landingView = template.content.firstElementChild;

  if (!landingView) {
    throw new Error("Critical: Landing view returned empty markup");
  }

  rootElement.replaceChildren(landingView);
}

function hydrateApplication() {
  initLandingEvents();

  createIcons({
    icons: LUCIDE_ICONS,
    nameAttr: "data-lucide",
    attrs: { "stroke-width": 1.5 },
  });
}

function bootstrap() {
  const rootElement = getRootElement();

  renderApplication(rootElement);
  requestAnimationFrame(hydrateApplication);
}

document.addEventListener("DOMContentLoaded", bootstrap);
