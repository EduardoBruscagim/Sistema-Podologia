import { ThemeManager } from '../../utils/theme.js';

// Camada de apresentação Mobile First
// Implementação de Floating Context Menu (MacOS Style) com ease-spring

export function renderLandingPage() {
  return `
    <div class="min-h-screen bg-gray-50 dark:bg-[var(--color-dark-bg)] transition-colors duration-300 relative overflow-x-hidden">
      
      <header class="fixed top-0 w-full z-40 apple-glass">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2 cursor-default">
            <i data-lucide="footprints" class="text-blue-600 dark:text-blue-500 w-6 h-6"></i>
            <span class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">PodoSys.</span>
          </div>
          
          <nav class="hidden md:flex items-center gap-2">
            <button class="theme-toggle-btn w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none" aria-label="Alternar tema">
              <span class="theme-icon-container transition-transform duration-300 hover:rotate-12 flex items-center justify-center"></span>
            </button>
            <button id="btn-login-desktop" class="px-5 py-2 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full hover:opacity-90 apple-transition transform active:scale-95 ml-2 flex items-center gap-2">
              Acessar Painel
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </nav>

          <button id="btn-mobile-open" class="md:hidden w-12 h-12 flex items-center justify-center text-gray-900 dark:text-white active:scale-95 apple-transition focus:outline-none" aria-label="Abrir menu">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </header>

      <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-gray-900/20 dark:bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 ease-out md:hidden"></div>

      <div id="mobile-popup" class="fixed top-20 right-6 w-64 z-50 bg-white/95 dark:bg-[var(--color-dark-surface)]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-white/10 origin-top-right transform scale-90 translate-y-[-20px] opacity-0 pointer-events-none will-change-transform transition-all duration-500 ease-[var(--ease-spring)] md:hidden flex flex-col overflow-hidden">
        
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between p-2">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Aparência</span>
            <button class="theme-toggle-btn w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors focus:outline-none" aria-label="Alternar tema">
              <span class="theme-icon-container transition-transform duration-300 flex items-center justify-center scale-90"></span>
            </button>
          </div>

          <hr class="border-gray-100 dark:border-white/5 my-1" />

          <button id="btn-login-mobile" class="w-full py-3 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl hover:opacity-90 apple-transition transform active:scale-95 flex items-center justify-center gap-2 shadow-sm">
            Acessar Painel
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <main class="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter mb-6 max-w-4xl text-gray-900 dark:text-white leading-tight">
          A agenda inteligente para <br/>
          <span class="text-blue-600 dark:text-blue-500">clínicas de podologia.</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Gerencie horários comerciais, evite conflitos de agendamento e ofereça uma experiência premium. Tudo em tempo real e na palma da mão.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button id="btn-start" class="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-blue-600 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:bg-blue-700 apple-transition transform active:scale-95 flex items-center justify-center gap-2">
            Começar Gratuitamente
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="mt-20 w-full max-w-5xl aspect-[16/9] bg-white dark:bg-[var(--color-dark-surface)] rounded-[2rem] shadow-2xl border border-gray-200/50 dark:border-white/5 overflow-hidden flex items-center justify-center relative ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent"></div>
          <span class="text-gray-400 dark:text-gray-600 font-medium text-sm tracking-widest uppercase flex items-center gap-2">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            Interface do Dashboard (Em Breve)
          </span>
        </div>
      </main>
    </div>
  `;
}

export function initLandingEvents() {
  ThemeManager.initToggleButtons(); 

  const popup = document.getElementById('mobile-popup');
  const backdrop = document.getElementById('mobile-backdrop');
  const btnOpen = document.getElementById('btn-mobile-open');
  
  // Utilizando GPU (will-change) e a curva spring nativa para a física do movimento
  const togglePopup = (isOpen) => {
    if (isOpen) {
      popup.classList.remove('scale-90', 'translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
      popup.classList.add('scale-100', 'translate-y-0', 'opacity-100', 'pointer-events-auto');
      
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      
      document.body.style.overflow = 'hidden'; 
    } else {
      popup.classList.remove('scale-100', 'translate-y-0', 'opacity-100', 'pointer-events-auto');
      popup.classList.add('scale-90', 'translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
      
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      
      document.body.style.overflow = '';
    }
  };

  btnOpen?.addEventListener('click', () => togglePopup(true));
  backdrop?.addEventListener('click', () => togglePopup(false)); 

  const attachLoginClick = (id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      console.info(`Trigger: Navegação para Auth via ${id}`);
    });
  };

  attachLoginClick('btn-login-desktop');
  attachLoginClick('btn-login-mobile');

  document.getElementById('btn-start')?.addEventListener('click', () => {
    console.info('Trigger: Fluxo de Onboarding');
  });
}