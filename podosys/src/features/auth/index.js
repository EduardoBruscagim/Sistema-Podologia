// ============================================================
//  PodoSys — Auth Feature (Lógica)
//  Mobile: Bottom Drawer. Desktop: Glass Modal.
//  Modos: login | register | forgot | update_password
// ============================================================

import { AuthManager } from '../../state/auth.js'

export { renderAuthDrawer } from './template.js'

// ── Máscara de Telefone BR ──────────────────────────────────

/** Aplica máscara (DD) 9XXXX-XXXX a um valor numérico. */
function applyPhoneMask(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/** Remove a máscara e retorna apenas dígitos. */
function stripPhoneMask(value) {
  return value.replace(/\D/g, '')
}

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
  const streetInput = document.getElementById('auth-street')
  const neighborhoodInput = document.getElementById('auth-neighborhood')
  const addressNumberInput = document.getElementById('auth-address-number')
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

  // ── Máscara de Telefone ─────────────────────────────────────

  phoneInput.addEventListener('input', () => {
    const cursorPos = phoneInput.selectionStart
    const prevLen = phoneInput.value.length
    phoneInput.value = applyPhoneMask(phoneInput.value)
    const newLen = phoneInput.value.length
    const newPos = cursorPos + (newLen - prevLen)
    phoneInput.setSelectionRange(newPos, newPos)
  })

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
      required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: true, password: true },
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
      required: { name: true, phone: true, street: true, neighborhood: true, addressNumber: true, email: true, password: true },
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
      required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: true, password: false },
    },
    update_password: {
      title: 'Redefinir Senha',
      submit: 'Atualizar Senha',
      register: false,
      email: false,
      password: true,
      showForgot: false,
      hideFooter: true,
      required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: false, password: true },
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
    streetInput.required = config.required.street
    neighborhoodInput.required = config.required.neighborhood
    addressNumberInput.required = config.required.addressNumber
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

  // ── Tradução de erros do Supabase ──────────────────────────

  const ERROR_MAP = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'Email not confirmed': 'E-mail não confirmado. Verifique sua caixa de entrada.',
    'User already registered': 'Este e-mail já está cadastrado.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
    'Signup requires a valid password': 'Informe uma senha válida.',
    'Unable to validate email address: invalid format': 'Formato de e-mail inválido.',
    'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
    'For security purposes, you can only request this after 60 seconds.': 'Aguarde 60 segundos antes de tentar novamente.',
    'New password should be different from the old password.': 'A nova senha deve ser diferente da senha atual.',
    'A user with this email address has already been registered': 'Este e-mail já está cadastrado. Tente fazer login.',
  }

  /** Traduz erros do Supabase para PT-BR com fallback por busca parcial. */
  function translateError(message) {
    if (ERROR_MAP[message]) return ERROR_MAP[message]

    // Busca parcial — cobre variações de mensagens do Supabase
    const partialMatch = Object.keys(ERROR_MAP).find((key) => message?.includes(key))
    if (partialMatch) return ERROR_MAP[partialMatch]

    return 'Ocorreu um erro. Verifique seus dados e tente novamente.'
  }

  // ── Validação Frontend ────────────────────────────────────

  function showError(message) {
    errorText.classList.remove('text-green-500', 'hidden')
    errorText.classList.add('text-red-500')
    errorText.textContent = message
  }

  function validateForm(email, password, name, phone) {
    if (authMode === 'register') {
      if (!name?.trim()) return 'Informe seu nome completo.'
      if (!phone?.trim()) return 'Informe seu número de telefone.'
    }

    if ((authMode === 'login' || authMode === 'register' || authMode === 'forgot') && !email?.trim()) {
      return 'Informe seu e-mail.'
    }

    if ((authMode === 'login' || authMode === 'register' || authMode === 'update_password') && password) {
      if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
    }

    return null
  }

  // ── Submissão do Formulário ──────────────────────────────

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    errorText.classList.add('hidden')
    errorText.classList.remove('text-green-500')
    errorText.classList.add('text-red-500')

    const email = emailInput.value.trim()
    const password = passwordInput.value
    const name = nameInput.value.trim()
    const phone = stripPhoneMask(phoneInput.value)
    const street = streetInput.value.trim()
    const neighborhood = neighborhoodInput.value.trim()
    const addressNumber = addressNumberInput.value.trim()

    // Validação frontend — feedback instantâneo sem bater no servidor
    const validationError = validateForm(email, password, name, phone)
    if (validationError) {
      showError(validationError)
      return
    }

    submitText.classList.add('opacity-0')
    loadingSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      if (authMode === 'register') {
        await AuthManager.signUp(email, password, name, phone, street, neighborhood, addressNumber)
        showSuccess('Conta criada com sucesso!')
        setTimeout(() => showSuccess('Redirecionando para o login...'), 1500)
        setTimeout(() => setAuthMode('login'), 3000)
      } else if (authMode === 'forgot') {
        await AuthManager.resetPasswordForEmail(email)
        showSuccess('Instruções enviadas para seu e-mail!')
        setTimeout(() => showSuccess('Redirecionando para o login...'), 1500)
        setTimeout(() => setAuthMode('login'), 3000)
      } else if (authMode === 'update_password') {
        await AuthManager.updatePassword(password)
        showSuccess('Senha atualizada com sucesso!')
        setTimeout(() => showSuccess('Redirecionando para o login...'), 1500)
        setTimeout(() => setAuthMode('login'), 3000)
      } else {
        await AuthManager.signIn(email, password)
        closeDrawer()
      }
    } catch (error) {
      console.error('[PodoSys] Auth error:', error.message, error)
      errorText.textContent = translateError(error.message)
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
