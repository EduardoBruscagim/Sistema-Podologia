import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { AuthModalTab } from '@/types/auth'
import { X, User, AlertCircle } from 'lucide-react'

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
      className="modal modal-bottom sm:modal-middle backdrop:backdrop-blur-sm"
    >
      <div className="modal-box bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        {/* Botão Fechar com área de toque mínima de 44x44px */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="w-11 h-11 shrink-0 flex items-center justify-center absolute right-3 top-3 text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white rounded-full hover:bg-apple-gray dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Fechar formulário de autenticação"
        >
          <X aria-hidden="true" className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-clinical-teal-subtle dark:bg-slate-800 flex items-center justify-center text-primary mb-3">
            <User aria-hidden="true" className="w-6 h-6" />
          </div>
          <h3
            id="auth-modal-title"
            className="text-2xl font-bold tracking-tight text-on-surface dark:text-white"
          >
            Angélica Eduarda
          </h3>
          <p className="text-xs text-text-secondary dark:text-slate-400 mt-1 font-normal">
            Podologia Especializada a Domicílio em Mococa - SP
          </p>
        </div>

        {/* Segmented Control / Tabs acessível */}
        <div
          role="tablist"
          aria-label="Opções de autenticação"
          className="flex p-1 rounded-full bg-apple-gray dark:bg-slate-800 border border-surface-border dark:border-slate-700/60 mb-6"
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
            className={`flex-1 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[40px] flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
              authModalTab === 'login'
                ? 'bg-white dark:bg-slate-900 text-on-surface dark:text-white shadow-xs'
                : 'text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
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
            className={`flex-1 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[40px] flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
              authModalTab === 'register'
                ? 'bg-white dark:bg-slate-900 text-on-surface dark:text-white shadow-xs'
                : 'text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
            }`}
            onClick={() => handleTabChange('register')}
          >
            Cadastrar
          </button>
        </div>

        {/* Alerta de erro acessível */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="text-xs rounded-2xl py-2.5 px-4 mb-4 flex items-center gap-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 font-medium"
          >
            <AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
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
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1.5 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-12 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="auth-login-password"
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1.5 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-12 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary hover:bg-primary-hover text-on-primary text-sm sm:text-base font-semibold h-[46px] shadow-sm active:scale-[0.98] transition-[background-color,transform,box-shadow] flex items-center justify-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div
                  aria-label="Carregando..."
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
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
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-11 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-email"
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-11 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-phone"
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-11 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="auth-register-password"
                className="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-slate-400 mb-1 ml-1"
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
                className="w-full rounded-2xl bg-apple-gray/60 dark:bg-slate-800/60 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white placeholder:text-text-secondary/70 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 text-sm px-4 h-11 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary hover:bg-primary-hover text-on-primary text-sm sm:text-base font-semibold h-[46px] shadow-sm active:scale-[0.98] transition-[background-color,transform,box-shadow] flex items-center justify-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              {isLoading ? (
                <div
                  aria-label="Carregando..."
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
              ) : (
                'Criar conta e continuar'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Backdrop clicável */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Fechar modal de autenticação">fechar</button>
      </form>
    </dialog>
  )
}
