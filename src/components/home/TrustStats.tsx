import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initStatsAnimation } from '@/animations/stats'
import { applyReducedMotion } from '@/animations/reducedMotion'

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
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-surface-border dark:border-slate-800 shadow-2xs">
        {/* Bloco 1 */}
        <div className="stat-block flex flex-col p-3 border-b lg:border-b-0 border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <dt className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            EXPERIÊNCIA CLÍNICA
          </dt>
          <dd className="m-0 flex flex-col">
            <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
              Desde 2016
            </span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              10 anos de dedicação à saúde dos pés
            </span>
          </dd>
        </div>

        {/* Bloco 2 */}
        <div className="stat-block flex flex-col p-3 border-b lg:border-b-0 lg:border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <dt className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            TOTAL DE ATENDIMENTOS
          </dt>
          <dd className="m-0 flex flex-col">
            <span
              className="text-3xl lg:text-4xl font-bold text-primary dark:text-sky-300 tracking-tight"
              aria-label="+3.500 Atendimentos"
            >
              +3.500
            </span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              Cuidado dedicado e exclusivo com hora marcada
            </span>
          </dd>
        </div>

        {/* Bloco 3 */}
        <div className="stat-block flex flex-col p-3 border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <dt className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            BIOSSEGURANÇA
          </dt>
          <dd className="m-0 flex flex-col">
            <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
              100%
            </span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              Autoclave e descartáveis individuais
            </span>
          </dd>
        </div>

        {/* Bloco 4 */}
        <div
          className="stat-block flex flex-col p-3 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
          aria-label="Avaliação 5.0 de 5 estrelas"
        >
          <dt className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            SATISFAÇÃO
          </dt>
          <dd className="m-0 flex flex-col">
            <div className="flex items-center gap-1.5" aria-label="Avaliação 5.0 de 5 estrelas">
              <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
                5.0
              </span>
              <span aria-hidden="true" className="text-amber-500 text-2xl font-bold">
                ★
              </span>
            </div>
            <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
              Excelência aprovada pelos pacientes
            </span>
          </dd>
        </div>
      </dl>
    </section>
  )
}
