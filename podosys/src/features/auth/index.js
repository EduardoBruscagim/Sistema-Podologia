// -----------------------------------------------------------------------------
// PodoSys — Auth Feature (Logic)
// Mobile: Bottom Drawer. Desktop: Glass Modal.
// Modos: login | register | forgot | update_password
// -----------------------------------------------------------------------------

import { AuthManager } from '../../state/auth.js'
import { applyPhoneMask, stripPhoneMask } from '../../utils/phoneMask.js'
import { translateError } from '../../utils/errorTranslation.js'
import { validateForm } from '../../utils/formValidation.js'
import { lockScroll, unlockScroll } from '../../utils/scrollLock.js'
import { eventBus } from '../../utils/eventBus.js'
import { registerEscapeHandler } from '../../utils/escapeStack.js'

export { renderAuthDrawer } from './template.js'

// -----------------------------------------------------------------------------
// Visual State Helpers
// -----------------------------------------------------------------------------

const GRID_OPEN = ['grid-rows-[1fr]', 'opacity-100']
const GRID_CLOSED = ['grid-rows-[0fr]', 'opacity-0']

function setInputsAccessibility(container, enabled) {
  if (!container) return
  const inputs = container.querySelectorAll('input, select, textarea, button')
  inputs.forEach((input) => {
    if (enabled) {
      input.removeAttribute('tabindex')
      input.removeAttribute('disabled')
      input.removeAttribute('aria-hidden')
    } else {
      input.setAttribute('tabindex', '-1')
      input.setAttribute('disabled', 'true')
      input.setAttribute('aria-hidden', 'true')
    }
  })
}

function expandSection(wrapper, inner) {
  wrapper.classList.remove(...GRID_CLOSED)
  wrapper.classList.add(...GRID_OPEN)
  inner.classList.remove('pointer-events-none')
  setInputsAccessibility(inner, true)
}

function collapseSection(wrapper, inner) {
  wrapper.classList.add(...GRID_CLOSED)
  wrapper.classList.remove(...GRID_OPEN)
  inner.classList.add('pointer-events-none')
  setInputsAccessibility(inner, false)
}

// -----------------------------------------------------------------------------
// Mode Configuration
// -----------------------------------------------------------------------------

const ALL_FIELDS_OPTIONAL = {
  name: false,
  phone: false,
  street: false,
  neighborhood: false,
  addressNumber: false,
  email: false,
  password: false,
}

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
    required: { ...ALL_FIELDS_OPTIONAL, email: true, password: true },
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
    required: {
      name: true,
      phone: false,
      street: false,
      neighborhood: false,
      addressNumber: false,
      email: true,
      password: true,
    },
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
    required: { ...ALL_FIELDS_OPTIONAL, email: true },
  },

  update_password: {
    title: 'Redefinir Senha',
    submit: 'Atualizar Senha',
    showRegister: false,
    showEmail: false,
    showPassword: true,
    showForgot: false,
    hideFooter: true,
    required: { ...ALL_FIELDS_OPTIONAL, password: true },
  },
}

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

export function initAuthEvents() {

  // ---------------------------------------------------------------------------
  // DOM References
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Phone Mask
  // ---------------------------------------------------------------------------

  phoneInput.addEventListener('input', () => {
    const cursorPos = phoneInput.selectionStart
    const prevLen = phoneInput.value.length
    phoneInput.value = applyPhoneMask(phoneInput.value)
    const newLen = phoneInput.value.length
    const newPos = cursorPos + (newLen - prevLen)
    phoneInput.setSelectionRange(newPos, newPos)
  })

  // ---------------------------------------------------------------------------
  // Internal State
  // ---------------------------------------------------------------------------

  let authMode = 'login'
  let closeTimeout = null
  let pendingTimeouts = []
  let lastAuthTrigger = null
  let isModalOpen = false
  let authRequestVersion = 0

  function clearPendingTimeouts() {
    pendingTimeouts.forEach(clearTimeout)
    pendingTimeouts = []
  }

  // ---------------------------------------------------------------------------
  // Visual Feedback & Error Field Identification (WCAG 2.2 — 3.3.1)
  // ---------------------------------------------------------------------------

  function getInputElementForError(validationError) {
    if (!validationError) return null
    const err = validationError.toLowerCase()
    if (err.includes('nome')) return nameInput
    if (err.includes('telefone')) return phoneInput
    if (err.includes('rua')) return streetInput
    if (err.includes('bairro')) return neighborhoodInput
    if (err.includes('número do endereço')) return addressNumberInput
    if (err.includes('e-mail')) return emailInput
    if (err.includes('senha')) return passwordInput
    return null
  }

  function clearInputErrors() {
    const allInputs = [nameInput, phoneInput, streetInput, neighborhoodInput, addressNumberInput, emailInput, passwordInput]
    allInputs.forEach((input) => {
      if (!input) return
      input.removeAttribute('aria-invalid')
      input.classList.remove('border-red-500', 'dark:border-red-500', 'ring-2', 'ring-red-500')
    })
  }

  function showFeedback(message, isSuccess = false) {
    clearInputErrors()
    feedbackText.classList.remove('text-red-600', 'dark:text-red-400', 'text-green-600', 'dark:text-green-400', 'hidden')
    feedbackText.classList.add(isSuccess ? 'text-green-600' : 'text-red-600', isSuccess ? 'dark:text-green-400' : 'dark:text-red-400')
    feedbackText.textContent = message

    if (!isSuccess) {
      const errorInput = getInputElementForError(message)
      if (errorInput) {
        errorInput.setAttribute('aria-invalid', 'true')
        errorInput.classList.add('border-red-500', 'dark:border-red-500', 'ring-2', 'ring-red-500')
        errorInput.focus()
      }
    }
  }

  function hideFeedback() {
    clearInputErrors()
    feedbackText.classList.add('hidden')
    feedbackText.classList.remove('text-green-600', 'dark:text-green-400')
    feedbackText.classList.add('text-red-600', 'dark:text-red-400')
  }

  /** Mostra sucesso e redireciona para login após delay cancelável. */
  function showSuccessSequence(message, finalAction, requestVersion) {
    if (!isModalOpen || requestVersion !== authRequestVersion) return
    clearPendingTimeouts()
    showFeedback(message, true)

    const t1 = setTimeout(() => {
      if (!isModalOpen || requestVersion !== authRequestVersion) return
      showFeedback('Redirecionando para o login...', true)
    }, 1500)

    const t2 = setTimeout(() => {
      if (!isModalOpen || requestVersion !== authRequestVersion) return
      finalAction()
      clearPendingTimeouts()
    }, 3000)

    pendingTimeouts.push(t1, t2)
  }

  // ---------------------------------------------------------------------------
  // Mode Management
  // ---------------------------------------------------------------------------

  function resetRegisterFields() {
    nameInput.value = ''
    phoneInput.value = ''
    streetInput.value = ''
    neighborhoodInput.value = ''
    addressNumberInput.value = ''
  }

  function setAuthMode(mode) {
    authRequestVersion++
    const previousMode = authMode
    authMode = mode

    hideFeedback()

    if (!Object.prototype.hasOwnProperty.call(MODE_CONFIG, mode)) {
      mode = 'login'
    }

    const config = MODE_CONFIG[mode]

    // Animated sections
    if (config.showRegister) {
      expandSection(registerFields, registerInner)
    } else {
      collapseSection(registerFields, registerInner)
    }

    if (config.showEmail) {
      expandSection(emailWrapper, emailInner)
    } else {
      collapseSection(emailWrapper, emailInner)
    }

    if (config.showPassword) {
      expandSection(passwordWrapper, passwordInner)
    } else {
      collapseSection(passwordWrapper, passwordInner)
    }

    // Reset register fields when leaving register mode
    if (previousMode === 'register' && mode !== 'register') {
      resetRegisterFields()
    }

    // Required fields
    nameInput.required = config.required.name
    phoneInput.required = config.required.phone
    streetInput.required = config.required.street
    neighborhoodInput.required = config.required.neighborhood
    addressNumberInput.required = config.required.addressNumber
    emailInput.required = config.required.email
    passwordInput.required = config.required.password

    // Text labels
    title.textContent = config.title
    submitText.textContent = config.submit

    // Footer
    if (config.hideFooter) {
      footerActions.classList.add('hidden', 'opacity-0')
    } else {
      footerActions.classList.remove('hidden', 'opacity-0')
      authModeText.textContent = config.modeText
      toggleModeBtn.textContent = config.toggleText
    }

    // Forgot password link
    if (config.showForgot) {
      forgotPasswordBtn.classList.remove('hidden')
      forgotPasswordBtn.classList.add('block')
    } else {
      forgotPasswordBtn.classList.add('hidden')
      forgotPasswordBtn.classList.remove('block')
    }
  }

  // ---------------------------------------------------------------------------
  // Open / Close (Focus Trap & Focus Restoration — WCAG 2.4.3)
  // ---------------------------------------------------------------------------

  function openDrawer(mode = 'login') {
    authRequestVersion++
    isModalOpen = true

    if (closeTimeout) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }

    lastAuthTrigger = document.activeElement

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

      dialog.classList.remove(
        'translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0',
      )
      dialog.classList.add(
        'translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100',
      )

      // Foco automático inicial no primeiro campo visível
      const initialInput = mode === 'register' ? nameInput : (MODE_CONFIG[mode]?.showEmail ? emailInput : passwordInput)
      initialInput?.focus()
    })
  }

  function closeDrawer() {
    authRequestVersion++
    isModalOpen = false
    unlockScroll()
    clearPendingTimeouts()

    backdrop.classList.add('opacity-0')

    dialog.classList.remove(
      'translate-y-0', 'sm:translate-y-0', 'sm:scale-100', 'sm:opacity-100',
    )
    dialog.classList.add(
      'translate-y-full', 'sm:translate-y-8', 'sm:scale-95', 'sm:opacity-0',
    )

    if (closeTimeout) clearTimeout(closeTimeout)

    closeTimeout = setTimeout(() => {
      backdrop.classList.add('hidden')
      wrapper.classList.add('hidden')
      wrapper.classList.remove('flex')
      form.reset()
      hideFeedback()
      closeTimeout = null

      if (lastAuthTrigger && typeof lastAuthTrigger.focus === 'function') {
        lastAuthTrigger.focus()
      }
    }, 500)
  }

  // ---------------------------------------------------------------------------
  // Password Visibility Toggle
  // ---------------------------------------------------------------------------

  const togglePasswordBtn = document.getElementById('toggle-password-visibility-btn')
  togglePasswordBtn?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password'
    passwordInput.type = isPassword ? 'text' : 'password'
    togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha')

    const iconShow = document.getElementById('icon-eye-show')
    const iconHide = document.getElementById('icon-eye-hide')

    if (isPassword) {
      iconShow?.classList.add('hidden')
      iconHide?.classList.remove('hidden')
    } else {
      iconHide?.classList.add('hidden')
      iconShow?.classList.remove('hidden')
    }
  })

  // Retenção de Foco Teclado (Focus Trap — WCAG 2.4.3)
  document.addEventListener('keydown', (e) => {
    if (wrapper.classList.contains('hidden')) return
    if (e.key !== 'Tab') return

    const focusables = Array.from(
      dialog.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement)

    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first || !dialog.contains(document.activeElement)) {
        last.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === last || !dialog.contains(document.activeElement)) {
        first.focus()
        e.preventDefault()
      }
    }
  })

  // ---------------------------------------------------------------------------
  // Event Bus
  // ---------------------------------------------------------------------------

  eventBus.on('auth:open', openDrawer)

  // ---------------------------------------------------------------------------
  // Escape Handler
  // ---------------------------------------------------------------------------

  registerEscapeHandler(
    () => !wrapper.classList.contains('hidden'),
    closeDrawer,
  )

  // ---------------------------------------------------------------------------
  // Close Events
  // ---------------------------------------------------------------------------

  closeBtn.addEventListener('click', closeDrawer)

  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) closeDrawer()
  })

  backdrop.addEventListener('click', closeDrawer)

  // ---------------------------------------------------------------------------
  // Mode Toggle
  // ---------------------------------------------------------------------------

  toggleModeBtn.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
  })

  forgotPasswordBtn.addEventListener('click', () => {
    setAuthMode('forgot')
  })

  // ---------------------------------------------------------------------------
  // Form Submission
  // ---------------------------------------------------------------------------

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

    // Frontend validation — feedback instantâneo sem bater no servidor
    const validationError = validateForm(authMode, {
      email,
      password,
      name,
      phone,
      street,
      neighborhood,
      addressNumber,
    })

    if (validationError) {
      showFeedback(validationError)
      return
    }

    const currentRequestVersion = ++authRequestVersion

    submitText.classList.add('opacity-0')
    loadingSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    try {
      if (authMode === 'register') {
        await AuthManager.signUp({
          email,
          password,
          fullName: name,
          phone,
          street,
          neighborhood,
          addressNumber,
        })
        if (!isModalOpen || currentRequestVersion !== authRequestVersion) return
        showSuccessSequence('Conta criada com sucesso!', () => setAuthMode('login'), currentRequestVersion)

      } else if (authMode === 'forgot') {
        await AuthManager.resetPasswordForEmail(email)
        if (!isModalOpen || currentRequestVersion !== authRequestVersion) return
        showSuccessSequence('Instruções enviadas para seu e-mail!', () => setAuthMode('login'), currentRequestVersion)

      } else if (authMode === 'update_password') {
        await AuthManager.updatePassword(password)
        if (!isModalOpen || currentRequestVersion !== authRequestVersion) return
        showSuccessSequence('Senha atualizada com sucesso!', () => setAuthMode('login'), currentRequestVersion)

      } else {
        await AuthManager.signIn(email, password)
        if (!isModalOpen || currentRequestVersion !== authRequestVersion) return
        closeDrawer()
      }
    } catch (error) {
      if (!isModalOpen || currentRequestVersion !== authRequestVersion) return
      console.error('[PodoSys] Auth error:', {
        message: error.message,
        error,
      })
      showFeedback(translateError(error.message))
    } finally {
      if (isModalOpen && currentRequestVersion === authRequestVersion) {
        submitText.classList.remove('opacity-0')
        loadingSpinner.classList.add('hidden')
        submitBtn.disabled = false
      }
    }
  })
}
