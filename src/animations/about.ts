import gsap from 'gsap'
import { initCardsHover } from './cardHover'

/**
 * Animação de entrada da seção Sobre a Profissional (AboutSection).
 *
 * Aplica elevação com fade nos elementos `.about-reveal` (card de credenciais e narrativa),
 * ativada via ScrollTrigger quando a seção atinge 85% do topo da janela de visualização.
 *
 * @param containerEl - Elemento raiz da seção `<section id="sobre">`.
 * @returns Função de reversão do contexto GSAP para desmontagem limpa.
 */

export const initAboutAnimation = (containerEl?: HTMLElement): (() => void) => {
  if (!containerEl) return () => {}

  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.about-reveal',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )
  }, containerEl)

  // Vincula hover refinado no card de credenciais
  const cards = containerEl.querySelectorAll<HTMLElement>('.about-card')
  const cleanupHover = initCardsHover(cards, {
    y: -4,
    duration: 0.28,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
