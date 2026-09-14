import gsap from 'gsap'

export const initCtaAnimation = (sectionEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    gsap.from('.cta-reveal', {
      scrollTrigger: {
        trigger: '.cta-reveal',
        start: 'top 88%',
        once: true,
      },
      y: 24,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    })
  }, sectionEl)

  return () => {
    ctx.revert()
  }
}
