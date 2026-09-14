import gsap from 'gsap'
import { initCardsHover } from './cardHover'

export const initStatsAnimation = (containerEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Revelação suave em cascata dos blocos de estatísticas ao rolar
    gsap.fromTo(
      '.stat-block',
      { y: 20, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 88%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
      },
    )
  }, containerEl)

  // Micro-hover sutil nos 4 blocos de métricas
  const blocks = containerEl.querySelectorAll<HTMLElement>('.stat-block')
  const cleanupHover = initCardsHover(blocks, {
    y: -3,
    scale: 1.01,
    duration: 0.28,
  })

  return () => {
    cleanupHover()
    ctx.revert()
  }
}
