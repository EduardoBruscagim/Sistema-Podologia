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
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Estatísticas e Credenciais"
      className="max-w-6xl mx-auto px-6 py-4 mb-14"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-surface-border dark:border-slate-800 shadow-2xs">
        {/* Bloco 1 */}
        <div className="stat-block flex flex-col p-3 border-b lg:border-b-0 border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <span className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            EXPERIÊNCIA CLÍNICA
          </span>
          <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
            Desde 2016
          </span>
          <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
            10 anos de dedicação à saúde dos pés
          </span>
        </div>

        {/* Bloco 2 */}
        <div className="stat-block flex flex-col p-3 border-b lg:border-b-0 lg:border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <span className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            TOTAL DE ATENDIMENTOS
          </span>
          <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            +20.000
          </span>
          <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
            Média de 10+ pacientes ao dia
          </span>
        </div>

        {/* Bloco 3 */}
        <div className="stat-block flex flex-col p-3 border-r border-surface-border dark:border-slate-800 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <span className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            BIOSSEGURANÇA
          </span>
          <span className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
            100%
          </span>
          <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 font-normal">
            Autoclave e descartáveis individuais
          </span>
        </div>

        {/* Bloco 4 */}
        <div className="stat-block flex flex-col p-3 last:border-0 rounded-2xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
          <span className="text-xs font-bold text-text-secondary dark:text-slate-400 tracking-wider uppercase mb-1">
            SATISFAÇÃO
          </span>
          <div className="flex items-center gap-1.5">
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
        </div>
      </div>
    </section>
  )
}
