import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'
import { initNavbarAnimation } from '@/animations/navbar'
import { applyNavbarReducedMotion } from '@/animations/reducedMotion'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Sun, Moon, Menu, X, ArrowUpRight, User } from 'lucide-react'

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
      const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      firstFocusable?.focus()
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

  const handleEntrarClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      openAuthModal('login')
    }
  }

  const handleAgendarClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      openAuthModal('login')
    }
  }

  return (
    <div className="fixed top-0 inset-x-0 w-full z-50 pointer-events-none">
      {/* Backdrop Mobile para fechar ao clicar fora */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-xs lg:hidden pointer-events-auto z-40 transition-opacity duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        ref={headerRef}
        className="pointer-events-auto w-full transition-[background-color,border-color,backdrop-filter] duration-300 border-b border-transparent [&.is-scrolled]:bg-[#faf8f5]/90 dark:[&.is-scrolled]:bg-[#11100f]/90 [&.is-scrolled]:backdrop-blur-md [&.is-scrolled]:border-black/[0.06] dark:[&.is-scrolled]:border-white/[0.08] relative z-50"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
          {/* Lado Esquerdo: Hambúrguer Mobile + Logotipo Editorial */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Botão Hambúrguer Mobile/Tablet com área de toque mínima 44x44px */}
            <div className="lg:hidden flex items-center">
              <button
                ref={mobileToggleRef}
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-full text-text-secondary dark:text-slate-400 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                aria-label={
                  isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X aria-hidden="true" className="w-5 h-5" />
                ) : (
                  <Menu aria-hidden="true" className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Logotipo Tipográfico Editorial */}
            <Link
              to="/"
              className="flex flex-col text-left py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg select-none group"
            >
              <span className="font-serif text-sm sm:text-lg lg:text-xl font-medium tracking-[0.04em] sm:tracking-[0.10em] uppercase text-on-surface dark:text-white group-hover:text-accent transition-colors leading-none whitespace-nowrap">
                Angélica Eduarda
              </span>
              <span className="font-sans text-[10px] sm:text-xs text-accent font-medium mt-1 whitespace-nowrap">
                <span className="sm:hidden">Podologia · Mococa</span>
                <span className="hidden sm:inline">Podologia em Domicílio · Mococa</span>
              </span>
            </Link>
          </div>

          {/* Navegação Desktop Centralizada com tipografia editorial sem sobreposição */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.14em] xl:tracking-[0.16em] font-medium text-text-secondary dark:text-slate-400 flex-1 px-4 max-w-md mx-auto"
          >
            <a
              className="hover:text-accent dark:hover:text-accent transition-colors py-2 px-1 min-h-[44px] inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              href="#procedimentos"
            >
              Procedimentos
            </a>
            <a
              className="hover:text-accent dark:hover:text-accent transition-colors py-2 px-1 min-h-[44px] inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              href="#tecnologia"
            >
              Biossegurança
            </a>
            <a
              className="hover:text-accent dark:hover:text-accent transition-colors py-2 px-1 min-h-[44px] inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              href="#faq"
            >
              Dúvidas
            </a>
          </nav>

          {/* Ações à Direita: Tema + "Entrar" (Secundário) + "Agendar Horário" (Primário) */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Alternador de Tema */}
            <button
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              onClick={toggleTheme}
              className="min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-full text-text-secondary dark:text-slate-400 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              type="button"
            >
              {isDark ? (
                <Sun aria-hidden="true" className="w-4 h-4" />
              ) : (
                <Moon aria-hidden="true" className="w-4 h-4" />
              )}
            </button>

            {/* Ação Secundária Funcional: "Entrar" / "Painel" (no mobile vive no drawer acessível) */}
            <button
              type="button"
              aria-label={
                isAuthenticated
                  ? 'Acessar painel do cliente'
                  : 'Entrar na conta do paciente (painel do cliente)'
              }
              onClick={handleEntrarClick}
              className="hidden sm:inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium text-text-secondary dark:text-slate-300 hover:text-on-surface dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer whitespace-nowrap shrink-0"
            >
              <User aria-hidden="true" className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span>{isAuthenticated ? 'Painel' : 'Entrar'}</span>
            </button>

            {/* CTA Primário de Conversão: "Agendar Horário" */}
            <button
              type="button"
              aria-label="Agendar horário de atendimento"
              onClick={handleAgendarClick}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-accent text-on-accent text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">Agendar</span>
              <span className="hidden sm:inline">Agendar Horário</span>
            </button>
          </div>
        </div>

        {/* Menu Mobile/Tablet Dropdown com focus trap, backdrop e anel de foco */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="region"
            aria-label="Menu móvel"
            className="absolute top-full left-0 right-0 p-4 bg-[#faf8f5]/98 dark:bg-[#11100f]/98 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-lg flex flex-col gap-2 lg:hidden z-50"
          >
            <a
              href="#procedimentos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-[44px] rounded-lg text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-slate-200 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              Procedimentos
            </a>
            <a
              href="#tecnologia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-[44px] rounded-lg text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-slate-200 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              Biossegurança
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 min-h-[44px] rounded-lg text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-slate-200 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              Dúvidas
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Tirar dúvidas pelo WhatsApp (abre em uma nova aba)"
              className="px-4 py-3 min-h-[44px] rounded-lg text-xs uppercase tracking-[0.16em] font-medium text-accent dark:text-[#34d399] hover:text-accent-hover hover:bg-sage-subtle dark:hover:bg-[#19261F] transition-colors flex items-center justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Dúvidas no WhatsApp</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </a>

            {/* Separador e Ações de Autenticação / Agendamento Mobile */}
            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5">
              {/* Botão Primário: Agendar Horário */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleAgendarClick()
                }}
                className="w-full min-h-[44px] min-w-[44px] px-4 py-3 rounded-xl bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shadow-xs"
              >
                Agendar Horário
              </button>

              {/* Botão Secundário: Entrar / Painel do Cliente */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleEntrarClick()
                }}
                className="w-full min-h-[44px] min-w-[44px] px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.1] text-xs uppercase tracking-[0.14em] font-medium text-on-surface dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <User
                  aria-hidden="true"
                  className="w-4 h-4 text-text-secondary dark:text-slate-400 shrink-0"
                />
                <span>{isAuthenticated ? 'Acessar Meu Painel' : 'Entrar (Painel do Cliente)'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
