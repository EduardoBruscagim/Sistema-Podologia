import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initTechnologyAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho da seção
    gsap.fromTo(
      '.tech-header',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-header',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
    )

    // Cartões de tecnologia (Luz Vermelha / Luz Ultravioleta)
    gsap.fromTo(
      '.tech-card',
      { y: 28, opacity: 0, scale: 0.98 },
      {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      },
    )

    // Card destacado de Biossegurança Padrão Hospitalar
    gsap.fromTo(
      '.tech-featured',
      { y: 24, opacity: 0, scale: 0.99 },
      {
        scrollTrigger: {
          trigger: '.tech-featured',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
      },
    )
  }, sectionEl)

  // Hover refinado nos cards de tecnologia e no banner de biossegurança
  const cards = sectionEl.querySelectorAll<HTMLElement>('.tech-card')
  const cleanupCardHover = initCardsHover(cards, {
    y: -5,
    scale: 1.012,
    duration: 0.32,
    iconSelector: '.tech-icon',
    iconY: -2,
    iconScale: 1.05,
  })

  const featured = sectionEl.querySelectorAll<HTMLElement>('.tech-featured')
  const cleanupFeaturedHover = initCardsHover(featured, {
    y: -4,
    scale: 1.008,
    duration: 0.35,
    iconSelector: '.featured-icon',
    iconY: -2,
    iconScale: 1.05,
  })

  return () => {
    cleanupCardHover()
    cleanupFeaturedHover()
    ctx.revert()
  }
}
