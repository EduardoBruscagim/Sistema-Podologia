import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initBentoAnimation = (containerEl?: HTMLElement): (() => void) => {
  if (!containerEl) return () => {}

  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.bento-header',
      { y: 16, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bento-header',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )

    gsap.fromTo(
      '.bento-card',
      { y: 22, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    )
  }, containerEl)

  const cards = containerEl.querySelectorAll<HTMLElement>('.bento-card')
  const cleanupHover = initCardsHover(cards, {
    y: -4,
    duration: 0.28,
    iconSelector: '.bento-icon',
    iconY: -2,
    iconScale: 1.06,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
