// ============================================================
//  PodoSys — Auth Drawer Template
//  Markup HTML do modal/drawer de autenticação.
// ============================================================

export function renderAuthDrawer() {
  return `
    <div id="auth-backdrop" class="fixed inset-0 z-40 hidden bg-black/40 dark:bg-black/60 backdrop-blur-md opacity-0 transition-opacity duration-500"></div>

    <div id="auth-wrapper" class="fixed inset-0 z-50 hidden items-end sm:items-center justify-center pointer-events-none sm:p-6">

      <div id="auth-dialog" class="w-full sm:max-w-[420px] apple-glass sm:rounded-[32px] rounded-t-[32px] shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)] pointer-events-auto transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full sm:translate-y-8 sm:scale-95 sm:opacity-0 flex flex-col max-h-[90vh]">

        <div class="px-6 pb-8 sm:pt-8 pt-2 overflow-y-auto scrollbar-hide">

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h2 id="auth-title" class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bem-vindo</h2>
            <button id="close-auth-btn" class="p-2 active:scale-90 transition-transform" aria-label="Fechar">
              <i data-lucide="x" class="w-7 h-7 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-colors"></i>
            </button>
          </div>

          <!-- Formulário -->
          <form id="auth-form" class="flex flex-col">

            <!-- Campos de Cadastro (animados via grid-rows) -->
            <div id="register-fields" class="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div id="register-inner" class="overflow-hidden flex flex-col pointer-events-none">
                <div class="flex flex-col gap-1.5 mb-4 mt-1">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                  <input type="text" id="auth-name" placeholder="Ex: Maria Silva" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Número</label>
                  <input type="tel" id="auth-phone" placeholder="(11) 99999-9999" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>

                <div class="flex flex-col sm:flex-row gap-3 mb-4">
                  <div class="flex flex-col gap-1.5 flex-1">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Rua</label>
                    <input type="text" id="auth-street" placeholder="Rua Exemplo" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                  </div>
                  <div class="flex flex-col gap-1.5 sm:w-24">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nº</label>
                    <input type="text" id="auth-address-number" placeholder="123" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Bairro</label>
                  <input type="text" id="auth-neighborhood" placeholder="Centro" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <!-- E-mail (animado via grid-rows) -->
            <div id="email-wrapper" class="grid grid-rows-[1fr] opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div id="email-inner" class="overflow-hidden flex flex-col pointer-events-auto">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                  <input type="email" id="auth-email" required placeholder="seu@email.com" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <!-- Senha (animado via grid-rows) -->
            <div id="password-wrapper" class="grid grid-rows-[1fr] opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div id="password-inner" class="overflow-hidden flex flex-col pointer-events-auto">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <input type="password" id="auth-password" required placeholder="••••••••" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border-2 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <!-- Feedback de erro/sucesso -->
            <p id="auth-error" class="text-red-500 text-sm hidden font-medium text-center mb-4"></p>

            <!-- Botão de ação principal -->
            <button type="submit" id="auth-submit-btn" class="relative flex items-center justify-center p-0 h-12 mt-2 bg-blue-600 text-white font-semibold rounded-xl active:scale-95 hover:opacity-90 transition-opacity w-full disabled:opacity-70 shadow-[0_8px_20px_rgb(37,99,235,0.2)]">
              <span id="auth-submit-text">Entrar no Painel</span>
              <span id="auth-loading" class="hidden w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin absolute"></span>
            </button>
          </form>

          <!-- Rodapé: alternar modo + esqueceu senha -->
          <div id="auth-footer-actions" class="mt-6 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 gap-2 transition-opacity duration-500">
            <div class="flex flex-row items-center justify-center gap-1">
              <span id="auth-mode-text">Ainda não tem conta?</span>
              <button id="toggle-auth-mode-btn" type="button" class="text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-opacity cursor-pointer px-2 py-2 -mx-2 rounded-lg active:bg-blue-50 dark:active:bg-blue-900/20">Criar agora</button>
            </div>
            <button id="forgot-password-btn" type="button" class="text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-opacity cursor-pointer px-3 py-2 -mt-1 rounded-lg active:bg-gray-100 dark:active:bg-gray-800">Esqueceu sua senha?</button>
          </div>
        </div>
      </div>
    </div>
  `
}
