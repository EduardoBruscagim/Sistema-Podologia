import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

mm.add(
  {
    isMotionOk: '(prefers-reduced-motion: no-preference)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { isMotionOk } = context.conditions!

    const headerEl = document.querySelector('header')
    const floatingNav = document.querySelector('header nav') as HTMLElement | null

    // Acessibilidade WCAG AAA: Usuários com preferência por movimento reduzido (vestibular disorders)
    if (!isMotionOk) {
      if (headerEl && floatingNav) {
        headerEl.removeAttribute('inert')
        headerEl.style.visibility = 'visible'
        floatingNav.style.pointerEvents = 'auto'
        gsap.set(floatingNav, { yPercent: 0 })
      }

      gsap.set(
        [
          '.gsap-hero-reveal',
          '.gsap-hero-image',
          '.hero-slot',
          '.bento-header',
          '.bento-card',
          '.bento-icon',
          '.cta-reveal',
        ],
        {
          autoAlpha: 1,
          clearProps: 'transform,scale',
        },
      )
      return
    }

    // --- 1. Orquestração da Hero Section com Timeline Unificada ---
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    })

    // Cascata de tipografia do Hero (Título, Descrição, Botão de Agendamento)
    heroTl.fromTo(
      '.gsap-hero-reveal',
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.12,
        clearProps: 'transform',
      },
    )

    // Entrada suave do Mockup da Agenda com leve sobreposição
    heroTl.fromTo(
      '.gsap-hero-image',
      { y: 36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        clearProps: 'transform',
      },
      '-=0.45',
    )

    // Cascata dos slots de agendamento no mockup com micro-pop orgânico
    heroTl.fromTo(
      '.hero-slot',
      { scale: 0.75, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: 'back.out(1.6)',
        clearProps: 'scale,transform',
      },
      '-=0.35',
    )

    // Efeito de levitação ambiente contínua do Mockup (60fps na GPU)
    gsap.to('.hero-levitation-wrapper', {
      y: -8,
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // --- 2. Bento Grid: Revelação Cascata Orgânica com ScrollTrigger ---
    const bentoTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.bento-header',
        start: 'top 85%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })

    // Cabeçalho do Bento Grid
    bentoTl.fromTo(
      '.bento-header',
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        clearProps: 'transform',
      },
    )

    // Cascata fluida nos 3 Cards com micro-escala e autoAlpha
    bentoTl.fromTo(
      '.bento-card',
      {
        y: 36,
        scale: 0.96,
        autoAlpha: 0,
      },
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.12,
        clearProps: 'transform,scale',
      },
      '-=0.15',
    )

    // Micro-pop nos ícones acompanhando cada card
    bentoTl.fromTo(
      '.bento-icon',
      { scale: 0.6, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.35,
        ease: 'back.out(1.8)',
        stagger: 0.12,
        clearProps: 'transform,scale',
      },
      '<0.08',
    )

    // --- 3. CTA Final Entrance ---
    gsap.fromTo(
      '.cta-reveal',
      { y: 32, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.cta-reveal',
          start: 'top 85%',
          once: true,
        },
      },
    )

    // --- 4. Navbar Flutuante Inteligente (Acessível, sem lag, com Delta Threshold) ---
    if (headerEl && floatingNav) {
      const navAnim = gsap
        .fromTo(
          floatingNav,
          { yPercent: -150 },
          {
            yPercent: 0,
            duration: 0.32,
            ease: 'power3.out',
            paused: true,
            force3D: true,
            onReverseComplete: () => {
              headerEl.setAttribute('inert', '')
              headerEl.style.visibility = 'hidden'
              floatingNav.style.pointerEvents = 'none'
            },
          },
        )
        .progress(1) // Começa no estado visível

      const showNavbar = () => {
        headerEl.removeAttribute('inert')
        headerEl.style.visibility = 'visible'
        floatingNav.style.pointerEvents = 'auto'
        navAnim.play()
      }

      const hideNavbar = () => {
        navAnim.reverse()
      }

      let lastScrollY = window.scrollY || 0

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          const scrollY = self.scroll()
          const direction = self.direction
          const delta = Math.abs(scrollY - lastScrollY)

          // Próximo ao topo da página (Hero), a barra sempre fica visível
          if (scrollY < 80) {
            showNavbar()
            lastScrollY = scrollY
            return
          }

          // Ignora micro-movimentos e trepidações de trackpad/touch (< 10px)
          if (delta < 10) {
            return
          }

          // Rolando para baixo após o limiar -> recolhe suavemente
          if (direction === 1 && scrollY > 120) {
            hideNavbar()
          }
          // Rolando para cima com intenção de leitura -> revela suavemente
          else if (direction === -1) {
            showNavbar()
          }

          lastScrollY = scrollY
        },
      })
    }
  },
)

// Gerenciamento do Alternador de Tema com Acessibilidade Rigorosa
const themeToggleBtn = document.getElementById('theme-toggle')

const updateThemeColorMeta = (isDark: boolean) => {
  let metaThemeColor = document.querySelector('meta[name="theme-color"]:not([media])')
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta')
    metaThemeColor.setAttribute('name', 'theme-color')
    document.head.appendChild(metaThemeColor)
  }
  metaThemeColor.setAttribute('content', isDark ? '#020617' : '#ffffff')
}

if (themeToggleBtn) {
  const isInitiallyDark = document.documentElement.classList.contains('dark')

  const applyThemeState = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      themeToggleBtn.setAttribute('aria-pressed', 'true')
      themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro')
      themeToggleBtn.setAttribute('title', 'Ativar modo claro')
      localStorage.setItem('theme', 'dark')
      updateThemeColorMeta(true)
    } else {
      document.documentElement.classList.remove('dark')
      themeToggleBtn.setAttribute('aria-pressed', 'false')
      themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro')
      themeToggleBtn.setAttribute('title', 'Ativar modo escuro')
      localStorage.setItem('theme', 'light')
      updateThemeColorMeta(false)
    }
  }

  // Inicializa o estado de acessibilidade do botão baseado no estado já aplicado no <head>
  applyThemeState(isInitiallyDark)

  // Alterna o tema no clique
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    applyThemeState(!isCurrentlyDark)
  })
}
