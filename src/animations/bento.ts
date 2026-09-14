import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initBentoAnimation = (containerEl?: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.bento-header',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bento-header',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
    )

    gsap.fromTo(
      '.bento-card',
      { y: 28, opacity: 0, scale: 0.98 },
      {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
      },
    )
  }, containerEl)

  let cleanupHover: (() => void) | undefined
  if (containerEl) {
    const cards = containerEl.querySelectorAll<HTMLElement>('.bento-card')
    cleanupHover = initCardsHover(cards, {
      y: -5,
      scale: 1.012,
      duration: 0.32,
      iconSelector: '.bento-icon',
      iconY: -2,
      iconScale: 1.05,
    })
  }

  return () => {
    cleanupHover?.()
    ctx.revert()
  }
}
