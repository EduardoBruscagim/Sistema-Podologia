import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { initNavbarAnimation } from '@/animations/navbar'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Sun, Moon, ArrowUpRight } from 'lucide-react'

/**
 * Componente de Cabeçalho / Barra de Navegação Superior.
 *
 * ### Funcionalidades e Acessibilidade:
 * 1. **Efeito Scrolled Suave:** Transita para fundo translúcido (backdrop-blur) com borda capilar
 *    ao rolar a página mais de 20px via `initNavbarAnimation`.
 * 2. **Menu Mobile Acessível (WAI-ARIA Dialog/Drawer):**
 *    - Bloqueio de rolagem do body quando aberto.
 *    - Aplicação do atributo `inert` nos elementos adjacentes (`main`, `footer`, `aside`)
 *      para evitar navegação por foco fora do menu aberto.
 *    - Trap de foco estrito com `Tab` e `Shift+Tab`.
 *    - Fechamento imediato com tecla `Escape` ou clique no backdrop.
 *    - Restauração automática de foco para o botão hambúrguer ao fechar.
 * 3. **Live Region para Tema:**
 *    - Região `aria-live="polite"` que anuncia mudanças de modo claro/escuro para leitores de tela.
 * 4. **Touch Targets Conformes (WCAG 2.2):**
 *    - Todas as áreas interativas possuem dimensões mínimas de 44x44px.
 */

export const Navbar: React.FC = () => {
  // ---------------------------------------------------------------------------
  // 1. Estados e Referências DOM
  // ---------------------------------------------------------------------------

  const { isDark, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [themeStatusMessage, setThemeStatusMessage] = useState('')

  const headerRef = useRef<HTMLElement | null>(null)
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const prevOpenRef = useRef(false)

  // ---------------------------------------------------------------------------
  // 2. Manipulação de Tema
  // ---------------------------------------------------------------------------

  const handleToggleTheme = () => {
    toggleTheme()
    setThemeStatusMessage(isDark ? 'Modo claro ativado' : 'Modo escuro ativado')
  }

  // ---------------------------------------------------------------------------
  // 3. Trava de Rolagem e Isolamento Semântico (`inert`)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    const mainEl = document.getElementById('main-content')
    const footerEl = document.querySelector('footer')
    const asideEl = document.querySelector('aside')

    if (isMobileMenuOpen) {
      mainEl?.setAttribute('inert', '')
      footerEl?.setAttribute('inert', '')
      asideEl?.setAttribute('inert', '')
    } else {
      mainEl?.removeAttribute('inert')
      footerEl?.removeAttribute('inert')
      asideEl?.removeAttribute('inert')
    }

    return () => {
      document.body.style.overflow = ''
      mainEl?.removeAttribute('inert')
      footerEl?.removeAttribute('inert')
      asideEl?.removeAttribute('inert')
    }
  }, [isMobileMenuOpen])

  // ---------------------------------------------------------------------------
  // 4. Auto-fechamento ao Redimensionar para Desktop (>= 1024px)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    try {
      const mql = window.matchMedia('(min-width: 1024px)')
      const handleResize = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setIsMobileMenuOpen(false)
        }
      }
      mql.addEventListener('change', handleResize)
      return () => mql.removeEventListener('change', handleResize)
    } catch {
      // MatchMedia indisponível no ambiente de teste/SSR
    }
  }, [])

  // ---------------------------------------------------------------------------
  // 5. Gerenciamento e Restauração de Foco
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Move o foco para o primeiro elemento navegável dentro do menu
      const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      firstFocusable?.focus()
    } else if (prevOpenRef.current) {
      // Devolve o foco ao botão disparador quando o menu é fechado
      mobileToggleRef.current?.focus()
    }
    prevOpenRef.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  // ---------------------------------------------------------------------------
  // 6. Focus Trap, Tecla Escape e Clique Externo
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // 7. Inicialização da Animação do Header
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return

    return initNavbarAnimation(headerEl, headerEl)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 w-full z-50 pointer-events-none">
      {/* Backdrop Mobile para fechar ao clicar fora */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-primary/40 lg:hidden pointer-events-auto z-40 transition-opacity duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        ref={headerRef}
        data-mobile-menu-open={isMobileMenuOpen}
        className="pointer-events-auto w-full transition-[background-color,border-color,backdrop-filter] duration-300 border-b border-transparent [&.is-scrolled]:bg-surface/90 [&.is-scrolled]:backdrop-blur-md [&.is-scrolled]:border-surface-border relative z-50"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
          {/* Lado Esquerdo: Hambúrguer Mobile + Logotipo Editorial */}
          <div className="flex items-center gap-1 sm:gap-3 min-w-0">
            {/* Botão Hambúrguer Mobile/Tablet Premium (Estilo Apple) */}
            <div className="lg:hidden flex items-center">
              <button
                ref={mobileToggleRef}
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="relative min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-md text-text-secondary hover:text-accent dark:hover:text-accent hover:bg-surface-variant transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer z-50"
                aria-label={
                  isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-[16px] h-[10px] relative flex flex-col justify-between">
                  <span
                    className={`absolute left-0 w-full h-[1.5px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'top-[4px] rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-[1.5px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isMobileMenuOpen ? 'top-[4px] -rotate-45' : 'bottom-0'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Logotipo Tipográfico Editorial */}
            <a
              href="/"
              className="flex flex-col justify-center min-h-[44px] text-left py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg select-none group min-w-0"
            >
              <span className="font-serif text-[13px] xs:text-sm sm:text-lg lg:text-xl font-medium tracking-[0.06em] sm:tracking-[0.10em] uppercase text-on-surface group-hover:text-accent transition-colors leading-none whitespace-nowrap">
                Angélica Bruscagim
              </span>
              <span className="font-sans text-[11px] sm:text-xs text-accent font-medium mt-1 whitespace-nowrap truncate">
                <span className="sm:hidden">Podologia · Mococa</span>
                <span className="hidden sm:inline">Podologia em Domicílio · Mococa</span>
              </span>
            </a>
          </div>

          {/* Navegação Desktop Centralizada com tipografia editorial sem sobreposição */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.14em] xl:tracking-[0.16em] font-medium text-text-secondary flex-1 px-4 max-w-md mx-auto"
          >
            <a
              className="hover:text-accent dark:hover:text-accent transition-colors py-2 px-1 min-h-[44px] inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              href="#sobre"
            >
              Sobre
            </a>
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
              Higiene
            </a>
            <a
              className="hover:text-accent dark:hover:text-accent transition-colors py-2 px-1 min-h-[44px] inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md"
              href="#faq"
            >
              Dúvidas
            </a>
          </nav>

          {/* Ações à Direita: Tema + "Agendar Horário" (Primário para #procedimentos) */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Alternador de Tema */}
            <button
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              aria-pressed={isDark}
              onClick={handleToggleTheme}
              className="min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-md text-text-secondary hover:text-accent dark:hover:text-accent hover:bg-surface-variant transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              type="button"
            >
              {isDark ? (
                <Sun aria-hidden="true" className="w-4 h-4" />
              ) : (
                <Moon aria-hidden="true" className="w-4 h-4" />
              )}
            </button>

            {/* Região ao vivo para anúncio de status do tema para leitores de tela */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {themeStatusMessage}
            </div>

            {/* CTA Primário: Oculto em < 360px para evitar colisão na barra superior */}
            <a
              href="#procedimentos"
              aria-label="Agendar Horário - Ver procedimentos e horários"
              className="hidden xs:inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-accent text-on-accent text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-[background-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">Agendar</span>
              <span className="hidden sm:inline">Agendar Horário</span>
            </a>
          </div>
        </div>

        {/* Menu Mobile/Tablet Dropdown (Estilo Apple - Full Screen Overlay) */}
        <nav
          ref={mobileMenuRef}
          id="mobile-menu"
          aria-label="Menu móvel"
          hidden={!isMobileMenuOpen}
          className={`fixed top-[72px] sm:top-[80px] bottom-0 left-0 right-0 px-6 pt-6 pb-24 bg-surface/95 dark:bg-surface/90 backdrop-blur-2xl flex flex-col lg:hidden z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col flex-1 max-w-sm mx-auto w-full mt-4">
            {[
              { label: 'Sobre a Profissional', href: '#sobre' },
              { label: 'Procedimentos', href: '#procedimentos' },
              { label: 'Higiene & Equipamentos', href: '#tecnologia' },
              { label: 'Dúvidas Frequentes', href: '#faq' },
            ].map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${idx * 0.05 + 0.1}s` : '0s',
                }}
                className={`py-5 border-b border-surface-border/60 text-[1.25rem] font-medium tracking-wide text-on-surface hover:text-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Link direto de dúvidas no WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dúvidas no WhatsApp (abre em uma nova aba)"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transitionDelay: isMobileMenuOpen ? '0.3s' : '0s',
              }}
              className={`py-5 border-b border-surface-border/60 text-[1.25rem] font-medium tracking-wide text-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <span>Dúvidas no WhatsApp</span>
              <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
            </a>

            {/* Ação de Agendamento Mobile */}
            <div
              className={`mt-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? '0.35s' : '0s',
              }}
            >
              <a
                href="#procedimentos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full min-h-[52px] px-6 py-4 rounded-full bg-accent text-on-accent text-sm uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer shadow-lg shadow-accent/20"
              >
                Agendar Horário
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
