// ============================================================
//  PodoSys — Entry Point
//  Bootstrap da aplicação: monta a view e inicializa os eventos.
// ============================================================

import "./styles/global.css";

import {
  renderLandingPage,
  initLandingEvents,
} from "./features/landing/index.js";

import {
  createIcons,
  ArrowRight,
  ChevronRight,
  Footprints,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide";

// ── Constantes ──────────────────────────────────────────────

const ROOT_SELECTOR = "app";

// Registro único e centralizado de todos os ícones da aplicação.
// Sun/Moon incluídos aqui para evitar chamadas duplicadas de createIcons.
const LUCIDE_ICONS = {
  ArrowRight,
  ChevronRight,
  Footprints,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  X,
};

// ── Funções internas ────────────────────────────────────────

/**
 * Retorna o elemento raiz da aplicação.
 * Falha crítica caso #app não exista no DOM.
 */
function getRootElement() {
  const root = document.getElementById(ROOT_SELECTOR);

  if (!root) {
    throw new Error("Critical: Root element #app missing from index.html");
  }

  return root;
}

/**
 * Gera o HTML da landing page e injeta no DOM.
 * Usa <template> para evitar parsing desnecessário.
 */
function renderApplication(rootElement) {
  const template = document.createElement("template");
  template.innerHTML = renderLandingPage().trim();

  const landingView = template.content.firstElementChild;

  if (!landingView) {
    throw new Error("Critical: Landing view returned empty markup");
  }

  rootElement.replaceChildren(landingView);
}

/**
 * Inicializa event listeners e renderiza os ícones Lucide.
 * Executado no próximo frame para garantir que o DOM já foi renderizado.
 */
function hydrateApplication() {
  // initLandingEvents injeta o HTML dos ícones de tema no DOM.
  // createIcons roda DEPOIS para renderizar tudo de uma vez.
  initLandingEvents();

  createIcons({
    icons: LUCIDE_ICONS,
    nameAttr: "data-lucide",
    attrs: { "stroke-width": 1.5 },
  });
}

// ── Bootstrap ───────────────────────────────────────────────

function bootstrap() {
  const rootElement = getRootElement();

  renderApplication(rootElement);

  // requestAnimationFrame garante que o DOM está pronto para hidratação
  requestAnimationFrame(hydrateApplication);
}

document.addEventListener("DOMContentLoaded", bootstrap);
