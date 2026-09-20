import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

interface MagneticOptions {
  maxDisplacement?: number
  strength?: number
}

/**
 * Hook para microinteração magnética tátil em botões de ação exclusivos para desktop.
 * - Ativado apenas em dispositivos com cursor de precisão ((hover: hover) and (pointer: fine)).
 * - Em telas touch/mobile, listeners não são criados (zero overhead de bateria ou CPU).
 * - Respeita prefers-reduced-motion.
 */
export function useMagneticButton(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {},
): void {
  const { maxDisplacement = 8, strength = 0.22 } = options

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    // Desativação estrita para touchscreens ou preferência por movimento reduzido
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isPointerFine || isReducedMotion) return

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rawDeltaX = (e.clientX - centerX) * strength
      const rawDeltaY = (e.clientY - centerY) * strength

      const deltaX = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawDeltaX))
      const deltaY = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawDeltaY))

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = (): void => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(el)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, maxDisplacement, strength])
}
