// ============================================================
//  PodoSys — Landing Page
//  Estrutura visual e lógica de interação da página inicial.
// ============================================================

import { ThemeManager } from '../../utils/theme.js'

// ── Constantes ──────────────────────────────────────────────

const BACKDROP_HIDDEN = ['opacity-0', 'pointer-events-none']
const BACKDROP_VISIBLE = ['opacity-100', 'pointer-events-auto']

// ── Template ────────────────────────────────────────────────

/**
 * Retorna o markup completo da landing page.
 * HTML como template string para manter a landing auto-contida.
 */
export function renderLandingPage() {
  return `
    <div class="landing-page-bg bg-[radial-gradient(ellipse_at_50%_0%,#bfdbfe_0%,#a5b4fc_30%,#c7d2fe_55%,#e0e7ff_80%,#f1f5f9_100%)] min-h-screen relative overflow-x-hidden">

      <!-- ─── Header fixo com glassmorphism ─── -->
      <header class="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] max-w-6xl z-40">
        <div class="apple-glass rounded-2xl px-2 sm:px-3">
          <div class="h-16 flex items-center justify-between gap-2">

            <!-- Logo -->
            <div class="flex items-center gap-2 px-2 cursor-default min-w-0">
              <i data-lucide="footprints" class="text-blue-600 dark:text-blue-500 w-6 h-6 shrink-0"></i>
              <span class="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                PodoSys
              </span>
            </div>

            <!-- Nav Desktop -->
            <nav class="hidden md:flex items-center gap-2">
              <button
                class="theme-toggle-btn w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-2xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0c]"
                aria-label="Alternar tema"
              >
                <span class="theme-icon-container flex items-center justify-center"></span>
              </button>

              <button
                id="btn-login-desktop"
                class="h-11 px-5 text-sm font-medium bg-blue-600 text-white rounded-2xl hover:opacity-90 apple-transition active:scale-95 ml-1 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0c]"
              >
                Acessar Painel
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </nav>

            <!-- Hamburger Mobile -->
            <div class="md:hidden flex items-center gap-2 pr-1">
              <button
                id="btn-mobile-open"
                class="w-10 h-10 flex items-center justify-center text-gray-900 dark:text-white bg-transparent rounded-2xl active:scale-95 apple-transition outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Abrir menu"
              >
                <i data-lucide="menu" class="w-6 h-6 stroke-[1.5]"></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      <!-- ─── Backdrop do Drawer mobile ─── -->
      <div
        id="mobile-backdrop"
        class="fixed inset-0 z-40 bg-gray-900/20 dark:bg-black/50 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-500 ease-out md:hidden"
      ></div>

      <!-- ─── Drawer mobile ─── -->
      <div
        id="mobile-drawer"
        class="fixed inset-x-0 bottom-0 z-50 md:hidden flex flex-col overflow-hidden apple-glass rounded-t-[32px] border-t border-white/40 dark:border-white/10 shadow-[0_-25px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_-25px_50px_rgba(0,0,0,0.8)] pb-8 pt-2 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 pointer-events-none"
      >
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between p-2">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Aparência</span>

            <button
              class="theme-toggle-btn w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Alternar tema"
            >
              <span class="theme-icon-container flex items-center justify-center"></span>
            </button>
          </div>

          <hr class="border-gray-100 dark:border-white/5 my-2" />

          <button
            id="btn-login-mobile"
            class="w-full py-4 text-sm font-medium bg-blue-600 text-white rounded-2xl hover:opacity-90 apple-transition active:scale-95 flex items-center justify-center gap-2 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1c1c1e]"
          >
            Acessar Painel
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- ─── Hero ─── -->
      <main class="pt-36 sm:pt-40 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter mb-6 max-w-4xl text-gray-900 dark:text-white leading-tight">
          Agenda inteligente para <br />
          <span class="text-blue-600 dark:text-blue-500">clínicas de podologia.</span>
        </h1>

        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Gerencie horários comerciais, evite conflitos de agendamento e ofereça
          uma experiência premium. Tudo em tempo real e na palma da mão.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            id="btn-start"
            class="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-blue-600 text-white rounded-2xl shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:opacity-90 apple-transition active:scale-95 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0a0a0c]"
          >
            Começar Gratuitamente
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Dashboard Preview -->
        <div
          id="dashboard-preview"
          class="mt-20 w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden flex items-center justify-center relative ring-1 ring-black/5 dark:ring-white/10 apple-glass cursor-default"
        >
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-300/5 dark:from-blue-500/8 dark:to-cyan-400/5"></div>

          <span class="text-gray-500 dark:text-gray-500 font-medium text-sm tracking-widest uppercase flex items-center gap-2 relative">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            Interface do Dashboard (Em Breve)
          </span>
        </div>
      </main>
    </div>
  `
}

// ── Helpers ──────────────────────────────────────────────────

/** Troca classes de um elemento de forma segura. */
function setElementState(element, removeClasses, addClasses) {
  if (!element) return
  element.classList.remove(...removeClasses)
  element.classList.add(...addClasses)
}

/** Abre o drawer mobile com animação e trava o scroll. */
function openMobileDrawer(drawer, backdrop) {
  if (!drawer || !backdrop) return

  drawer.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none')
  drawer.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto')

  setElementState(backdrop, BACKDROP_HIDDEN, BACKDROP_VISIBLE)

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

/** Fecha o drawer mobile com animação de saída e libera o scroll. */
function closeMobileDrawer(drawer, backdrop) {
  if (!drawer || !backdrop) return

  drawer.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto')
  drawer.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none')

  setElementState(backdrop, BACKDROP_VISIBLE, BACKDROP_HIDDEN)

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

/** Bind seguro por ID — silencioso quando o elemento não existe. */
function bindClick(id, handler) {
  document.getElementById(id)?.addEventListener('click', handler)
}

// ── Inicialização de Eventos ────────────────────────────────

/**
 * Registra todos os event listeners da landing page.
 * Chamado após o DOM estar montado e os ícones renderizados.
 */
export function initLandingEvents() {
  ThemeManager.initToggleButtons()

  const drawer = document.getElementById('mobile-drawer')
  const backdrop = document.getElementById('mobile-backdrop')

  document.getElementById('btn-mobile-open')?.addEventListener('click', () => {
    openMobileDrawer(drawer, backdrop)
  })

  backdrop?.addEventListener('click', () => {
    closeMobileDrawer(drawer, backdrop)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer?.classList.contains('translate-y-full')) {
      closeMobileDrawer(drawer, backdrop)
    }
  })

  // ── Integração com Auth Drawer ──────────────────────────────

  bindClick('btn-login-desktop', () => {
    window.openAuthDrawer?.()
  })

  bindClick('btn-login-mobile', () => {
    closeMobileDrawer(drawer, backdrop)
    window.openAuthDrawer?.()
  })

  bindClick('btn-start', () => {
    window.openAuthDrawer?.()
  })
}
