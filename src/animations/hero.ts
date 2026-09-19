import gsap from 'gsap'

/**
 * Animações da seção Hero.
 * - Entrada ultra-clean e ágil (estilo Apple / Linear):
 *   Micro-deslocamento (y: 14px), duração enxuta (450ms) e aceleração natural (power3.out),
 *   sem atraso inicial e com cascata rápida (stagger: 0.05s) para renderização a 60fps sem lentidão.
 * - clearProps completo ao término para manter tipografia nítida e layout nativo.
 * - Scroll parallax sutil na imagem principal durante a rolagem.
 */
export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  if (!heroSectionEl) return () => {}

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    })

    // Textos e CTAs: micro-deslocamento vertical e fade limpo
    tl.fromTo(
      ['.gsap-hero-badge', '.gsap-hero-title', '.gsap-hero-desc', '.gsap-hero-actions'],
      {
        autoAlpha: 0,
        y: 14,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.46,
        stagger: 0.05,
        clearProps: 'transform,opacity,visibility',
      },
    )

    // Card da imagem principal: entra com sobreposição ágil (-0.3s)
    tl.fromTo(
      '.gsap-hero-image-card',
      {
        autoAlpha: 0,
        y: 16,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        clearProps: 'opacity,visibility', // mantemos transform livre para o parallax
      },
      '-=0.3',
    )

    // Card flutuante de biossegurança
    tl.fromTo(
      '.gsap-hero-preview',
      {
        autoAlpha: 0,
        y: 12,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        clearProps: 'transform,opacity,visibility',
      },
      '-=0.25',
    )

    // Parallax suave na imagem durante a rolagem (scrub 1.0)
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
