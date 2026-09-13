import gsap from 'gsap'

export const applyReducedMotion = (
  headerEl: HTMLElement | null,
  floatingNav: HTMLElement | null,
): void => {
  if (headerEl && floatingNav) {
    headerEl.removeAttribute('inert')
    headerEl.style.visibility = 'visible'
    floatingNav.style.pointerEvents = 'auto'
    gsap.set(floatingNav, { yPercent: 0 })
  }

  gsap.set(
    [
      '.gsap-hero-reveal',
      '.gsap-hero-image',
      '.hero-slot',
      '.bento-header',
      '.bento-card',
      '.bento-icon',
      '.cta-reveal',
    ],
    {
      autoAlpha: 1,
      clearProps: 'transform,scale',
    },
  )

  gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
}
