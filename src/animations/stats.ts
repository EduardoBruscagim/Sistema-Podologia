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
      '.stat-reveal',
      { y: 12, autoAlpha: 0 },
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

    // Rollup numérico fluido de 0 a 25.000 com progressão rítmica visível
    const counterEl = containerEl.querySelector<HTMLElement>('.stat-counter-value')
    if (counterEl) {
      const counterProxy = { val: 0 }
      gsap.to(counterProxy, {
        val: 25000,
        duration: 2.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          counterEl.textContent = `+${Math.round(counterProxy.val).toLocaleString('pt-BR')}`
        },
        onComplete: () => {
          counterEl.textContent = '+25.000'
        },
      })
    }
  }, containerEl)

  return () => {
    ctx.revert()
  }
}
