// -----------------------------------------------------------------------------
// PodoSys — Auth Drawer Template
// Markup HTML do modal/drawer de autenticação.
// -----------------------------------------------------------------------------

// Classe reutilizada em todos os inputs do formulário (text-base previne zoom indesejado no iOS)
const INPUT_CLASS = [
  'appearance-none h-12 px-4 rounded-xl text-base',
  'bg-gray-50/50 dark:bg-dark-input/50',
  'border-2 border-gray-200 dark:border-gray-700',
  'focus:bg-white dark:focus:bg-dark-input',
  'focus:border-blue-500 dark:focus:border-blue-500',
  'outline-none transition-all dark:text-white',
].join(' ')

export function renderAuthDrawer() {
  return `
    <!-- Backdrop -->
    <div
      id="auth-backdrop"
      class="fixed inset-0 z-40 hidden bg-black/40 dark:bg-black/60 backdrop-blur-md opacity-0 transition-opacity duration-500"
    ></div>

    <!-- Wrapper -->
    <div
      id="auth-wrapper"
      class="fixed inset-0 z-50 hidden items-end sm:items-center justify-center pointer-events-none sm:p-6"
    >

      <!-- Dialog -->
      <div
        id="auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        class="
          w-full sm:max-w-[420px] apple-glass sm:rounded-[32px] rounded-t-[32px]
          shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)]
          pointer-events-auto transform transition-all duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom sm:origin-top
          translate-y-full sm:translate-y-8 sm:scale-95 sm:opacity-0
          flex flex-col max-h-[90vh]
        "
      >

        <div class="px-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-8 sm:pt-8 pt-2 overflow-y-auto scrollbar-hide">

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h2
              id="auth-title"
              class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >Bem-vindo</h2>

            <button
              id="close-auth-btn"
              class="p-2 active:scale-90 transition-transform"
              aria-label="Fechar janela de autenticação"
            >
              <i
                data-lucide="x"
                aria-hidden="true"
                class="w-7 h-7 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-colors"
              ></i>
            </button>
          </div>

          <!-- Form -->
          <form id="auth-form" class="flex flex-col" novalidate>

            <!-- Register Fields (animated via grid-rows) -->
            <div
              id="register-fields"
              class="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div id="register-inner" class="overflow-hidden flex flex-col pointer-events-none">

                <div class="flex flex-col gap-1.5 mb-4 mt-1">
                  <label for="auth-name" class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                  <input type="text" id="auth-name" name="name" autocomplete="name" maxlength="120" placeholder="Ex: Maria Silva" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label for="auth-phone" class="text-sm font-medium text-gray-700 dark:text-gray-300">Número (Opcional)</label>
                  <input type="tel" id="auth-phone" name="phone" autocomplete="tel" inputmode="tel" maxlength="15" placeholder="(11) 99999-9999" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                </div>

                <div class="flex flex-col sm:flex-row gap-3 mb-4">
                  <div class="flex flex-col gap-1.5 flex-1">
                    <label for="auth-street" class="text-sm font-medium text-gray-700 dark:text-gray-300">Rua (Opcional)</label>
                    <input type="text" id="auth-street" name="street" autocomplete="address-line1" maxlength="150" placeholder="Rua Exemplo" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                  </div>
                  <div class="flex flex-col gap-1.5 sm:w-28">
                    <label for="auth-address-number" class="text-sm font-medium text-gray-700 dark:text-gray-300">Nº</label>
                    <input type="text" id="auth-address-number" name="address-number" autocomplete="address-line2" maxlength="20" placeholder="123" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label for="auth-neighborhood" class="text-sm font-medium text-gray-700 dark:text-gray-300">Bairro (Opcional)</label>
                  <input type="text" id="auth-neighborhood" name="neighborhood" autocomplete="address-level3" maxlength="80" placeholder="Centro" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                </div>

              </div>
            </div>

            <!-- Email (animated via grid-rows) -->
            <div
              id="email-wrapper"
              class="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div id="email-inner" class="overflow-hidden flex flex-col pointer-events-auto">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label for="auth-email" class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                  <input type="email" id="auth-email" name="email" autocomplete="email" inputmode="email" autocapitalize="none" spellcheck="false" maxlength="254" required placeholder="seu@email.com" aria-describedby="auth-feedback" class="${INPUT_CLASS}" />
                </div>
              </div>
            </div>

            <!-- Password (animated via grid-rows) -->
            <div
              id="password-wrapper"
              class="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div id="password-inner" class="overflow-hidden flex flex-col pointer-events-auto">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label for="auth-password" class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <div class="relative flex items-center">
                    <input type="password" id="auth-password" name="password" autocomplete="current-password" maxlength="128" required placeholder="••••••••" aria-describedby="auth-feedback" class="${INPUT_CLASS} pr-12 w-full" />
                    <button
                      type="button"
                      id="toggle-password-visibility-btn"
                      class="absolute right-1 w-11 h-11 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg flex items-center justify-center"
                      aria-label="Mostrar senha"
                    >
                      <i id="icon-eye-show" data-lucide="eye" aria-hidden="true" class="w-5 h-5"></i>
                      <i id="icon-eye-hide" data-lucide="eye-off" aria-hidden="true" class="w-5 h-5 hidden text-blue-600 dark:text-blue-400"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error/Success feedback -->
            <p id="auth-feedback" role="alert" aria-live="polite" class="text-red-600 dark:text-red-400 text-sm hidden font-medium text-center mb-4"></p>

            <!-- Primary action button -->
            <button
              type="submit"
              id="auth-submit-btn"
              class="
                relative flex items-center justify-center p-0 h-12 mt-2
                bg-blue-600 text-white font-semibold rounded-xl
                active:scale-95 hover:opacity-90 transition-opacity
                w-full disabled:opacity-70
                shadow-[0_8px_20px_rgb(37,99,235,0.2)]
              "
            >
              <span id="auth-submit-text">Entrar no Painel</span>
              <span
                id="auth-loading"
                class="hidden w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin absolute"
              ></span>
            </button>

          </form>

          <!-- Footer: toggle mode + forgot password -->
          <div
            id="auth-footer-actions"
            class="mt-6 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 gap-2 transition-opacity duration-500"
          >
            <div class="flex flex-row items-center justify-center gap-1">
              <span id="auth-mode-text">Ainda não tem conta?</span>
              <button
                id="toggle-auth-mode-btn"
                type="button"
                class="text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-opacity cursor-pointer px-2 py-2 -mx-2 rounded-lg active:bg-blue-50 dark:active:bg-blue-900/20"
              >Criar agora</button>
            </div>

            <button
              id="forgot-password-btn"
              type="button"
              class="text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-opacity cursor-pointer px-3 py-2 -mt-1 rounded-lg active:bg-gray-100 dark:active:bg-gray-800"
            >Esqueceu sua senha?</button>
          </div>

        </div>
      </div>
    </div>
  `
}
