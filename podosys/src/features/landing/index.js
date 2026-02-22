import { ThemeManager } from "../../utils/theme.js";

const MOBILE_BACKDROP_HIDDEN_CLASSES = ["opacity-0", "pointer-events-none"];
const MOBILE_BACKDROP_VISIBLE_CLASSES = ["opacity-100", "pointer-events-auto"];

export function renderLandingPage() {
  return `
    <div class="landing-page-bg min-h-screen transition-colors duration-300 relative overflow-x-hidden" style="background:radial-gradient(ellipse at 50% 0%,#dbeafe 0%,#c7d2fe 35%,#e0e7ff 60%,#f1f5f9 100%);background-attachment:fixed">
      <header class="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] max-w-6xl z-40">
        <div class="apple-glass rounded-3xl px-2 sm:px-3">
          <div class="h-16 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 px-2 cursor-default min-w-0">
              <i data-lucide="footprints" class="text-blue-600 dark:text-blue-500 w-6 h-6 shrink-0"></i>
              <span class="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">PodoSys.</span>
            </div>

            <nav class="hidden md:flex items-center gap-2">
              <button
                class="theme-toggle-btn w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-xl transition-colors focus:outline-none"
                aria-label="Alternar tema"
              >
                <span class="theme-icon-container flex items-center justify-center"></span>
              </button>

              <button
                id="btn-login-desktop"
                class="h-11 px-5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 apple-transition active:scale-95 ml-1 flex items-center gap-2"
              >
                Acessar Painel
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </nav>

            <div class="md:hidden flex items-center gap-2 pr-1">
              <button
                id="btn-mobile-open"
                class="w-10 h-10 flex items-center justify-center text-gray-900 dark:text-white bg-transparent rounded-xl active:scale-95 apple-transition focus:outline-none"
                aria-label="Abrir menu"
              >
                <i data-lucide="menu" class="w-6 h-6" style="stroke-width:1.5"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-backdrop"
        class="fixed inset-0 z-40 bg-gray-900/20 dark:bg-black/50 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 ease-out md:hidden"
      ></div>

      <div
        id="mobile-popup"
        class="popover popover-hidden fixed top-24 right-2 left-2 z-50 rounded-2xl shadow-2xl md:hidden flex flex-col overflow-hidden" style="background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.8);-webkit-backdrop-filter:saturate(200%) blur(50px);backdrop-filter:saturate(200%) blur(50px)"
      >
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between p-2">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Aparência</span>

            <button
              class="theme-toggle-btn w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded-full transition-colors focus:outline-none"
              aria-label="Alternar tema"
            >
              <span class="theme-icon-container flex items-center justify-center"></span>
            </button>
          </div>

          <hr class="border-gray-100 dark:border-white/5 my-2" />

          <button
            id="btn-login-mobile"
            class="w-full py-4 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 apple-transition active:scale-95 flex items-center justify-center gap-2 shadow-sm"
          >
            Acessar Painel
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <main class="pt-36 sm:pt-40 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter mb-6 max-w-4xl text-gray-900 dark:text-white leading-tight">
          A agenda inteligente para <br />
          <span class="text-blue-600 dark:text-blue-500">clínicas de podologia.</span>
        </h1>

        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Gerencie horários comerciais, evite conflitos de agendamento e ofereça uma experiência premium. Tudo em tempo real e na palma da mão.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            id="btn-start"
            class="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-blue-600 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:bg-blue-700 apple-transition active:scale-95 flex items-center justify-center gap-2"
          >
            Começar Gratuitamente
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>

        <div id="dashboard-preview" class="mt-20 w-full max-w-5xl aspect-[16/9] rounded-[2rem] shadow-2xl overflow-hidden flex items-center justify-center relative ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300" style="background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.8);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-300/5 dark:from-blue-500/8 dark:to-cyan-400/5"></div>

          <span class="text-gray-500 dark:text-gray-500 font-medium text-sm tracking-widest uppercase flex items-center gap-2 relative">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            Interface do Dashboard (Em Breve)
          </span>
        </div>
      </main>
    </div>
  `;
}

function setElementState(element, removeClasses, addClasses) {
  if (!element) {
    return;
  }

  element.classList.remove(...removeClasses);
  element.classList.add(...addClasses);
}

function openMobilePopup(popupElement, backdropElement) {
  if (!popupElement || !backdropElement) {
    return;
  }

  popupElement.classList.remove("popover-hidden", "popover-closing");
  popupElement.classList.add("popover-open");

  setElementState(
    backdropElement,
    MOBILE_BACKDROP_HIDDEN_CLASSES,
    MOBILE_BACKDROP_VISIBLE_CLASSES,
  );
  document.body.style.overflow = "hidden";
}

function closeMobilePopup(popupElement, backdropElement) {
  if (!popupElement || !backdropElement) {
    return;
  }

  popupElement.classList.remove("popover-open");
  popupElement.classList.add("popover-closing");

  setElementState(
    backdropElement,
    MOBILE_BACKDROP_VISIBLE_CLASSES,
    MOBILE_BACKDROP_HIDDEN_CLASSES,
  );
  document.body.style.overflow = "";
}

function bindClickById(elementId, handler) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  element.addEventListener("click", handler);
}

export function initLandingEvents() {
  ThemeManager.initToggleButtons();

  const popupElement = document.getElementById("mobile-popup");
  const backdropElement = document.getElementById("mobile-backdrop");
  const mobileOpenButton = document.getElementById("btn-mobile-open");

  popupElement?.addEventListener("animationend", (event) => {
    if (event.animationName !== "popover-out") {
      return;
    }

    popupElement.classList.remove("popover-closing");
    popupElement.classList.add("popover-hidden");
  });

  mobileOpenButton?.addEventListener("click", () => {
    openMobilePopup(popupElement, backdropElement);
  });

  backdropElement?.addEventListener("click", () => {
    closeMobilePopup(popupElement, backdropElement);
  });

  bindClickById("btn-login-desktop", () => {});
  bindClickById("btn-login-mobile", () => {
    closeMobilePopup(popupElement, backdropElement);
  });
  bindClickById("btn-start", () => {});
}
