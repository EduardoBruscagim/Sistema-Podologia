// ============================================================
//  PodoSys — Auth Feature (Lógica)
//  Mobile: Bottom Drawer. Desktop: Glass Modal.
//  Modos: login | register | forgot | update_password
// ============================================================

import { AuthManager } from '../../state/auth.js'
import { applyPhoneMask, stripPhoneMask } from '../../utils/phoneMask.js'
import { translateError } from '../../utils/errorTranslation.js'
import { validateForm } from '../../utils/formValidation.js'
import { lockScroll, unlockScroll } from '../../utils/scrollLock.js'
import { eventBus } from '../../utils/eventBus.js'
import { registerEscapeHandler } from '../../utils/escapeStack.js'

export { renderAuthDrawer } from './template.js'

// ── Helpers de Estado Visual ────────────────────────────────

const GRID_OPEN = ['grid-rows-[1fr]', 'opacity-100']
const GRID_CLOSED = ['grid-rows-[0fr]', 'opacity-0']

function expandSection(wrapper, inner) {
  wrapper.classList.remove(...GRID_CLOSED)
  wrapper.classList.add(...GRID_OPEN)
  inner.classList.remove('pointer-events-none')
}

function collapseSection(wrapper, inner) {
  wrapper.classList.add(...GRID_CLOSED)
  wrapper.classList.remove(...GRID_OPEN)
  inner.classList.add('pointer-events-none')
}

// ── Configuração de Modos ───────────────────────────────────

const MODE_CONFIG = {
  login: {
    title: 'Bem-vindo',
    submit: 'Entrar no Painel',
    modeText: 'Ainda não tem conta?',
    toggleText: 'Criar agora',
    showRegister: false,
    showEmail: true,
    showPassword: true,
    showForgot: true,
    required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: true, password: true },
  },
  register: {
    title: 'Cadastro',
    submit: 'Criar Conta',
    modeText: 'Já possui conta?',
    toggleText: 'Entrar',
    showRegister: true,
    showEmail: true,
    showPassword: true,
    showForgot: false,
    required: { name: true, phone: true, street: true, neighborhood: true, addressNumber: true, email: true, password: true },
  },
  forgot: {
    title: 'Recuperar Senha',
    submit: 'Enviar Instruções',
    modeText: 'Lembrou sua senha?',
    toggleText: 'Entrar',
    showRegister: false,
    showEmail: true,
    showPassword: false,
    showForgot: false,
    required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: true, password: false },
  },
  update_password: {
    title: 'Redefinir Senha',
    submit: 'Atualizar Senha',
    showRegister: false,
    showEmail: false,
    showPassword: true,
    showForgot: false,
    hideFooter: true,
    required: { name: false, phone: false, street: false, neighborhood: false, addressNumber: false, email: false, password: true },
  },
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
  const feedbackText = document.getElementById('auth-feedback')
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
  let pendingTimeouts = []

  function clearPendingTimeouts() {
    pendingTimeouts.forEach(clearTimeout)
    pendingTimeouts = []
  }

  // ── Feedback Visual ───────────────────────────────────────

  function showFeedback(message, isSuccess = false) {
    feedbackText.classList.remove('text-red-500', 'text-green-500', 'hidden')
    feedbackText.classList.add(isSuccess ? 'text-green-500' : 'text-red-500')
    feedbackText.textContent = message
  }

  function hideFeedback() {
    feedbackText.classList.add('hidden')
    feedbackText.classList.remove('text-green-500')
    feedbackText.classList.add('text-red-500')
  }

  /** Mostra sucesso e redireciona para login após delay cancelável. */
  function showSuccessSequence(message, finalAction) {
    clearPendingTimeouts()
    showFeedback(message, true)

    const t1 = setTimeout(() => showFeedback('Redirecionando para o login...', true), 1500)
    const t2 = setTimeout(() => {
      finalAction()
      clearPendingTimeouts()
    }, 3000)

    pendingTimeouts.push(t1, t2)
  }

  // ── Gestão de Modos ───────────────────────────────────────

  function resetRegisterFields() {
    nameInput.value = ''
    phoneInput.value = ''
    streetInput.value = ''
    neighborhoodInput.value = ''
    addressNumberInput.value = ''
  }

  function setAuthMode(mode) {
    const previousMode = authMode
    authMode = mode

    hideFeedback()

    const config = MODE_CONFIG[mode]

    // Seções animadas
    config.showRegister ? expandSection(registerFields, registerInner) : collapseSection(registerFields, registerInner)
    config.showEmail ? expandSection(emailWrapper, emailInner) : collapseSection(emailWrapper, emailInner)
    config.showPassword ? expandSection(passwordWrapper, passwordInner) : collapseSection(passwordWrapper, passwordInner)

    // Reset campos de cadastro ao sair do modo register
    if (previousMode === 'register' && mode !== 'register') {
      resetRegisterFields()
    }

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

  function openDrawer(mode = 'login') {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }

    setAuthMode(mode)
    lockScroll()

    backdrop.classList.remove('hidden')
    wrapper.classList.remove('hidden')
    wrapper.classList.add('flex')

    // Force reflow — garante que o browser processe a mudança de display
    // antes de aplicar as classes de transição CSS
    void wrapper.offsetWidth

    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0')
      dialog.classList.remove('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')
      dialog.classList.add('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    })
  }

  function closeDrawer() {
    unlockScroll()
    clearPendingTimeouts()

    backdrop.classList.add('opacity-0')
    dialog.classList.remove('translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100')
    dialog.classList.add('translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0')

    if (closeTimeout) clearTimeout(closeTimeout)

    closeTimeout = setTimeout(() => {
      backdrop.classList.add('hidden')
      wrapper.classList.add('hidden')
      wrapper.classList.remove('flex')
      form.reset()
      hideFeedback()
      closeTimeout = null
    }, 500)
  }

  // ── Event Bus — API pública de abertura ───────────────────

  eventBus.on('auth:open', openDrawer)

  // ── Escape Handler (stack global, sem duplicação) ─────────

  registerEscapeHandler(
    () => !wrapper.classList.contains('hidden'),
    closeDrawer,
  )

  // ── Eventos de Fechamento ─────────────────────────────────

  closeBtn.addEventListener('click', closeDrawer)

  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) closeDrawer()
  })

  backdrop.addEventListener('click', closeDrawer)

  // ── Alternância de Modo ───────────────────────────────────

  toggleModeBtn.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
  })

  forgotPasswordBtn.addEventListener('click', () => {
    setAuthMode('forgot')
  })

  // ── Submissão do Formulário ──────────────────────────────

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    hideFeedback()

    const email = emailInput.value.trim()
    const password = passwordInput.value
    const name = nameInput.value.trim()
    const phone = stripPhoneMask(phoneInput.value)
    const street = streetInput.value.trim()
    const neighborhood = neighborhoodInput.value.trim()
    const addressNumber = addressNumberInput.value.trim()

    // Validação frontend — feedback instantâneo sem bater no servidor
    const validationError = validateForm(authMode, { email, password, name, phone, street, neighborhood, addressNumber })
    if (validationError) {
      showFeedback(validationError)
      return
    }

    submitText.classList.add('opacity-0')
    loadingSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      if (authMode === 'register') {
        await AuthManager.signUp({ email, password, fullName: name, phone, street, neighborhood, addressNumber })
        showSuccessSequence('Conta criada com sucesso!', () => setAuthMode('login'))
      } else if (authMode === 'forgot') {
        await AuthManager.resetPasswordForEmail(email)
        showSuccessSequence('Instruções enviadas para seu e-mail!', () => setAuthMode('login'))
      } else if (authMode === 'update_password') {
        await AuthManager.updatePassword(password)
        showSuccessSequence('Senha atualizada com sucesso!', () => setAuthMode('login'))
      } else {
        await AuthManager.signIn(email, password)
        closeDrawer()
      }
    } catch (error) {
      console.error('[PodoSys] Auth error:', { message: error.message, error })
      showFeedback(translateError(error.message))
    } finally {
      submitText.classList.remove('opacity-0')
      loadingSpinner.classList.add('hidden')
      submitBtn.disabled = false
    }
  })
}
