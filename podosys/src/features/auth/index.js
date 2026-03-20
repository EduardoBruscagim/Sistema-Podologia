// ============================================================
//  PodoSys — Auth Feature (Lógica)
//  Mobile: Bottom Drawer. Desktop: Glass Modal.
//  Modos: login | register | forgot | update_password
// ============================================================

import { AuthManager } from '../../state/auth.js'

export { renderAuthDrawer } from './template.js'

// ── Helpers de Estado Visual ────────────────────────────────

const GRID_OPEN = ['grid-rows-[1fr]', 'opacity-100']
const GRID_CLOSED = ['grid-rows-[0fr]', 'opacity-0']

/** Expande uma seção animada via grid-rows. */
function expandSection(wrapper, inner) {
  wrapper.classList.remove(...GRID_CLOSED)
  wrapper.classList.add(...GRID_OPEN)
  inner.classList.remove('pointer-events-none')
}

/** Recolhe uma seção animada via grid-rows. */
function collapseSection(wrapper, inner) {
  wrapper.classList.add(...GRID_CLOSED)
  wrapper.classList.remove(...GRID_OPEN)
  inner.classList.add('pointer-events-none')
}

// ── Inicialização ───────────────────────────────────────────

export function initAuthEvents() {

  // ── Referências DOM ─────────────────────────────────────────

  const backdrop = document.getElementById('auth-backdrop')
  const wrapper = document.getElementById('auth-wrapper')
  const dialog = document.getElementById('auth-dialog')
  const closeBtn = document.getElementById('close-auth-btn')
  const toggleModeBtn = document.getElementById('toggle-auth-mode-btn')
  const form = document.getElementById('auth-form')
  const registerFields = document.getElementById('register-fields')
  const registerInner = document.getElementById('register-inner')
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
  const footerActions = document.getElementById('auth-footer-actions')

  // ── Estado Interno ──────────────────────────────────────────

  let authMode = 'login'
  let closeTimeout = null

  // ── Configuração de Modos ─────────────────────────────────

  const MODE_CONFIG = {
    login: {
      title: 'Bem-vindo',
      submit: 'Entrar no Painel',
      modeText: 'Ainda não tem conta?',
      toggleText: 'Criar agora',
      register: false,
      email: true,
      password: true,
      showForgot: true,
      required: { name: false, phone: false, address: false, email: true, password: true },
    },
    register: {
      title: 'Cadastro',
      submit: 'Criar Conta',
      modeText: 'Já possui conta?',
      toggleText: 'Entrar',
      register: true,
      email: true,
      password: true,
      showForgot: false,
      required: { name: true, phone: true, address: true, email: true, password: true },
    },
    forgot: {
      title: 'Recuperar Senha',
      submit: 'Enviar Instruções',
      modeText: 'Lembrou sua senha?',
      toggleText: 'Entrar',
      register: false,
      email: true,
      password: false,
      showForgot: false,
      required: { name: false, phone: false, address: false, email: true, password: false },
    },
    update_password: {
      title: 'Redefinir Senha',
      submit: 'Atualizar Senha',
      register: false,
      email: false,
      password: true,
      showForgot: false,
      hideFooter: true,
      required: { name: false, phone: false, address: false, email: false, password: true },
    },
  }

  function setAuthMode(mode) {
    authMode = mode

    errorText.classList.remove('text-green-500')
    errorText.classList.add('text-red-500', 'hidden')

    const config = MODE_CONFIG[mode]

    // Seções animadas
    config.register ? expandSection(registerFields, registerInner) : collapseSection(registerFields, registerInner)
    config.email ? expandSection(emailWrapper, emailInner) : collapseSection(emailWrapper, emailInner)
    config.password ? expandSection(passwordWrapper, passwordInner) : collapseSection(passwordWrapper, passwordInner)

    // Campos obrigatórios
    nameInput.required = config.required.name
    phoneInput.required = config.required.phone
    addressInput.required = config.required.address
    emailInput.required = config.required.email
    passwordInput.required = config.required.password

    // Textos
    title.textContent = config.title
    submitText.textContent = config.submit

    // Rodapé
    if (config.hideFooter) {
      footerActions.classList.add('hidden', 'opacity-0')
    } else {
      footerActions.classList.remove('hidden', 'opacity-0')
      authModeText.textContent = config.modeText
      toggleModeBtn.textContent = config.toggleText
    }

    // Link "Esqueceu sua senha?"
    if (config.showForgot) {
      forgotPasswordBtn.classList.remove('hidden')
      forgotPasswordBtn.classList.add('block')
    } else {
      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    }
  }

  // ── Abertura / Fechamento ─────────────────────────────────

  window.openAuthDrawer = (mode = 'login') => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }

    setAuthMode(mode)

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    backdrop.classList.remove('hidden')
    wrapper.classList.remove('hidden')
    wrapper.classList.add('flex')

    void wrapper.offsetWidth

    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0')
      dialog.classList.remove('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')
      dialog.classList.add('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    })
  }

  const closeDrawer = () => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''

    backdrop.classList.add('opacity-0')
    dialog.classList.remove('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    dialog.classList.add('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')

    if (closeTimeout) clearTimeout(closeTimeout)

    closeTimeout = setTimeout(() => {
      backdrop.classList.add('hidden')
      wrapper.classList.add('hidden')
      wrapper.classList.remove('flex')
      form.reset()
      errorText.classList.add('hidden')
      closeTimeout = null
    }, 500)
  }

  // ── Eventos de Fechamento ─────────────────────────────────

  closeBtn.addEventListener('click', closeDrawer)

  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) closeDrawer()
  })

  backdrop.addEventListener('click', closeDrawer)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !wrapper.classList.contains('hidden')) {
      closeDrawer()
    }
  })

  // ── Alternância de Modo ───────────────────────────────────

  toggleModeBtn.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
  })

  forgotPasswordBtn.addEventListener('click', () => {
    setAuthMode('forgot')
  })

  // ── Submissão ─────────────────────────────────────────────

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    errorText.classList.add('hidden')
    errorText.classList.remove('text-green-500')
    errorText.classList.add('text-red-500')

    const email = emailInput.value
    const password = passwordInput.value
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
        showSuccess('Instruções enviadas para seu e-mail!')
        setTimeout(() => setAuthMode('login'), 3000)
      } else if (authMode === 'update_password') {
        await AuthManager.updatePassword(password)
        showSuccess('Senha atualizada com sucesso!')
        setTimeout(() => { setAuthMode('login'); closeDrawer() }, 2000)
      } else {
        await AuthManager.signIn(email, password)
        closeDrawer()
      }
    } catch (error) {
      errorText.textContent = error.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos.'
        : 'Ocorreu um erro. Verifique seus dados e tente novamente.'
      errorText.classList.remove('hidden')
    } finally {
      submitText.classList.remove('opacity-0')
      loadingSpinner.classList.add('hidden')
      submitBtn.disabled = false
    }
  })

  // ── Feedback Visual ───────────────────────────────────────

  function showSuccess(message) {
    errorText.classList.remove('text-red-500')
    errorText.classList.add('text-green-500')
    errorText.textContent = message
    errorText.classList.remove('hidden')
  }
}
