import gsap from 'gsap'

/**
 * Animação editorial suave para os blocos de estatísticas e confiança.
 * - Easing nativo GSAP power2.out (substitui cubic-bezier inválido).
 * - Sem hover-lift em dados não clicáveis.
 * - clearProps garante restauração completa de estilos inline após a revelação.
 */
export const initStatsAnimation = (containerEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.stat-block',
      { y: 14, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }, containerEl)

  return () => {
    ctx.revert()
  }
}
