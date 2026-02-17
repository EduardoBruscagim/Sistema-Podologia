/**
 * PodoSys Router - History API Controller
 * Controla a navegação SPA sem refresh de página. [cite: 67, 353-355]
 * * @module Router
 */

const app = document.querySelector("#app");

/**
 * Altera a view actual com uma transição de opacidade (60fps). [cite: 25, 305-307]
 * @param {Function} viewFunction - Função que retorna a string HTML da página.
 */
export const navigate = (viewFunction) => {
  if (!app) return;

  // Início da transição de saída
  app.style.opacity = "0";

  setTimeout(() => {
    app.innerHTML = viewFunction();
    app.style.opacity = "1";

    // Dispara evento para reinicializar listeners de componentes dinâmicos
    window.dispatchEvent(new CustomEvent("view-changed"));
  }, 300); // Sincronizado com a duração da transição no style.css
};

/**
 * Inicializa o listener de histórico para suportar os botões 'Voltar/Avançar' do browser. [cite: 355]
 * @param {Object} routes - Mapeamento de caminhos para funções de renderização.
 */
export const initRouter = (routes) => {
  window.addEventListener("popstate", () => {
    const route = routes[window.location.pathname] || routes["/"];
    navigate(route);
  });
};
