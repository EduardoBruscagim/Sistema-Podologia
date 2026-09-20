import type React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { applyReducedMotion } from '@/animations/reducedMotion'

/**
 * Hook reutilizável para animações GSAP em seções, com suporte nativo e acessível a prefers-reduced-motion.
 *
 * - Configura matchMedia com detecção de movimento reduzido.
 * - Se o usuário preferir movimento reduzido, aplica autoAlpha: 1 e limpa transforms nos alvos.
 * - Caso contrário, invoca initAnimation vinculada ao elemento DOM da seção.
 * - Reverte e limpa automaticamente tweens e ScrollTriggers no unmount.
 */
export const useSectionAnimation = (
  scopeRef: React.RefObject<HTMLElement | null>,
  initAnimation: (element: HTMLElement) => (() => void) | void,
  reducedMotionTargets?: gsap.DOMTarget,
): void => {
  useGSAP(
    () => {
      const el = scopeRef.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(
        {
          isMotionOk: '(prefers-reduced-motion: no-preference)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMotionOk } = context.conditions!
          if (!isMotionOk) {
            if (reducedMotionTargets) {
              applyReducedMotion(reducedMotionTargets)
            }
            return
          }

          return initAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: scopeRef },
  )
}
