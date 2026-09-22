import gsap from 'gsap'

/**
 * Animações de profundidade da seção Hero.
 *
 * ### Decisões de Engenharia e Performance:
 * 1. **Preservação de LCP:**
 *    Não utiliza animações de entrada (`fromTo` com fade/scale) no carregamento inicial,
 *    garantindo que o maior elemento visual com conteúdo (a imagem da maleta clínica)
 *    seja medido imediatamente pelo navegador sem atrasos.
 * 2. **Parallax Suave e Desacoplado:**
 *    - Imagem principal: Deslocamento vertical positivo (`y: 35`) suave durante o scroll.
 *    - Badge de higiene: Deslocamento oposto (`y: -30`) exclusivo para telas desktop (`min-width: 640px`),
 *      criando uma percepção refinada de camadas e profundidade visual sem afetar dispositivos móveis.
 *
 * @param heroSectionEl - Elemento raiz da seção Hero `<section id="inicio">`.
 * @returns Função de reversão do contexto GSAP para desmontagem segura.
 */
export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  if (!heroSectionEl) return () => {}

  const mm = gsap.matchMedia()
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
    mm.revert()
    ctx.revert()
  }
}
