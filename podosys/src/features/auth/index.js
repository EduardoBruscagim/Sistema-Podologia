// ============================================================
//  PodoSys — Auth Feature
//  Mobile: Bottom Drawer. Desktop: Glass Modal.
// ============================================================

import { AuthManager } from '../../state/auth.js'

export function renderAuthDrawer() {
  return `
    <div id="auth-backdrop" class="fixed inset-0 z-40 hidden bg-black/40 dark:bg-black/60 backdrop-blur-md opacity-0 transition-opacity duration-300"></div>
    
    <div id="auth-wrapper" class="fixed inset-0 z-50 hidden items-end sm:items-center justify-center pointer-events-none sm:p-6">
      
      <div id="auth-dialog" class="w-full sm:max-w-[420px] apple-glass sm:rounded-[32px] rounded-t-[32px] shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)] pointer-events-auto transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-full sm:translate-y-8 sm:scale-95 sm:opacity-0 flex flex-col max-h-[90vh]">
        

        <div class="px-6 pb-8 sm:pt-8 pt-2 overflow-y-auto scrollbar-hide">
          <div class="flex items-center justify-between mb-6">
            <h2 id="auth-title" class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bem-vindo</h2>
            <button id="close-auth-btn" class="p-2 active:scale-90 transition-transform" aria-label="Fechar">
              <i data-lucide="x" class="w-7 h-7 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white transition-colors"></i>
            </button>
          </div>

          <form id="auth-form" class="flex flex-col">
            <div id="register-fields" class="grid grid-rows-[0fr] opacity-0 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div id="register-inner" class="overflow-hidden flex flex-col pointer-events-none">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                  <input type="text" id="auth-name" placeholder="Ex: Maria Silva" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Número</label>
                  <input type="tel" id="auth-phone" placeholder="(11) 99999-9999" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                </div>

                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                  <input type="text" id="auth-address" placeholder="Rua Exemplo, 123" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 mb-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
              <input type="email" id="auth-email" required placeholder="seu@email.com" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
            </div>

            <div id="password-wrapper" class="grid grid-rows-[1fr] opacity-100 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <div id="password-inner" class="overflow-hidden flex flex-col pointer-events-auto">
                <div class="flex flex-col gap-1.5 mb-4">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <input type="password" id="auth-password" required placeholder="••••••••" class="appearance-none h-12 px-4 rounded-xl bg-gray-50/50 dark:bg-[#2c2c2e]/50 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-[#2c2c2e] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <p id="auth-error" class="text-red-500 text-sm hidden font-medium text-center mb-4"></p>

            <button type="submit" id="auth-submit-btn" class="relative flex items-center justify-center h-12 mt-2 bg-blue-600 text-white font-semibold rounded-xl active:scale-95 hover:bg-blue-700 transition-all w-full disabled:opacity-70 shadow-[0_8px_20px_rgb(37,99,235,0.2)]">
              <span id="auth-submit-text">Entrar no Painel</span>
              <span id="auth-loading" class="hidden w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin absolute"></span>
            </button>
          </form>

          <div class="mt-6 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 gap-2">
            <div class="flex flex-row items-center justify-center gap-1">
              <span id="auth-mode-text">Ainda não tem conta?</span> 
              <button id="toggle-auth-mode-btn" type="button" class="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer px-2 py-2 -mx-2 rounded-lg active:bg-blue-50 dark:active:bg-blue-900/20">Criar agora</button>
            </div>
            <button id="forgot-password-btn" type="button" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer px-3 py-2 -mt-1 rounded-lg active:bg-gray-100 dark:active:bg-gray-800">Esqueceu sua senha?</button>
          </div>
        </div>
      </div>
    </div>
  `
}

export function initAuthEvents() {
  const backdrop = document.getElementById('auth-backdrop')
  const wrapper = document.getElementById('auth-wrapper')
  const dialog = document.getElementById('auth-dialog')
  const closeBtn = document.getElementById('close-auth-btn')
  const toggleModeBtn = document.getElementById('toggle-auth-mode-btn')
  const form = document.getElementById('auth-form')
  const registerFields = document.getElementById('register-fields')
  const nameInput = document.getElementById('auth-name')
  const phoneInput = document.getElementById('auth-phone')
  const addressInput = document.getElementById('auth-address')
  const authModeText = document.getElementById('auth-mode-text')
  const title = document.getElementById('auth-title')
  const submitText = document.getElementById('auth-submit-text')
  const errorText = document.getElementById('auth-error')
  const loadingSpinner = document.getElementById('auth-loading')
  const submitBtn = document.getElementById('auth-submit-btn')
  const passwordWrapper = document.getElementById('password-wrapper')
  const passwordInner = document.getElementById('password-inner')
  const forgotPasswordBtn = document.getElementById('forgot-password-btn')
  const passwordInput = document.getElementById('auth-password')

  let authMode = 'login' // 'login' | 'register' | 'forgot'

  const setAuthMode = (mode) => {
    authMode = mode
    
    // Reseta cores de erro/sucesso sempre que mudar de aba
    errorText.classList.remove('text-green-500')
    errorText.classList.add('text-red-500')
    errorText.classList.add('hidden')
    
    const registerInner = document.getElementById('register-inner')

    if (authMode === 'register') {
      registerFields.classList.remove('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.add('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.remove('pointer-events-none')
      
      passwordWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.remove('pointer-events-none')
      
      nameInput.required = true
      phoneInput.required = true
      addressInput.required = true
      passwordInput.required = true
      
      title.textContent = 'Cadastro'
      submitText.textContent = 'Criar Conta'
      authModeText.textContent = 'Já possui conta?'
      toggleModeBtn.textContent = 'Entrar'
      
      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    } else if (authMode === 'forgot') {
      registerFields.classList.add('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.remove('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.add('pointer-events-none')
      
      passwordWrapper.classList.add('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.remove('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.add('pointer-events-none')
      
      nameInput.required = false
      phoneInput.required = false
      addressInput.required = false
      passwordInput.required = false
      
      title.textContent = 'Recuperar Senha'
      submitText.textContent = 'Enviar Instruções'
      authModeText.textContent = 'Lembrou sua senha?'
      toggleModeBtn.textContent = 'Entrar'
      
      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    } else {
      registerFields.classList.add('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.remove('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.add('pointer-events-none')
      
      passwordWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.remove('pointer-events-none')
      
      nameInput.required = false
      phoneInput.required = false
      addressInput.required = false
      passwordInput.required = true
      
      title.textContent = 'Bem-vindo'
      submitText.textContent = 'Entrar no Painel'
      authModeText.textContent = 'Ainda não tem conta?'
      toggleModeBtn.textContent = 'Criar agora'
      
      forgotPasswordBtn.classList.remove('hidden')
      forgotPasswordBtn.classList.add('block')
    }
  }

  // ── Controle de Abertura/Fechamento Responsivo
  window.openAuthDrawer = () => {
    setAuthMode('login') // Sempre resetar para a aba de Login
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    backdrop.classList.remove('hidden')
    wrapper.classList.remove('hidden')
    wrapper.classList.add('flex')

    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0')
      // Remove classes de estado fechado
      dialog.classList.remove('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')
      // Adiciona classes de estado aberto (Reseta translateY no mobile e scale no desktop)
      dialog.classList.add('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    })
  }

  const closeDrawer = () => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    backdrop.classList.add('opacity-0')
    // Remove estado aberto
    dialog.classList.remove('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    // Restaura estado fechado (Desce no mobile, encolhe no desktop)
    dialog.classList.add('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')

    setTimeout(() => {
      backdrop.classList.add('hidden')
      wrapper.classList.add('hidden')
      wrapper.classList.remove('flex')
      form.reset()
      errorText.classList.add('hidden')
    }, 400)
  }

  closeBtn.addEventListener('click', closeDrawer)

  // Fecha ao clicar fora do modal (no wrapper que cobre a tela)
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) closeDrawer()
  })

  // Fecha ao apertar a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !wrapper.classList.contains('hidden')) {
      closeDrawer()
    }
  })

  // ── Alternar Login / Cadastro / Forgot
  toggleModeBtn.addEventListener('click', () => {
    if (authMode === 'register' || authMode === 'forgot') {
      setAuthMode('login')
    } else {
      setAuthMode('register')
    }
  })

  forgotPasswordBtn.addEventListener('click', () => {
    setAuthMode('forgot')
  })

  // ── Submissão do Formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorText.classList.add('hidden')
    errorText.classList.remove('text-green-500')
    errorText.classList.add('text-red-500')

    const email = document.getElementById('auth-email').value
    const password = document.getElementById('auth-password').value
    const name = nameInput.value
    const phone = phoneInput.value
    const address = addressInput.value

    submitText.classList.add('opacity-0')
    loadingSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      if (authMode === 'register') {
        await AuthManager.signUp(email, password, name, phone, address)
        closeDrawer()
      } else if (authMode === 'forgot') {
        await AuthManager.resetPasswordForEmail(email)
        errorText.classList.remove('text-red-500')
        errorText.classList.add('text-green-500')
        errorText.textContent = 'Instruções enviadas para seu e-mail!'
        errorText.classList.remove('hidden')
        
        // Após 3 segundos reverte para login
        setTimeout(() => {
          setAuthMode('login')
        }, 3000)
      } else {
        await AuthManager.signIn(email, password)
        closeDrawer()
      }
    } catch (error) {
      errorText.textContent =
        error.message === 'Invalid login credentials'
          ? 'E-mail ou senha incorretos.'
          : 'Ocorreu um erro. Verifique seus dados e tente novamente.'
      errorText.classList.remove('hidden')
    } finally {
      submitText.classList.remove('opacity-0')
      loadingSpinner.classList.add('hidden')
      submitBtn.disabled = false
    }
  })
}
