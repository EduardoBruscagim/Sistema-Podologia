import "./styles/global.css";
import {
  renderLandingPage,
  initLandingEvents,
} from "./features/landing/index.js";
// Importação dos novos ícones Menu e X garantindo o Tree-shaking
import {
  createIcons,
  Footprints,
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
} from "lucide";

function bootstrap() {
  const root = document.getElementById("app");
  if (!root)
    throw new Error("Critical: Root element #app missing from index.html");

  root.innerHTML = renderLandingPage();

  requestAnimationFrame(() => {
    initLandingEvents();

    // Atualizado para varrer os ícones da navegação mobile
    createIcons({
      icons: { Footprints, ArrowRight, ChevronRight, LayoutDashboard, Menu, X },
      nameAttr: "data-lucide",
      attrs: { "stroke-width": 1.5 },
    });
  });
}

document.addEventListener("DOMContentLoaded", bootstrap);
