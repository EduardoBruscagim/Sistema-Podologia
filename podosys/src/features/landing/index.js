// -----------------------------------------------------------------------------
// PodoSys — Landing Page
// Estrutura visual e lógica de interação da página inicial.
// -----------------------------------------------------------------------------

import { ThemeManager } from '../../utils/theme.js'
import { lockScroll, unlockScroll } from '../../utils/scrollLock.js'
import { eventBus } from '../../utils/eventBus.js'
import { registerEscapeHandler } from '../../utils/escapeStack.js'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BACKDROP_HIDDEN = ['opacity-0', 'pointer-events-none']
const BACKDROP_VISIBLE = ['opacity-100', 'pointer-events-auto']

// -----------------------------------------------------------------------------
// Template
// -----------------------------------------------------------------------------

/**
 * Retorna o markup completo da landing page.
 * HTML como template string para manter a landing auto-contida.
 */
export function renderLandingPage() {
  return `
    <div class="landing-page-bg landing-gradient-light min-h-screen relative overflow-x-hidden">

      <!-- Header fixo com glassmorphism -->
      <header class="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] max-w-6xl lg:max-w-7xl z-40">
        <div class="apple-glass rounded-2xl px-2 sm:px-3 lg:px-4">
          <div class="h-16 flex items-center justify-between gap-2">

            <!-- Logo -->
            <div class="flex items-center gap-2 px-2 cursor-default min-w-0">
              <i data-lucide="footprints" aria-hidden="true" class="text-blue-600 dark:text-blue-500 w-6 h-6 shrink-0"></i>
              <span class="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                PodoSys
              </span>
            </div>

            <!-- Nav Desktop -->
            <nav class="hidden md:flex items-center gap-2" aria-label="Navegação Principal">
              <button
                class="
                  theme-toggle-btn w-12 h-12 flex items-center justify-center
                  text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                  rounded-2xl transition-colors outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg
                "
                aria-label="Alternar tema"
              >
                <span class="theme-icon-container relative flex items-center justify-center w-5 h-5"></span>
              </button>

              <button
                id="btn-login-desktop"
                class="
                  h-11 px-5 lg:px-6 text-sm lg:text-base font-medium bg-blue-600 text-white rounded-2xl
                  hover:opacity-90 apple-transition active:scale-95 ml-1
                  flex items-center gap-2 outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg
                "
              >
                Acessar Painel
                <i data-lucide="arrow-right" aria-hidden="true" class="w-4 h-4"></i>
              </button>
            </nav>

            <!-- Hamburger Mobile -->
            <div class="md:hidden flex items-center gap-2 pr-1">
              <button
                id="btn-mobile-open"
                class="
                  w-11 h-11 flex items-center justify-center
                  text-gray-900 dark:text-white bg-transparent rounded-2xl
                  active:scale-95 apple-transition outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                "
                aria-label="Abrir menu"
                aria-expanded="false"
                aria-controls="mobile-drawer"
              >
                <i data-lucide="menu" aria-hidden="true" class="w-6 h-6 stroke-[1.5]"></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      <!-- Backdrop do Drawer mobile -->
      <div
        id="mobile-backdrop"
        aria-hidden="true"
        class="
          fixed inset-0 z-40 bg-gray-900/20 dark:bg-black/50
          backdrop-blur-md opacity-0 pointer-events-none
          transition-opacity duration-500 ease-out md:hidden
        "
      ></div>

      <!-- Drawer mobile -->
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-drawer-title"
        class="
          fixed inset-x-0 bottom-0 z-50 md:hidden flex flex-col overflow-hidden
          apple-glass rounded-t-[32px] border-t border-white/40 dark:border-white/10
          shadow-[0_-25px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_-25px_50px_rgba(0,0,0,0.8)]
          pb-[max(2rem,env(safe-area-inset-bottom))] pt-2 transform transition-all duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          translate-y-full opacity-0 pointer-events-none
        "
      >
        <div class="p-4 flex flex-col gap-2">
          <h2 id="mobile-drawer-title" class="sr-only">Menu de navegação mobile</h2>

          <div class="flex items-center justify-between p-2">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Aparência</span>

            <button
              class="
                theme-toggle-btn w-11 h-11 flex items-center justify-center
                text-gray-600 dark:text-gray-300 rounded-full transition-colors
                outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              "
              aria-label="Alternar tema"
            >
              <span class="theme-icon-container relative flex items-center justify-center w-5 h-5"></span>
            </button>
          </div>

          <hr class="border-gray-200 dark:border-white/10 my-2" />

          <button
            id="btn-login-mobile"
            class="
              w-full py-4 text-sm font-medium bg-blue-600 text-white rounded-2xl
              hover:opacity-90 apple-transition active:scale-95
              flex items-center justify-center gap-2 shadow-sm outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-card
            "
          >
            Acessar Painel
            <i data-lucide="arrow-right" aria-hidden="true" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Hero -->
      <main class="pt-32 sm:pt-40 lg:pt-44 pb-16 lg:pb-24 px-4 sm:px-6 max-w-7xl xl:max-w-[88rem] mx-auto flex flex-col items-center text-center relative">
        <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-semibold tracking-tight mb-6 max-w-4xl lg:max-w-5xl text-gray-900 dark:text-white leading-tight lg:leading-[1.1] [text-wrap:balance]">
          Agenda inteligente para
          <span class="text-blue-600 dark:text-blue-500">clínicas de podologia</span>
        </h1>

        <p class="text-base sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl lg:max-w-3xl leading-relaxed">
          Gerencie horários comerciais, evite conflitos de agendamento e ofereça
          uma experiência premium. Tudo em tempo real e na palma da mão.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 lg:mb-20">
          <button
            id="btn-start"
            class="
              w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-4.5 text-lg lg:text-xl font-medium
              bg-blue-600 text-white rounded-2xl
              shadow-[0_8px_30px_rgb(37,99,235,0.3)]
              hover:opacity-90 apple-transition active:scale-95
              flex items-center justify-center gap-2 outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg
            "
          >
            Começar Gratuitamente
            <i data-lucide="chevron-right" aria-hidden="true" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Dashboard Preview (Mockup Vivo da Agenda PodoSys) -->
        <div
          id="dashboard-preview"
          class="
            w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl rounded-3xl overflow-hidden text-left shadow-2xl
            ring-1 ring-black/10 dark:ring-white/15 apple-glass cursor-default relative
          "
        >
          <!-- Barra de controle superior do mockup -->
          <div class="px-6 py-4 border-b border-gray-200/80 dark:border-white/10 flex items-center justify-between bg-white/40 dark:bg-white/5">
            <div class="flex items-center gap-3">
              <span class="w-3 h-3 rounded-full bg-red-400" aria-hidden="true"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400" aria-hidden="true"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400" aria-hidden="true"></span>
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-2 hidden sm:inline-block">PodoSys Agenda — Painel da Clínica</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 dark:bg-emerald-400/10 border border-emerald-500/30">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                Ao Vivo
              </span>
            </div>
          </div>

          <!-- Métricas mockadas -->
          <div class="p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 border-b border-gray-200/60 dark:border-white/5">
            <div class="p-4 lg:p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <i data-lucide="calendar" aria-hidden="true" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">Consultas Hoje</p>
                <p class="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">12 Pacientes</p>
              </div>
            </div>

            <div class="p-4 lg:p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <i data-lucide="user-check" aria-hidden="true" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">Em Atendimento</p>
                <p class="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">2 Confirmados</p>
              </div>
            </div>

            <div class="p-4 lg:p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <i data-lucide="clock" aria-hidden="true" class="w-5 h-5"></i>
              </div>
              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">Próximo Horário</p>
                <p class="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">09:30 — Dra. Camila</p>
              </div>
            </div>
          </div>

          <!-- Tabela mockada da agenda de podologia -->
          <div class="p-6 lg:p-8 overflow-x-auto">
            <table class="w-full text-sm lg:text-base text-left" aria-label="Tabela de horários e pacientes agendados hoje">
              <caption class="sr-only">Agenda de consultas e atendimentos do dia na clínica de podologia</caption>
              <thead>
                <tr class="text-xs lg:text-sm text-gray-700 dark:text-gray-300 uppercase border-b border-gray-200/60 dark:border-white/10">
                  <th scope="col" class="pb-3 font-semibold">Horário</th>
                  <th scope="col" class="pb-3 font-semibold">Paciente</th>
                  <th scope="col" class="pb-3 font-semibold hidden sm:table-cell">Procedimento</th>
                  <th scope="col" class="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200/40 dark:divide-white/5 font-medium text-gray-800 dark:text-gray-200">
                <tr>
                  <th scope="row" class="py-3.5 flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                    <i data-lucide="clock" aria-hidden="true" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                    09:00
                  </th>
                  <td class="py-3.5">Ana Souza</td>
                  <td class="py-3.5 text-gray-600 dark:text-gray-300 hidden sm:table-cell">Tratamento de Onicocriptose</td>
                  <td class="py-3.5 text-right">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 dark:bg-emerald-400/10">
                      Em Atendimento
                    </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="py-3.5 flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                    <i data-lucide="clock" aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400"></i>
                    10:30
                  </th>
                  <td class="py-3.5">Carlos Lima</td>
                  <td class="py-3.5 text-gray-600 dark:text-gray-300 hidden sm:table-cell">Podologia Preventiva & Laser</td>
                  <td class="py-3.5 text-right">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold bg-blue-500/15 text-blue-800 dark:text-blue-300 dark:bg-blue-400/10">
                      Confirmado
                    </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="py-3.5 flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                    <i data-lucide="clock" aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400"></i>
                    14:00
                  </th>
                  <td class="py-3.5">Juliana Melo</td>
                  <td class="py-3.5 text-gray-600 dark:text-gray-300 hidden sm:table-cell">Exame de Podometria Computadorizada</td>
                  <td class="py-3.5 text-right">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs lg:text-sm font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 dark:bg-amber-400/10">
                      Agendado
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Rodapé Semântico (Footer — Enxuto & Compacto) -->
      <footer class="w-full border-t border-gray-200/50 dark:border-white/10 pt-6 lg:py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-4 mt-12 sm:mt-20 lg:mt-24 relative z-10 text-xs lg:text-sm text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-black/30 backdrop-blur-md">
        <div class="max-w-7xl xl:max-w-[88rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div class="flex items-center gap-2 justify-center sm:justify-start">
            <i data-lucide="footprints" aria-hidden="true" class="w-4 h-4 text-blue-600 dark:text-blue-500"></i>
            <span class="font-semibold text-gray-900 dark:text-white text-xs lg:text-sm">PodoSys</span>
            <span class="text-[11px] lg:text-xs text-gray-600 dark:text-gray-400 ml-1">© 2026</span>
          </div>

          <nav class="flex items-center justify-center gap-3 text-[11px] lg:text-xs font-medium text-gray-600 dark:text-gray-400" aria-label="Navegação do Rodapé">
            <a href="#" class="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Termos</a>
            <span class="text-gray-300 dark:text-gray-700" aria-hidden="true">•</span>
            <a href="#" class="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Privacidade (LGPD)</a>
            <span class="text-gray-300 dark:text-gray-700" aria-hidden="true">•</span>
            <a href="#" class="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Suporte</a>
          </nav>
        </div>
      </footer>
    </div>
  `
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Troca classes de um elemento de forma segura. */
function setElementState(element, removeClasses, addClasses) {
  if (!element) return
  element.classList.remove(...removeClasses)
  element.classList.add(...addClasses)
}

let lastMobileTrigger = null

/** Abre o drawer mobile com animação, retenção de foco e trava o scroll. */
function openMobileDrawer(drawer, backdrop) {
  if (!drawer || !backdrop) return

  lastMobileTrigger = document.activeElement

  const openBtn = document.getElementById('btn-mobile-open')
  if (openBtn) openBtn.setAttribute('aria-expanded', 'true')

  drawer.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none')
  drawer.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto')

  setElementState(backdrop, BACKDROP_HIDDEN, BACKDROP_VISIBLE)
  lockScroll()

  // Foco inicial no primeiro elemento interativo do drawer
  requestAnimationFrame(() => {
    const focusable = drawer.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    if (focusable.length > 0) focusable[0].focus()
  })
}

/** Fecha o drawer mobile com animação de saída, restaura o foco e libera o scroll. */
function closeMobileDrawer(drawer, backdrop) {
  if (!drawer || !backdrop) return

  const openBtn = document.getElementById('btn-mobile-open')
  if (openBtn) openBtn.setAttribute('aria-expanded', 'false')

  drawer.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto')
  drawer.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none')

  setElementState(backdrop, BACKDROP_VISIBLE, BACKDROP_HIDDEN)
  unlockScroll()

  if (lastMobileTrigger && typeof lastMobileTrigger.focus === 'function') {
    lastMobileTrigger.focus()
  }
}

/** Captura o Tab para evitar que o foco saia do drawer mobile aberto. */
function handleMobileDrawerFocusTrap(e) {
  const drawer = document.getElementById('mobile-drawer')
  if (!drawer || drawer.classList.contains('translate-y-full')) return
  if (e.key !== 'Tab') return

  const focusables = Array.from(
    drawer.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  )
  if (focusables.length === 0) return

  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first || !drawer.contains(document.activeElement)) {
      last.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === last || !drawer.contains(document.activeElement)) {
      first.focus()
      e.preventDefault()
    }
  }
}

/** Bind seguro por ID — silencioso quando o elemento não existe. */
function bindClick(id, handler) {
  document.getElementById(id)?.addEventListener('click', handler)
}

// -----------------------------------------------------------------------------
// Event Initialization
// -----------------------------------------------------------------------------

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

  document.addEventListener('keydown', handleMobileDrawerFocusTrap)

  // Escape handler — registrado no stack global (prioridade menor que auth)
  registerEscapeHandler(
    () => drawer && !drawer.classList.contains('translate-y-full'),
    () => closeMobileDrawer(drawer, backdrop),
  )

  // ---------------------------------------------------------------------------
  // Auth Drawer Integration (Event Bus)
  // ---------------------------------------------------------------------------

  bindClick('btn-login-desktop', () => eventBus.emit('auth:open', 'login'))

  bindClick('btn-login-mobile', () => {
    closeMobileDrawer(drawer, backdrop)
    eventBus.emit('auth:open', 'login')
  })

  bindClick('btn-start', () => eventBus.emit('auth:open', 'register'))
}
