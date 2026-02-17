import "../src/style.css";
import { renderLanding } from "./features/landing/index.js";
import { navigate, initRouter } from "./router/index.js";

const routes = {
  "/": renderLanding,
};

const init = () => {
  initRouter(routes);

  // Renderização inicial
  const container = document.querySelector("#app");
  if (container) {
    container.innerHTML = renderLanding();
  }

  // Event Delegation para capturar cliques no botão dinâmico
  document.addEventListener("click", (e) => {
    if (e.target.id === "btn-explorar") {
      console.log("Navegação iniciada...");
      // navigate(renderAgenda); // Exemplo de uso futuro
    }
  });
};

init();
