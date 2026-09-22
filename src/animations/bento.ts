import gsap from 'gsap'
import { initCardsHover } from './cardHover'

/**
 * Animação de entrada e microinterações de hover para a seção Bento Grid.
 *
 * ### Fluxo:
 * 1. Animação de entrada do cabeçalho da seção com elevação sutil e fade.
 * 2. Cascata escalonada (`stagger: 0.1`) nos cards do Bento com `clearProps: 'transform,opacity'`.
 * 3. Inicialização das microinterações de hover nos cards (`initCardsHover`) com deslocamento
 *    de `-4px` e microescala de `1.06` no ícone interno.
 *
 * @param containerEl - Elemento raiz da seção `<section>`.
 * @returns Função de cleanup que cancela hovers e reverte o contexto GSAP.
 */

export const initBentoAnimation = (containerEl?: HTMLElement): (() => void) => {
  if (!containerEl) return () => {}

  const ctx = gsap.context(() => {
    // Cabeçalho da seção Bento
    gsap.fromTo(
      '.bento-header',
      { y: 16, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bento-header',
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

    // Cascata dos cards da grade
    gsap.fromTo(
      '.bento-card',
      { y: 22, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bento-grid',
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
  }, containerEl)

  // Vincula hover refinado nos cards da seção
  const cards = containerEl.querySelectorAll<HTMLElement>('.bento-card')
  const cleanupHover = initCardsHover(cards, {
    y: -4,
    duration: 0.28,
    iconSelector: '.bento-icon',
    iconY: -2,
    iconScale: 1.06,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
