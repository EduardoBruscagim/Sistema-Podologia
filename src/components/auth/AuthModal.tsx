import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { AuthModalTab } from '@/types/auth'

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalTab, setAuthModalTab, closeAuthModal, login, register } =
    useAuth()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const loginTabRef = useRef<HTMLButtonElement | null>(null)
  const registerTabRef = useRef<HTMLButtonElement | null>(null)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  // UI status
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Sincroniza abertura e fechamento do dialog nativo
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isAuthModalOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isAuthModalOpen])

  const handleTabChange = (tab: AuthModalTab) => {
    setAuthModalTab(tab)
    setErrorMessage(null)
  }

  const handleKeyDownTab = (e: React.KeyboardEvent, currentTab: AuthModalTab) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const nextTab: AuthModalTab = currentTab === 'login' ? 'register' : 'login'
      handleTabChange(nextTab)
      if (nextTab === 'login') {
        loginTabRef.current?.focus()
      } else {
        registerTabRef.current?.focus()
      }
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)

    const result = await login({
      email: loginEmail,
      password: loginPassword,
    })

    setIsLoading(false)
    if (!result.success) {
      setErrorMessage(result.error || 'Erro ao efetuar login.')
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)

    const result = await register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword,
    })

    setIsLoading(false)
    if (!result.success) {
      setErrorMessage(result.error || 'Erro ao realizar cadastro.')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={closeAuthModal}
      aria-labelledby="auth-modal-title"
      className="modal modal-bottom sm:modal-middle bg-slate-950/40 backdrop-blur-sm transition-all"
    >
      <div className="modal-box bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-slate-900/10 dark:shadow-black/50 relative">
        {/* Botão Fechar com área de toque mínima de 44x44px */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center absolute right-3 top-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
          aria-label="Fechar formulário de autenticação"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3
            id="auth-modal-title"
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
          >
            Angélica Eduarda
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Podologia Especializada a Domicílio
          </p>
        </div>

        {/* Segmented Control / Tabs DaisyUI acessível */}
        <div
          role="tablist"
          aria-label="Opções de autenticação"
          className="tabs tabs-box bg-slate-100 dark:bg-slate-800/90 p-1 rounded-full mb-6"
        >
          <button
            ref={loginTabRef}
            id="auth-tab-login"
            role="tab"
            type="button"
            tabIndex={authModalTab === 'login' ? 0 : -1}
            aria-selected={authModalTab === 'login'}
            aria-controls="auth-tabpanel-login"
            onKeyDown={(e) => handleKeyDownTab(e, 'login')}
            className={`tab flex-1 rounded-full text-sm font-semibold transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${
              authModalTab === 'login'
                ? 'tab-active bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            onClick={() => handleTabChange('login')}
          >
            Entrar
          </button>
          <button
            ref={registerTabRef}
            id="auth-tab-register"
            role="tab"
            type="button"
            tabIndex={authModalTab === 'register' ? 0 : -1}
            aria-selected={authModalTab === 'register'}
            aria-controls="auth-tabpanel-register"
            onKeyDown={(e) => handleKeyDownTab(e, 'register')}
            className={`tab flex-1 rounded-full text-sm font-semibold transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${
              authModalTab === 'register'
                ? 'tab-active bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            onClick={() => handleTabChange('register')}
          >
            Cadastrar
          </button>
        </div>

        {/* Alerta de erro DaisyUI */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-error text-xs rounded-2xl py-2.5 px-4 mb-4 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulário: Entrar */}
        {authModalTab === 'login' && (
          <form
            id="auth-tabpanel-login"
            role="tabpanel"
            aria-labelledby="auth-tab-login"
            onSubmit={handleLoginSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="auth-login-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1"
              >
                E-mail
              </label>
              <input
                id="auth-login-email"
                type="email"
                required
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-12"
              />
            </div>

            <div>
              <label
                htmlFor="auth-login-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1"
              >
                Senha
              </label>
              <input
                id="auth-login-password"
                type="password"
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-12"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white border-none shadow-md shadow-apple-blue/20 active:scale-95 transition-all text-base font-medium h-12 mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Entrar na conta'
              )}
            </button>
          </form>
        )}

        {/* Formulário: Cadastrar */}
        {authModalTab === 'register' && (
          <form
            id="auth-tabpanel-register"
            role="tabpanel"
            aria-labelledby="auth-tab-register"
            onSubmit={handleRegisterSubmit}
            className="space-y-3.5"
          >
            <div>
              <label
                htmlFor="auth-register-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 ml-1"
              >
                Nome Completo
              </label>
              <input
                id="auth-register-name"
                type="text"
                required
                autoComplete="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Ex: Maria Silva"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 ml-1"
              >
                E-mail
              </label>
              <input
                id="auth-register-email"
                type="email"
                required
                autoComplete="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 ml-1"
              >
                WhatsApp / Telefone
              </label>
              <input
                id="auth-register-phone"
                type="tel"
                autoComplete="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1 ml-1"
              >
                Criar Senha (mín. 6 caracteres)
              </label>
              <input
                id="auth-register-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full rounded-full bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-apple-blue focus:outline-none text-sm px-4 h-11"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white border-none shadow-md shadow-apple-blue/20 active:scale-95 transition-all text-base font-medium h-12 mt-3 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Criar conta e continuar'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Backdrop clicável */}
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeAuthModal} aria-label="Fechar modal de autenticação">
          fechar
        </button>
      </form>
    </dialog>
  )
}
