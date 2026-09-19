import gsap from 'gsap'

/**
 * Animações da seção Hero.
 * - Carregamento imediato: sem animação de entrada com fade/slide para não atrasar o LCP nem causar atraso visual inicial.
 * - Scroll parallax: leve efeito de profundidade na imagem principal estritamente ativado pela rolagem do usuário.
 */
export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  if (!heroSectionEl) return () => {}

  const ctx = gsap.context(() => {
    // Parallax suave na imagem da maleta exclusivo durante a rolagem (scrub 1.0)
    gsap.to('.gsap-hero-image', {
      scrollTrigger: {
        trigger: heroSectionEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.0,
      },
      yPercent: 4,
      ease: 'none',
    })
  }, heroSectionEl)

  return () => {
    ctx.revert()
  }
}
