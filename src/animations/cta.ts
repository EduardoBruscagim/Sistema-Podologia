import { gsap } from './config'

export const initCtaAnimation = (sectionEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.cta-reveal',
      { y: 20, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.cta-reveal',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }, sectionEl)

  return () => {
    ctx.revert()
  }
}
