import gsap from 'gsap'

/**
 * Animação editorial suave para os blocos de estatísticas e confiança (TrustStats).
 *
 * ### Efeitos e Algoritmos:
 * 1. **Revelação Sequencial (Stagger Reveal):**
 *    - Elevação sutil (`y: 12` -> `y: 0`) e opacidade com easing `power2.out`.
 *    - `clearProps: 'transform,opacity'` garante que o CSS da folha de estilos
 *      reassuma o controle total do layout após o término do tween.
 * 2. **Rollup Numérico com Proxy Intermediário:**
 *    - Utiliza um objeto proxy JS `{ val: 0 }` interpolando até 25.000 durante 2.4s.
 *    - No callback `onUpdate`, converte o valor para número inteiro formatado na localidade
 *      brasileira (`pt-BR`), resultando em `+25.000` estável com fonte tabular (`tabular-nums`).
 *    - `once: true` no ScrollTrigger evita re-execuções desnecessárias da contagem durante scrolls repetidos.
 *
 * @param containerEl - Elemento raiz da seção de estatísticas `<section>`.
 * @returns Função de reversão do contexto GSAP.
 */
export const initStatsAnimation = (containerEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Revelação suave em cascata dos blocos
    gsap.fromTo(
      '.stat-reveal',
      { y: 12, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )

    // Rollup numérico fluido de 0 a 25.000 com formatação regional
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
