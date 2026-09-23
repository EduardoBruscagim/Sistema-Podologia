import gsap from 'gsap'

/**
 * Opções de customização da microinteração de hover em cards.
 */

interface CardHoverOptions {
  /** Deslocamento vertical em pixels do card no hover (padrão: -5px). */
  y?: number
  /** Duração da transição do tween em segundos (padrão: 0.3s). */
  duration?: number
  /** Seletor CSS do elemento de ícone interno para animação síncrona. */
  iconSelector?: string
  /** Deslocamento vertical adicional no ícone interno (padrão: -2px). */
  iconY?: number
  /** Fator de escala aplicado exclusivamente ao ícone interno (padrão: 1.05). */
  iconScale?: number
}

/**
 * Ativa microinterações de hover refinadas e fluidas em elementos de card.
 *
 * ### Decisões Críticas de Performance e UX:
 * 1. **Filtro de Ponteiro Fino (`pointer: fine`):**
 *    Executa apenas em dispositivos desktop com mouse/trackpad. Não é ativado em telas de toque (touch),
 *    evitando o clássico problema de "hover travado" após o tap no smartphone.
 * 2. **Prevenção de Text Blurry / Reflow:**
 *    Aplica exclusivamente `translateY` no card — **nunca `scale`** no container pai com texto,
 *    pois `scale` em elementos com tipografia causa borrões subpixel e recalculação de layout nos motores Chromium/WebKit.
 * 3. **Escala Segura em Ícones:**
 *    O `scale` é restrito ao ícone gráfico interno (`iconEl`), onde não afeta a nitidez das fontes.
 * 4. **Hardware Acceleration Sob Demanda:**
 *    O GSAP gerencia a promoção de camada (`force3D: true`) durante a transição e despromove ao concluir.
 * 5. **Ciclo de Vida Limpo:**
 *    Retorna uma função de cleanup que remove todos os event listeners, cancela tweens ativos
 *    e restaura as propriedades CSS para seus valores padrão.
 *
 * @param cards - Lista ou array de elementos DOM a receberem a microinteração.
 * @param options - Parâmetros opcionais de animação e seletores internos.
 * @returns Função de limpeza que desvincula listeners e remove tweens do GSAP.
 */

export const initCardsHover = (
  cards: HTMLElement[] | NodeListOf<HTMLElement>,
  options: CardHoverOptions = {},
): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  // Permite ativação do hover em mobile via touchstart/touchend, exceto se usuário tiver preferência de movimento reduzido
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
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
    card.addEventListener('touchstart', handleMouseEnter, { passive: true })
    card.addEventListener('touchend', handleMouseLeave)
    card.addEventListener('touchcancel', handleMouseLeave)

    cleanups.push(() => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('touchstart', handleMouseEnter)
      card.removeEventListener('touchend', handleMouseLeave)
      card.removeEventListener('touchcancel', handleMouseLeave)
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
