import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initFaqAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho do FAQ
    gsap.fromTo(
      '.faq-header',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
    )

    // Cascata dos itens de perguntas e respostas
    gsap.fromTo(
      '.faq-item',
      { y: 18, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      },
    )
  }, sectionEl)

  // Hover sutil nos itens de FAQ (apenas leve elevação de 2px para feedback tátil)
  const items = sectionEl.querySelectorAll<HTMLElement>('.faq-item')
  const cleanupHover = initCardsHover(items, {
    y: -2,
    scale: 1.005,
    duration: 0.25,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
