import gsap from 'gsap'

/**
 * Animação de revelação da seção de Chamada para Ação Final (CtaSection).
 *
 * Aplica elevação com fade no bloco de conversão final (`.cta-reveal`),
 * ativada quando o elemento entra na zona de 85% da viewport.
 *
 * @param sectionEl - Elemento raiz da seção `<section>`.
 * @returns Função de reversão do contexto GSAP.
 */

export const initCtaAnimation = (sectionEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.cta-reveal',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.cta-reveal',
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
  }, sectionEl)

  return () => {
    ctx.revert()
  }
}
