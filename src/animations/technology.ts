import gsap from 'gsap'
import { initCardsHover } from './cardHover'

/**
 * Animação de entrada e microinterações de hover para a seção de Higiene e Equipamentos (TechnologySection).
 *
 * ### Estrutura de Animação:
 * 1. Revelação suave do cabeçalho da seção (`.tech-header`).
 * 2. Entrada do card de destaque de biossegurança e autoclave hospitalar (`.tech-featured`).
 * 3. Entrada escalonada dos cards de tecnologia secundários (`.tech-card`).
 * 4. Ativação de microinterações de hover exclusivamente nos cards secundários clicáveis/interativos.
 *
 * @param sectionEl - Elemento raiz da seção `<section id="tecnologia">`.
 * @returns Função de cleanup para remoção de hovers e reversão do contexto GSAP.
 */
export const initTechnologyAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho da seção
    gsap.fromTo(
      '.tech-header',
      { y: 16, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-header',
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

    // Card destacado de Biossegurança Padrão Hospitalar
    gsap.fromTo(
      '.tech-featured',
      { y: 22, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-featured',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )

    // Cartões de tecnologia (Luz Vermelha / Cabine UV)
    gsap.fromTo(
      '.tech-card',
      { y: 22, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.tech-grid',
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
