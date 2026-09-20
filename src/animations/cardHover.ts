import gsap from 'gsap'

interface CardHoverOptions {
  y?: number
  duration?: number
  iconSelector?: string
  iconY?: number
  iconScale?: number
}

/**
 * Ativa micro-interações de hover refinadas e fluidas em elementos de card.
 * Apenas ativa em ponteiros precisos (mouse/desktop) para evitar estados travados no touch.
 *
 * Performance:
 * - Somente translateY no card: evita text reflow/blur causado por scale em container com texto
 * - Scale permitido apenas no icon (elemento pequeno sem texto)
 * - force3D: true ativado apenas durante o tween (GSAP promove/despromove a layer)
 * - overwrite: 'auto' cancela tweens conflitantes sem flicker
 */
export const initCardsHover = (
  cards: HTMLElement[] | NodeListOf<HTMLElement>,
  options: CardHoverOptions = {},
): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  // Não ativa hover em dispositivos touch sem ponteiro fino
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isFinePointer || prefersReduced) {
    return () => {}
  }

  const { y = -5, duration = 0.3, iconSelector, iconY = -2, iconScale = 1.05 } = options

  const cleanups: (() => void)[] = []

  cards.forEach((card) => {
    const iconEl = iconSelector ? card.querySelector<HTMLElement>(iconSelector) : null

    const handleMouseEnter = () => {
      // Apenas translateY no card — sem scale para evitar text reflow
      gsap.to(card, {
        y,
        force3D: true,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      if (iconEl) {
        gsap.to(iconEl, {
          y: iconY,
          scale: iconScale,
          force3D: true,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        force3D: true,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      if (iconEl) {
        gsap.to(iconEl, {
          y: 0,
          scale: 1,
          force3D: true,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    cleanups.push(() => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(card)
      if (iconEl) gsap.killTweensOf(iconEl)
      gsap.set(card, { clearProps: 'transform' })
      if (iconEl) gsap.set(iconEl, { clearProps: 'transform' })
    })
  })

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}
