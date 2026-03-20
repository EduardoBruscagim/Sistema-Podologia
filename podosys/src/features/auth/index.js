// ============================================================
//  PodoSys — Auth Feature
//  Mobile: Bottom Drawer. Desktop: Glass Modal.
// ============================================================

import { AuthManager } from '../../state/auth.js'

export { renderAuthDrawer } from './template.js'

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
  const emailWrapper = document.getElementById('email-wrapper')
  const emailInner = document.getElementById('email-inner')
  const emailInput = document.getElementById('auth-email')
  const passwordWrapper = document.getElementById('password-wrapper')
  const passwordInner = document.getElementById('password-inner')
  const forgotPasswordBtn = document.getElementById('forgot-password-btn')
  const passwordInput = document.getElementById('auth-password')
  const authFooterActions = document.getElementById('auth-footer-actions')

  let authMode = 'login' // 'login' | 'register' | 'forgot' | 'update_password'

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

      emailWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      emailWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      emailInner.classList.remove('pointer-events-none')

      passwordWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.remove('pointer-events-none')

      nameInput.required = true
      phoneInput.required = true
      addressInput.required = true
      emailInput.required = true
      passwordInput.required = true

      title.textContent = 'Cadastro'
      submitText.textContent = 'Criar Conta'
      authFooterActions.classList.remove('hidden', 'opacity-0')
      authModeText.textContent = 'Já possui conta?'
      toggleModeBtn.textContent = 'Entrar'

      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    } else if (authMode === 'forgot') {
      registerFields.classList.add('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.remove('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.add('pointer-events-none')

      emailWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      emailWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      emailInner.classList.remove('pointer-events-none')

      passwordWrapper.classList.add('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.remove('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.add('pointer-events-none')

      nameInput.required = false
      phoneInput.required = false
      addressInput.required = false
      emailInput.required = true
      passwordInput.required = false

      title.textContent = 'Recuperar Senha'
      submitText.textContent = 'Enviar Instruções'
      authFooterActions.classList.remove('hidden', 'opacity-0')
      authModeText.textContent = 'Lembrou sua senha?'
      toggleModeBtn.textContent = 'Entrar'

      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    } else if (authMode === 'update_password') {
      registerFields.classList.add('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.remove('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.add('pointer-events-none')

      emailWrapper.classList.add('grid-rows-[0fr]', 'opacity-0')
      emailWrapper.classList.remove('grid-rows-[1fr]', 'opacity-100')
      emailInner.classList.add('pointer-events-none')

      passwordWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.remove('pointer-events-none')

      nameInput.required = false
      phoneInput.required = false
      addressInput.required = false
      emailInput.required = false
      passwordInput.required = true

      title.textContent = 'Redefinir Senha'
      submitText.textContent = 'Atualizar Senha'
      // Oculta completamente o rodapé para focar apenas na redefinição
      authFooterActions.classList.add('hidden', 'opacity-0')
    } else {
      // login
      registerFields.classList.add('grid-rows-[0fr]', 'opacity-0')
      registerFields.classList.remove('grid-rows-[1fr]', 'opacity-100')
      registerInner.classList.add('pointer-events-none')

      emailWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      emailWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      emailInner.classList.remove('pointer-events-none')

      passwordWrapper.classList.remove('grid-rows-[0fr]', 'opacity-0')
      passwordWrapper.classList.add('grid-rows-[1fr]', 'opacity-100')
      passwordInner.classList.remove('pointer-events-none')

      nameInput.required = false
      phoneInput.required = false
      addressInput.required = false
      emailInput.required = true
      passwordInput.required = true

      title.textContent = 'Bem-vindo'
      submitText.textContent = 'Entrar no Painel'
      authFooterActions.classList.remove('hidden', 'opacity-0')
      authModeText.textContent = 'Ainda não tem conta?'
      toggleModeBtn.textContent = 'Criar agora'

      forgotPasswordBtn.classList.remove('hidden')
      forgotPasswordBtn.classList.add('block')
    }
  }

  // ── Controle de Abertura/Fechamento Responsivo
  window.openAuthDrawer = (mode = 'login') => {
    setAuthMode(mode) // Reseta para a aba passada, default 'login'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    backdrop.classList.remove('hidden')
    wrapper.classList.remove('hidden')
    wrapper.classList.add('flex')

    // Força o DOM a computar o display:flex antes de engatilhar a transição
    // Isso evita o efeito de "teleporte" e estabiliza os quadros (60fps) no mobile.
    void wrapper.offsetWidth

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
      } else if (authMode === 'update_password') {
        await AuthManager.updatePassword(password)
        errorText.classList.remove('text-red-500')
        errorText.classList.add('text-green-500')
        errorText.textContent = 'Senha atualizada com sucesso!'
        errorText.classList.remove('hidden')

        setTimeout(() => {
          setAuthMode('login')
          closeDrawer()
        }, 2000)
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
