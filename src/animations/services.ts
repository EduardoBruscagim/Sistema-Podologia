import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initServicesAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho da seção
    gsap.fromTo(
      '.services-header',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
    )

    // Cascata dos 3 cards de procedimentos
    gsap.fromTo(
      '.service-card',
      { y: 30, opacity: 0, scale: 0.98 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
      },
    )

    // Faixa informativa inferior (Mococa / PIX)
    gsap.fromTo(
      '.services-footer',
      { y: 16, opacity: 0 },
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
      },
    )
  }, sectionEl)

  // Efeito de hover fluido e suave nos cards
  const cards = sectionEl.querySelectorAll<HTMLElement>('.service-card')
  const cleanupHover = initCardsHover(cards, {
    y: -5,
    scale: 1.012,
    duration: 0.32,
    iconSelector: '.service-icon',
    iconY: -2,
    iconScale: 1.05,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
