import "./style.css";

const app = document.querySelector("#app");

// Renderizador inicial simples para testar a fluidez
const renderHero = () => {
  app.innerHTML = `
    <div class="h-full flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div class="glass p-10 rounded-[3rem] text-center max-w-sm w-full shadow-2xl">
        <h1 class="text-3xl font-bold tracking-tight mb-2">PodoSys</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Gestão Premium de Podologia</p>
        <button id="btn-iniciar" class="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-semibold active:scale-95 transition-all duration-150 shadow-lg">
          Entrar no Sistema
        </button>
      </div>
    </div>
  `;
};

renderHero();
