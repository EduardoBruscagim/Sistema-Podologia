import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initServicesAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho da seção
    gsap.fromTo(
      '.services-header',
      { y: 16, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )

    // Cascata dos 3 cards de procedimentos (sem scale para manter fontes perfeitamente nítidas)
    gsap.fromTo(
      '.service-card',
      { y: 24, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )

    // Faixa informativa inferior (Mococa / PIX)
    gsap.fromTo(
      '.services-footer',
      { y: 14, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'bottom 90%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )
  }, sectionEl)

  // Efeito de hover fluido e suave nos cards de serviço
  const cards = sectionEl.querySelectorAll<HTMLElement>('.service-card')
  const cleanupHover = initCardsHover(cards, {
    y: -4,
    duration: 0.28,
    iconSelector: '.service-icon',
    iconY: -2,
    iconScale: 1.08,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
