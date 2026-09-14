import { applyReducedMotion } from '@/animations/reducedMotion'
import { initStatsAnimation } from '@/animations/stats'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

export const TrustStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
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
            applyReducedMotion('.stat-block')
            return
          }

          return initStatsAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-stats-heading"
      className="max-w-6xl mx-auto px-6 py-4 mb-14"
    >
      <h2 id="trust-stats-heading" className="sr-only">
        Estatísticas e Credenciais
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-surface-border dark:border-slate-800 shadow-2xs">
        {/* Bloco 1 */}
        <div className="stat-block flex flex-col p-4 border-b sm:border-b-0 sm:border-r border-surface-border dark:border-slate-800 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <dt className="text-xs font-semibold text-text-secondary dark:text-slate-400 mb-1">
            Experiência
          </dt>
          <dd className="m-0 flex flex-col">
            <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight tabular-nums">
              Desde 2016
            </span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              Atendendo em Mococa
            </span>
          </dd>
        </div>

        {/* Bloco 2 */}
        <div className="stat-block flex flex-col p-4 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <dt className="text-xs font-semibold text-text-secondary dark:text-slate-400 mb-1">
            Atendimentos
          </dt>
          <dd className="m-0 flex flex-col">
            <span
              className="text-3xl lg:text-4xl font-bold text-primary dark:text-sky-300 tracking-tight tabular-nums"
              aria-label="Mais de 25.000 atendimentos"
            >
              +25.000
            </span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              Realizados com a dedicação de uma única especialista
            </span>
          </dd>
        </div>
      </dl>
    </section>
  )
}
