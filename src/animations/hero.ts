import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initHeroAnimation = (heroSectionEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    const heroTl = gsap.timeline({
      defaults: { ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    })

    // Revelação tipográfica editorial suave (Título, Descrição, Ações)
    heroTl.fromTo(
      '.gsap-hero-reveal',
      { y: 12, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.08,
        clearProps: 'transform,opacity,visibility',
      },
    )

    // Entrada da fotografia da maleta com micro-ajuste focal (sem borrar fontes)
    heroTl.fromTo(
      '.gsap-hero-image',
      { y: 16, autoAlpha: 0, scale: 1.02 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.85,
        clearProps: 'opacity,visibility',
      },
      '-=0.45',
    )

    // Parallax contido e silencioso durante a rolagem
    if (heroSectionEl) {
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
    }
  }, heroSectionEl)

  let cleanupHover: (() => void) | undefined
  if (heroSectionEl) {
    const heroCard = heroSectionEl.querySelectorAll<HTMLElement>('.gsap-hero-image > div')
    cleanupHover = initCardsHover(heroCard, {
      y: -2,
      duration: 0.3,
    })
  }

  return () => {
    cleanupHover?.()
    ctx.revert()
  }
}
