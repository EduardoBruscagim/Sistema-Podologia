import type React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { applyReducedMotion } from '@/animations/reducedMotion'

/**
 * Hook utilitário reutilizável para inicializar animações GSAP / ScrollTrigger em seções.
 *
 * ### Características e Salvaguardas:
 * 1. **Acessibilidade Motora (WCAG 2.2 AAA):**
 *    Detecta `(prefers-reduced-motion: reduce)` via `gsap.matchMedia()`.
 *    Se o usuário solicitar movimento reduzido, aborta animações dinâmicas e aplica
 *    `applyReducedMotion` nos seletores fornecidos, garantindo opacidade total imediata
 *    e remoção de transforms/offsets.
 * 2. **Isolamento de Escopo:**
 *    Usa o hook oficial `@gsap/react` com `{ scope: scopeRef }`, garantindo que os seletores
 *    declarados na animação não vazem para outras seções ou componentes.
 * 3. **Gerenciamento Automático de Memória:**
 *    Garante a chamada de `mm.revert()` e limpeza de ScrollTriggers quando o componente
 *    for desmontado do DOM.
 *
 * @param scopeRef - Referência React ao elemento raiz da seção (`<section>`).
 * @param initAnimation - Função de fábrica que instancia tweens/ScrollTriggers no elemento DOM.
 * @param reducedMotionTargets - Seletor(es) ou elemento(s) que devem ter estilos inline limpos caso o movimento seja reduzido.
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

          // Se a preferência do usuário for movimento reduzido, apenas assegura visibilidade
          if (!isMotionOk) {
            if (reducedMotionTargets) {
              applyReducedMotion(reducedMotionTargets)
            }
            return
          }

          // Caso contrário, executa a animação interativa/scroll da seção
          return initAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: scopeRef },
  )
}
