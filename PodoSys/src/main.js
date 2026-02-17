import "./style.css";

// Ponto de entrada da SPA sem framework
const app = document.querySelector("#app");

const renderHome = () => {
  app.innerHTML = `
    <div class="h-full flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div class="glass p-8 rounded-[2.5rem] text-center max-w-sm w-full shadow-2xl">
        <h1 class="text-3xl font-bold tracking-tight mb-2">PodoSys</h1>
        <p class="text-slate-500 dark:text-slate-400 mb-6">Agendamento Premium para Podologia</p>
        <button id="start" class="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-semibold active:scale-95 transition-transform duration-150">
          Começar agora
        </button>
      </div>
    </div>
  `;
};

renderHome();
