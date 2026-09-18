import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initStatsAnimation = (containerEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Revelação suave em cascata dos blocos de estatísticas ao rolar
    gsap.fromTo(
      '.stat-block',
      { y: 12, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 90%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }, containerEl)

  // Micro-hover sutil nos blocos de métricas
  const blocks = containerEl.querySelectorAll<HTMLElement>('.stat-block')
  const cleanupHover = initCardsHover(blocks, {
    y: -2,
    duration: 0.25,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
