import gsap from 'gsap'

export const initAboutAnimation = (containerEl?: HTMLElement): (() => void) => {
  if (!containerEl) return () => {}

  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.about-reveal',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )
  }, containerEl)

  return () => {
    ctx.revert()
  }
}
