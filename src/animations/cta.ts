import gsap from 'gsap'

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
