import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'
import { initNavbarAnimation } from '@/animations/navbar'

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const { isAuthenticated, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const headerEl = headerRef.current
      const floatingNav = navRef.current
      if (!headerEl || !floatingNav) return

      const mm = gsap.matchMedia()
      mm.add(
        {
          isMotionOk: '(prefers-reduced-motion: no-preference)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMotionOk } = context.conditions!
          if (!isMotionOk) {
            headerEl.removeAttribute('inert')
            headerEl.style.visibility = 'visible'
            floatingNav.style.pointerEvents = 'auto'
            gsap.set(floatingNav, { yPercent: 0 })
            return
          }

          return initNavbarAnimation(headerEl, floatingNav)
        },
      )
    },
    { scope: headerRef },
  )

  return (
    <header
      ref={headerRef}
      className="fixed top-[max(1.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-4xl z-40"
    >
      <nav
        ref={navRef}
        aria-label="Navegação principal"
        className="w-full bg-theme-nav backdrop-blur-2xl border border-theme-nav-border shadow-xl shadow-slate-900/5 dark:shadow-black/20 rounded-full transition-colors duration-300"
      >
        <div className="px-2.5 sm:px-3 py-2.5 sm:py-3 h-16 flex items-center justify-between">
          <Link
            to="/"
            aria-label="Angélica Eduarda - Página inicial"
            className="font-semibold text-base sm:text-lg tracking-tight truncate mr-2 sm:mr-4 pl-3 sm:pl-4 text-slate-900 dark:text-slate-50 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-apple-blue rounded-lg"
          >
            Angélica Eduarda
          </Link>

          <div className="hidden sm:flex items-center gap-1 mr-2">
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Dúvidas
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-apple-blue shrink-0"
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              aria-pressed={isDark}
              title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {/* Ícone de Lua (Modo Claro ativo -> Mostrar Lua para ir pro Escuro) */}
              <svg
                id="theme-icon-moon"
                className="w-5 h-5 block dark:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              {/* Ícone de Sol (Modo Escuro ativo -> Mostrar Sol para voltar pro Claro) */}
              <svg
                id="theme-icon-sun"
                className="w-5 h-5 hidden dark:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-apple-blue hover:bg-apple-blue-hover text-white text-sm font-medium px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full transition-all active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-apple-blue"
              >
                Painel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="bg-apple-blue hover:bg-apple-blue-hover text-white text-sm font-medium px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-full transition-all active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-apple-blue"
              >
                Entrar
              </button>
            )}

            {/* Menu Dropdown Mobile DaisyUI */}
            <div
              className={`dropdown dropdown-end sm:hidden ${isMobileMenuOpen ? 'dropdown-open' : ''}`}
            >
              <button
                tabIndex={0}
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
                aria-label="Menu de navegação"
                aria-haspopup="menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                role="menu"
                aria-label="Menu de navegação móvel"
                className="dropdown-content menu bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl w-56 p-2 mt-3 z-50 text-slate-800 dark:text-slate-200 text-sm font-medium space-y-1"
              >
                <li role="none">
                  <a
                    role="menuitem"
                    href="#main-content"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
                  >
                    Início
                  </a>
                </li>
                <li role="none">
                  <a
                    role="menuitem"
                    href="#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
                  >
                    Perguntas Frequentes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
