import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    })

    // Cascata de tipografia do Hero (Título, Descrição, Ações)
    heroTl.fromTo(
      '.gsap-hero-reveal',
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.12,
        clearProps: 'opacity,visibility',
      },
    )

    // Entrada suave do Card de Imagem do Kit Profissional (sem clearProps em transform para preservar ScrollTrigger parallax)
    heroTl.fromTo(
      '.gsap-hero-image',
      { y: 32, autoAlpha: 0, scale: 0.98 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        clearProps: 'opacity,visibility',
      },
      '-=0.45',
    )

    // Sutil efeito de profundidade/parallax orgânico ao rolar a página para baixo
    if (heroSectionEl) {
      gsap.to('.gsap-hero-image', {
        scrollTrigger: {
          trigger: heroSectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        yPercent: 6,
        ease: 'none',
      })
    }
  }, heroSectionEl)

  let cleanupHover: (() => void) | undefined
  if (heroSectionEl) {
    const heroCard = heroSectionEl.querySelectorAll<HTMLElement>('.gsap-hero-image > div')
    cleanupHover = initCardsHover(heroCard, {
      y: -4,
      scale: 1.008,
      duration: 0.35,
    })
  }

  return () => {
    cleanupHover?.()
    ctx.revert()
  }
}
