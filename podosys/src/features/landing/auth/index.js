// ============================================================
//  PodoSys — Auth Feature
//  Drawer Apple-like para Login e Cadastro.
// ============================================================

import { AuthManager } from '../../state/auth.js'

export function renderAuthDrawer() {
  return `
    <div id="auth-backdrop" class="fixed inset-0 z-40 hidden bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
    
    <div id="auth-drawer" class="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-white dark:bg-[#1c1c1e] rounded-t-3xl transform translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl">
      
      <div class="w-full flex justify-center pt-3 pb-2">
        <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      <div class="px-6 pb-8 pt-2 overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 id="auth-title" class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bem-vindo</h2>
          <button id="close-auth-btn" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 active:scale-95 transition-transform" aria-label="Fechar">
            <i data-lucide="x" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>

        <form id="auth-form" class="flex flex-col gap-4">
          <div id="name-field" class="hidden flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
            <input type="text" id="auth-name" placeholder="Ex: Maria Silva" class="h-12 px-4 rounded-xl bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <input type="email" id="auth-email" required placeholder="seu@email.com" class="h-12 px-4 rounded-xl bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <input type="password" id="auth-password" required placeholder="••••••••" class="h-12 px-4 rounded-xl bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" />
          </div>

          <p id="auth-error" class="text-red-500 text-sm hidden font-medium text-center"></p>

          <button type="submit" id="auth-submit-btn" class="relative flex items-center justify-center h-12 mt-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl active:scale-95 transition-all w-full disabled:opacity-70">
            <span id="auth-submit-text">Entrar</span>
            <span id="auth-loading" class="hidden w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin absolute"></span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <button id="toggle-auth-mode-btn" type="button" class="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Ainda não tem conta? <span class="text-blue-600 dark:text-blue-400">Criar agora</span>
          </button>
        </div>
      </div>
    </div>
  `
}

export function initAuthEvents() {
  const backdrop = document.getElementById('auth-backdrop')
  const drawer = document.getElementById('auth-drawer')
  const closeBtn = document.getElementById('close-auth-btn')
  const toggleModeBtn = document.getElementById('toggle-auth-mode-btn')
  const form = document.getElementById('auth-form')
  const nameField = document.getElementById('name-field')
  const nameInput = document.getElementById('auth-name')
  const title = document.getElementById('auth-title')
  const submitText = document.getElementById('auth-submit-text')
  const errorText = document.getElementById('auth-error')
  const loadingSpinner = document.getElementById('auth-loading')
  const submitBtn = document.getElementById('auth-submit-btn')

  let isSignUp = false

  // ── Controle de Abertura/Fechamento
  window.openAuthDrawer = () => {
    backdrop.classList.remove('hidden')
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0')
      drawer.classList.remove('translate-y-full')
    })
  }

  const closeDrawer = () => {
    backdrop.classList.add('opacity-0')
    drawer.classList.add('translate-y-full')
    setTimeout(() => {
      backdrop.classList.add('hidden')
      form.reset()
      errorText.classList.add('hidden')
    }, 400)
  }

  closeBtn.addEventListener('click', closeDrawer)
  backdrop.addEventListener('click', closeDrawer)

  // ── Alternar Login / Cadastro
  toggleModeBtn.addEventListener('click', () => {
    isSignUp = !isSignUp
    errorText.classList.add('hidden')

    if (isSignUp) {
      nameField.classList.remove('hidden')
      nameInput.required = true
      title.textContent = 'Criar Conta'
      submitText.textContent = 'Cadastrar'
      toggleModeBtn.innerHTML =
        'Já possui conta? <span class="text-blue-600 dark:text-blue-400">Entrar</span>'
    } else {
      nameField.classList.add('hidden')
      nameInput.required = false
      title.textContent = 'Bem-vindo'
      submitText.textContent = 'Entrar'
      toggleModeBtn.innerHTML =
        'Ainda não tem conta? <span class="text-blue-600 dark:text-blue-400">Criar agora</span>'
    }
  })

  // ── Submissão do Formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorText.classList.add('hidden')

    const email = document.getElementById('auth-email').value
    const password = document.getElementById('auth-password').value
    const name = nameInput.value

    submitText.classList.add('opacity-0')
    loadingSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      if (isSignUp) {
        await AuthManager.signUp(email, password, name)
      } else {
        await AuthManager.signIn(email, password)
      }
      closeDrawer()
    } catch (error) {
      errorText.textContent =
        error.message === 'Invalid login credentials'
          ? 'E-mail ou senha incorretos.'
          : 'Ocorreu um erro. Verifique seus dados.'
      errorText.classList.remove('hidden')
    } finally {
      submitText.classList.remove('opacity-0')
      loadingSpinner.classList.add('hidden')
      submitBtn.disabled = false
    }
  })
}
