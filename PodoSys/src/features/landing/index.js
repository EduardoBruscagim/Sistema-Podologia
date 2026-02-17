/**
 * Landing Page Module
 * Foco em tipografia fluida e hierarquia visual Apple-Like. [cite: 6-10, 287-293]
 */
export const renderLanding = () => {
  return `
    <div class="min-h-screen flex flex-col p-gutter animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-ios">
      <header class="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <h1 class="text-h1 font-bold tracking-tight leading-tight">
          Podologia levada ao <br/>
          <span class="bg-linear-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            nível máximo.
          </span>
        </h1>
        <p class="text-body text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          A plataforma de gestão ultra-rápida desenhada para profissionais que buscam excelência.
        </p>
        <button id="btn-explorar" class="btn-primary">Começar Agora</button>
      </header>
    </div>
  `;
};
