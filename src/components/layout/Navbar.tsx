import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'
import { initNavbarAnimation } from '@/animations/navbar'
import { applyNavbarReducedMotion } from '@/animations/reducedMotion'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const { isAuthenticated, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const prevOpenRef = useRef(false)

  // Gerenciamento de foco: move foco para o primeiro link ao abrir e restaura para o botão ao fechar
  useEffect(() => {
    if (isMobileMenuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a[href]')
      firstLink?.focus()
    } else if (prevOpenRef.current) {
      mobileToggleRef.current?.focus()
    }
    prevOpenRef.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  // Focus trap, Escape e clique fora para o menu mobile
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsMobileMenuOpen(false)
        return
      }

      if (e.key === 'Tab') {
        const menuItems = mobileMenuRef.current
          ? Array.from(
              mobileMenuRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
              ),
            )
          : []

        if (menuItems.length === 0) return

        const firstItem = menuItems[0]
        const lastItem = menuItems[menuItems.length - 1]
        const toggleBtn = mobileToggleRef.current

        if (document.activeElement === toggleBtn) {
          e.preventDefault()
          if (e.shiftKey) {
            lastItem.focus()
          } else {
            firstItem.focus()
          }
        } else if (document.activeElement === firstItem && e.shiftKey) {
          e.preventDefault()
          toggleBtn?.focus()
        } else if (document.activeElement === lastItem && !e.shiftKey) {
          e.preventDefault()
          toggleBtn?.focus()
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  useGSAP(
    () => {
      const headerEl = headerRef.current
      if (!headerEl) return

      const mm = gsap.matchMedia()
      mm.add(
        {
          isMotionOk: '(prefers-reduced-motion: no-preference)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMotionOk } = context.conditions!
          if (!isMotionOk) {
            applyNavbarReducedMotion(headerEl, headerEl)
            return
          }

          const cleanupNavbar = initNavbarAnimation(headerEl, headerEl)

          return () => {
            cleanupNavbar?.()
          }
        },
      )

      return () => mm.revert()
    },
    { scope: headerRef },
  )

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      openAuthModal('login')
    }
  }

  return (
    <div className="fixed top-[max(1.25rem,env(safe-area-inset-top))] inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      {/* Backdrop Mobile para fechar ao clicar fora */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-xs md:hidden pointer-events-auto z-40 transition-opacity duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        ref={headerRef}
        className="pointer-events-auto max-w-4xl w-full px-3.5 sm:px-5 py-2 rounded-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-surface-border dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-300 relative z-50"
      >
        {/* Lado Esquerdo: Hambúrguer Mobile + Logotipo Tipográfico */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Botão Hambúrguer Mobile com área de toque mínima 44x44px */}
          <div className="md:hidden flex items-center">
            <button
              ref={mobileToggleRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-apple-gray dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="w-6 h-6" />
              ) : (
                <Menu aria-hidden="true" className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Logotipo Tipográfico no lado esquerdo da ilha flutuante */}
          <Link
            to="/"
            className="font-bold text-sm sm:text-base tracking-tight text-on-surface dark:text-white hover:text-primary dark:hover:text-primary transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1 select-none"
          >
            Angélica Eduarda
          </Link>
        </div>

        {/* Navegação Desktop Centralizada */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-on-surface-variant dark:text-slate-300 absolute left-1/2 -translate-x-1/2"
        >
          <a
            className="hover:text-primary transition-colors py-2 px-1 min-h-11 inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            href="#procedimentos"
          >
            Serviços
          </a>
          <a
            className="hover:text-primary transition-colors py-2 px-1 min-h-11 inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            href="#tecnologia"
          >
            Tecnologia
          </a>
          <a
            className="hover:text-primary transition-colors py-2 px-1 min-h-11 inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            href="#faq"
          >
            Dúvidas
          </a>
          <a
            className="hover:text-primary transition-colors py-2 px-1 min-h-11 inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            href={getWhatsAppUrl()}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Conversar pelo WhatsApp (abre em uma nova aba)"
          >
            WhatsApp
          </a>
        </nav>

        {/* Ações à Direita com áreas de toque mínimas de 44x44px */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            onClick={toggleTheme}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-apple-gray dark:hover:bg-slate-800 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            {isDark ? (
              <Sun aria-hidden="true" className="w-5 h-5" />
            ) : (
              <Moon aria-hidden="true" className="w-5 h-5" />
            )}
          </button>
          <button
            aria-label={
              isAuthenticated ? 'Acessar painel do paciente' : 'Entrar na área do cliente'
            }
            onClick={handleAuthClick}
            className="inline-flex items-center justify-center px-5 sm:px-6 min-h-11 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
          >
            {isAuthenticated ? 'Painel' : 'Entrar'}
          </button>
        </div>

        {/* Menu Mobile Dropdown com focus trap, backdrop e anel de foco */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="region"
            aria-label="Menu móvel"
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-surface-border dark:border-slate-800 rounded-2xl shadow-xl flex flex-col gap-1.5 md:hidden z-50"
          >
            <a
              href="#procedimentos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-11 rounded-xl text-sm font-medium text-on-surface-variant dark:text-slate-200 hover:bg-clinical-teal-subtle dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              Serviços
            </a>
            <a
              href="#tecnologia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-11 rounded-xl text-sm font-medium text-on-surface-variant dark:text-slate-200 hover:bg-clinical-teal-subtle dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              Tecnologia
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-11 rounded-xl text-sm font-medium text-on-surface-variant dark:text-slate-200 hover:bg-clinical-teal-subtle dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              Dúvidas
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Conversar pelo WhatsApp (abre em uma nova aba)"
              className="px-4 py-3 min-h-11 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>WhatsApp</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>
    </div>
  )
}
