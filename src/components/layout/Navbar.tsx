import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from '@/hooks/useTheme'
import { initNavbarAnimation } from '@/animations/navbar'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Sun, Moon, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(useGSAP)

/**
 * Componente de Cabeçalho / Barra de Navegação Superior.
 *
 * ### Funcionalidades e Acessibilidade:
 * 1. **Efeito Scrolled Suave:** Transita para fundo translúcido (backdrop-blur) com borda capilar
 *    ao rolar a página mais de 20px via `initNavbarAnimation`.
 * 2. **Menu Mobile Acessível & Animação GSAP (Apple Standard):**
 *    - Timeline reversível via `@gsap/react` (`useGSAP`).
 *    - Transição fluida de hambúrguer para X com interpolação em timeline.
 *    - Desdobramento suave do menu e entrada em cascata (stagger) dos itens de navegação.
 *    - Bloqueio de rolagem do body quando aberto.
 *    - Aplicação do atributo `inert` nos elementos adjacentes (`main`, `footer`, `aside`)
 *      para evitar navegação por foco fora do menu aberto.
 *    - Trap de foco estrito com `Tab` e `Shift+Tab`.
 *    - Fechamento imediato com tecla `Escape` ou clique no backdrop.
 *    - Restauração automática de foco para o botão disparador ao fechar.
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

  const navbarRootRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const topLineRef = useRef<HTMLSpanElement | null>(null)
  const bottomLineRef = useRef<HTMLSpanElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
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

    const rafId = requestAnimationFrame(() => {
      if (isMobileMenuOpen) {
        mainEl?.setAttribute('inert', '')
        footerEl?.setAttribute('inert', '')
        asideEl?.setAttribute('inert', '')
      } else {
        mainEl?.removeAttribute('inert')
        footerEl?.removeAttribute('inert')
        asideEl?.removeAttribute('inert')
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = ''
      mainEl?.removeAttribute('inert')
      footerEl?.removeAttribute('inert')
      asideEl?.removeAttribute('inert')
    }
  }, [isMobileMenuOpen])

  // ---------------------------------------------------------------------------
  // 4. GSAP Reversible Timeline (Padrão Apple Snappy - Ultra Rápido & Fluido)
  // ---------------------------------------------------------------------------

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Configuração de estado inicial fechado
      gsap.set(mobileMenuRef.current, {
        autoAlpha: 0,
        y: prefersReducedMotion ? 0 : -14,
      })
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { autoAlpha: 0 })
      }
      gsap.set(topLineRef.current, { y: -3.5, rotate: 0 })
      gsap.set(bottomLineRef.current, { y: 3.5, rotate: 0 })
      gsap.set('.mobile-nav-item', {
        autoAlpha: 0,
        y: prefersReducedMotion ? 0 : -10,
      })

      if (prefersReducedMotion) {
        tlRef.current = gsap
          .timeline({ paused: true })
          .to(topLineRef.current, { rotate: 45, y: 0, duration: 0.1 }, 0)
          .to(bottomLineRef.current, { rotate: -45, y: 0, duration: 0.1 }, 0)
          .to([mobileMenuRef.current, backdropRef.current], { autoAlpha: 1, duration: 0.1 }, 0)
          .to('.mobile-nav-item', { autoAlpha: 1, duration: 0.08 }, 0.02)
        return
      }

      // Timeline mestre de altíssima velocidade e zero atrito (Padrão iOS/Apple)
      tlRef.current = gsap
        .timeline({ paused: true })
        // 1. Hambúrguer: transição instantânea e precisa para o X em 220ms
        .to(topLineRef.current, { y: 0, rotate: 45, duration: 0.22, ease: 'power2.out' }, 0)
        .to(bottomLineRef.current, { y: 0, rotate: -45, duration: 0.22, ease: 'power2.out' }, 0)
        // 2. Backdrop escurecido leve
        .to(backdropRef.current, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, 0)
        // 3. Painel do menu desce ágil com desaceleração exponencial em 240ms
        .to(mobileMenuRef.current, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0)
        // 4. Stagger ágil dos links (20ms por item)
        .to(
          '.mobile-nav-item',
          { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.02, ease: 'power2.out' },
          0.04,
        )
    },
    { scope: navbarRootRef },
  )

  // Disparo bidirecional (play/reverse) ao alternar o estado do menu
  useEffect(() => {
    if (!tlRef.current) return
    if (isMobileMenuOpen) {
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
    }
  }, [isMobileMenuOpen])

  // ---------------------------------------------------------------------------
  // 5. Auto-fechamento ao Redimensionar para Desktop (>= 1024px)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    try {
      const mql = window.matchMedia('(min-width: 1024px)')
      const handleResize = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setIsMobileMenuOpen(false)
          tlRef.current?.progress(0).pause()
        }
      }
      mql.addEventListener('change', handleResize)
      return () => mql.removeEventListener('change', handleResize)
    } catch {
      // MatchMedia indisponível no ambiente de teste/SSR
    }
  }, [])

  // ---------------------------------------------------------------------------
  // 6. Gerenciamento e Restauração de Foco
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
    <div ref={navbarRootRef}>
      {/* Backdrop Mobile para fechar ao clicar fora */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-primary/40 lg:hidden pointer-events-auto z-40"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Header Fixo Superior (z-50) */}
      <header
        ref={headerRef}
        data-mobile-menu-open={isMobileMenuOpen}
        className={`fixed top-0 inset-x-0 w-full z-50 pointer-events-auto transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          isMobileMenuOpen
            ? 'bg-surface/98 dark:bg-[#11100f]/98 backdrop-blur-2xl border-surface-border'
            : 'border-transparent [&.is-scrolled]:bg-surface/90 [&.is-scrolled]:backdrop-blur-md [&.is-scrolled]:border-surface-border'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
          {/* Lado Esquerdo: Hambúrguer Mobile + Logotipo Editorial */}
          <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
            {/* Botão Hambúrguer Mobile/Tablet Premium (Estilo Apple com GSAP) */}
            <div className="lg:hidden flex items-center shrink-0">
              <button
                ref={mobileToggleRef}
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="touch-manipulation relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-text-secondary hover:text-accent dark:hover:text-accent hover:bg-surface-variant transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer z-50"
                aria-label={
                  isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-[18px] h-[18px] relative flex items-center justify-center pointer-events-none">
                  <span
                    ref={topLineRef}
                    className="absolute h-[1.2px] w-[16px] bg-current rounded-full origin-center will-change-transform"
                  />
                  <span
                    ref={bottomLineRef}
                    className="absolute h-[1.2px] w-[16px] bg-current rounded-full origin-center will-change-transform"
                  />
                </div>
              </button>
            </div>

            {/* Logotipo Tipográfico Editorial */}
            <a
              href="/"
              className="flex flex-col justify-center min-h-[44px] text-left py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg select-none group min-w-0"
            >
              <span className="font-serif text-sm sm:text-base lg:text-lg font-medium tracking-[0.06em] sm:tracking-[0.10em] uppercase text-on-surface group-hover:text-accent transition-colors leading-none whitespace-nowrap truncate">
                Angélica Bruscagim
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
            {/* Alternador de Tema com Microinteração Fluida (Tailwind transitions) */}
            <button
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              aria-pressed={isDark}
              onClick={handleToggleTheme}
              className="touch-manipulation relative min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center rounded-md text-text-secondary hover:text-accent dark:hover:text-accent hover:bg-surface-variant transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer overflow-hidden"
              type="button"
            >
              <span className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
                {/* Ícone da Lua (visível no modo claro, gira e encolhe ao ir para escuro) */}
                <Moon
                  aria-hidden="true"
                  className={`w-4 h-4 absolute transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isDark
                      ? 'opacity-0 scale-50 rotate-90 pointer-events-none'
                      : 'opacity-100 scale-100 rotate-0 text-current'
                  }`}
                />
                {/* Ícone do Sol (visível no modo escuro, gira e expande ao ativar) */}
                <Sun
                  aria-hidden="true"
                  className={`w-4 h-4 absolute transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isDark
                      ? 'opacity-100 scale-100 rotate-0 text-current'
                      : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
                  }`}
                />
              </span>
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
      </header>

      {/* Menu Mobile/Tablet Fullscreen Overlay (Estilo Apple com GSAP) - z-40 */}
      <nav
        ref={mobileMenuRef}
        id="mobile-menu"
        aria-label="Menu móvel"
        aria-hidden={!isMobileMenuOpen}
        className="fixed inset-0 lg:hidden z-40 flex flex-col bg-surface dark:bg-[#11100f] overflow-hidden pointer-events-auto"
      >
        {/* Espaçador da altura exata do header */}
        <div className="h-18 sm:h-20 shrink-0" aria-hidden="true" />

        {/* Conteúdo com rolagem fluida e sem corte */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between max-w-sm mx-auto w-full">
          <div className="flex flex-col">
            {[
              { label: 'Sobre a Profissional', href: '#sobre' },
              { label: 'Procedimentos', href: '#procedimentos' },
              { label: 'Higiene & Equipamentos', href: '#tecnologia' },
              { label: 'Dúvidas Frequentes', href: '#faq' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-item py-4 sm:py-5 border-b border-surface-border/60 text-[1.375rem] font-medium tracking-tight text-on-surface hover:text-accent transition-colors flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent will-change-transform"
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
              className="mobile-nav-item py-4 sm:py-5 border-b border-surface-border/60 text-[1.375rem] font-medium tracking-tight text-accent transition-colors flex items-center justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent will-change-transform"
            >
              <span>Dúvidas no WhatsApp</span>
              <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
            </a>
          </div>

          {/* Ação de Agendamento Mobile */}
          <div className="mobile-nav-item mt-8 pb-10 will-change-transform">
            <a
              href="#procedimentos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full min-h-[52px] px-6 py-4 rounded-full bg-accent text-on-accent text-[13px] uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer shadow-lg shadow-accent/20"
            >
              Agendar Horário
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
