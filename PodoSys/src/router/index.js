/**
 * PodoSys Router - History API Controller
 * Gerencia a troca de estados da aplicação sem recarregar o documento. [cite: 67, 285]
 */

const app = document.querySelector("#app");

/**
 * Realiza a navegação para uma nova view com transição suave (60fps). [cite: 25-27, 305-307]
 */
export const navigate = (viewFunction) => {
  app.style.opacity = "0";

  setTimeout(() => {
    app.innerHTML = viewFunction();
    app.style.opacity = "1";

    // Notifica o sistema que a view mudou para reinicializar eventos
    window.dispatchEvent(new CustomEvent("view-changed"));
  }, 300);
};

export const initRouter = (routes) => {
  window.addEventListener("popstate", () => {
    const route = routes[window.location.pathname] || routes["/"];
    navigate(route);
  });
};
