import { useEffect, type RefObject } from 'react'

export type AnimationInitFn = (element: HTMLElement) => (() => void) | void
export type AnimationLoader = () => Promise<AnimationInitFn>

/**
 * Hook reutilizável e de altíssima performance para animações em seções:
 *
 * 1. Zero impacto no carregamento inicial / FCP / LCP:
 *    - Carrega a animação (e a biblioteca GSAP) via dynamic import de forma preguiçosa (lazy).
 *    - Remove completamente o GSAP do bundle crítico de hidratação.
 * 2. Prevenção de Forced Reflow / Layout Thrashing:
 *    - Não executa medições síncronas de geometria durante a hidratação do React.
 *    - Aguarda o navegador estar ocioso (requestIdleCallback) ou a primeira interação do usuário.
 * 3. Acessibilidade nativa:
 *    - Se 'prefers-reduced-motion: reduce' estiver ativo, não carrega nem executa o GSAP.
 *    - Todo o conteúdo HTML estático pré-renderizado já se encontra 100% visível e acessível.
 */
export const useSectionAnimation = (
  scopeRef: RefObject<HTMLElement | null>,
  loadAnimation: AnimationLoader,
): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Se o usuário prefere movimento reduzido, não carrega nem executa GSAP
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let isCancelled = false
    let cleanupAnimation: (() => void) | void
    let idleId: number | undefined
    let timerId: ReturnType<typeof setTimeout> | undefined

    const runAnimation = () => {
      if (isCancelled) return
      const el = scopeRef.current
      if (!el) return

      loadAnimation()
        .then((initFn) => {
          if (isCancelled || !scopeRef.current) return
          cleanupAnimation = initFn(scopeRef.current)
        })
        .catch((err) => {
          console.error('Falha ao carregar animação da seção:', err)
        })
    }

    const cleanupTriggers = () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
        idleId = undefined
      }
      if (timerId) {
        clearTimeout(timerId)
        timerId = undefined
      }
      window.removeEventListener('scroll', onTrigger)
      window.removeEventListener('touchstart', onTrigger)
      window.removeEventListener('mousemove', onTrigger)
    }

    const onTrigger = () => {
      cleanupTriggers()
      runAnimation()
    }

    // Interações do usuário ativam a inicialização imediatamente
    window.addEventListener('scroll', onTrigger, { passive: true, once: true })
    window.addEventListener('touchstart', onTrigger, { passive: true, once: true })
    window.addEventListener('mousemove', onTrigger, { passive: true, once: true })

    // Se não houver interação prévia, agenda para a ociosidade do navegador
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(onTrigger, { timeout: 1500 })
    } else {
      timerId = setTimeout(onTrigger, 1000)
    }

    return () => {
      isCancelled = true
      cleanupTriggers()
      if (cleanupAnimation) {
        cleanupAnimation()
      }
    }
  }, [loadAnimation, scopeRef])
}
