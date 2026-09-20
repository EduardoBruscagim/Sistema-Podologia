import gsap from 'gsap'

/**
 * Animações da seção Hero.
 * - Carregamento imediato: sem animação de entrada com fade/slide para não atrasar o LCP nem causar atraso visual inicial.
 * - Scroll parallax: leve efeito de profundidade na imagem principal estritamente ativado pela rolagem do usuário.
 */
export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  if (!heroSectionEl) return () => {}

  const ctx = gsap.context(() => {
    // Parallax suave na imagem da maleta a partir do primeiro scroll
    gsap.to('.gsap-hero-image', {
      scrollTrigger: {
        trigger: heroSectionEl,
        start: 'top 120px',
        end: 'bottom top',
        scrub: 1.0,
      },
      y: 35,
      ease: 'none',
    })

    // Parallax oposto pronunciado no badge flutuante de higiene (telas >= 640px)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 640px)', () => {
      gsap.to('.gsap-hero-badge', {
        scrollTrigger: {
          trigger: heroSectionEl,
          start: 'top 120px',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -30,
        ease: 'none',
      })
    })
  }, heroSectionEl)

  return () => {
    ctx.revert()
  }
}
