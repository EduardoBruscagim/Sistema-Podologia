import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initTechnologyAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho da seção
    gsap.fromTo(
      '.tech-header',
      { y: 16, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-header',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )

    // Card destacado de Biossegurança Padrão Hospitalar
    gsap.fromTo(
      '.tech-featured',
      { y: 22, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-featured',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )

    // Cartões de tecnologia (Luz Vermelha / Luz Ultravioleta)
    gsap.fromTo(
      '.tech-card',
      { y: 22, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }, sectionEl)

  // Hover refinado apenas nos cards interativos de tecnologia
  const cards = sectionEl.querySelectorAll<HTMLElement>('.tech-card')
  const cleanupCardHover = initCardsHover(cards, {
    y: -4,
    duration: 0.28,
    iconSelector: '.tech-icon',
    iconY: -2,
    iconScale: 1.08,
  })

  return () => {
    cleanupCardHover()
    ctx.revert()
  }
}
