import gsap from 'gsap'

export const initCtaAnimation = (): (() => void) => {
  const tween = gsap.fromTo(
    '.cta-reveal',
    { y: 32, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.75,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: '.cta-reveal',
        start: 'top 85%',
        once: true,
      },
    },
  )

  return () => {
    if (tween.scrollTrigger) {
      tween.scrollTrigger.kill()
    }
    tween.kill()
  }
}
