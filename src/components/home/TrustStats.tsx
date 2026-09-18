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
      className="max-w-6xl mx-auto px-6 pt-4 pb-16 lg:pb-20"
    >
      <h2 id="trust-stats-heading" className="sr-only">
        Estatísticas e Credenciais
      </h2>
      <dl className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-surface-variant/30 dark:bg-[#1a1816]/30 backdrop-blur-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] dark:divide-white/[0.08] shadow-xs">
        {/* Célula 1: Destaque Principal (+25.000) */}
        <div className="stat-block md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors duration-200 hover:bg-black/[0.015] dark:hover:bg-white/[0.015]">
          <div>
            <dt className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-sage dark:text-emerald-400/90 mb-3 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-sage dark:bg-emerald-400 inline-block"
                aria-hidden="true"
              />
              01 / Atendimentos Realizados
            </dt>
            <dd className="m-0 flex flex-col">
              <span
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-on-surface dark:text-white tracking-tight leading-none tabular-nums"
                aria-label="Mais de 25.000 atendimentos"
              >
                +25.000
              </span>
              <span className="font-sans text-sm sm:text-base text-text-secondary dark:text-slate-300 mt-3 sm:mt-4 font-light leading-relaxed max-w-[42ch]">
                Procedimentos conduzidos com a sensibilidade e dedicação de uma única especialista.
              </span>
            </dd>
          </div>
        </div>

        {/* Célula 2: Trajetória Clínica (Desde 2016) */}
        <div className="stat-block md:col-span-3 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-black/[0.015] dark:hover:bg-white/[0.015]">
          <div>
            <dt className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-sage dark:text-emerald-400/90 mb-3">
              02 / Trajetória Clínica
            </dt>
            <dd className="m-0 flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-on-surface dark:text-white tracking-tight leading-none tabular-nums">
                Desde 2016
              </span>
              <span className="font-sans text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-3 font-light leading-relaxed">
                Uma década aperfeiçoando o protocolo de podologia clínica domiciliar em Mococa.
              </span>
            </dd>
          </div>
        </div>

        {/* Célula 3: Deslocamento Cortesia (Taxa R$ 0) */}
        <div className="stat-block md:col-span-3 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-black/[0.015] dark:hover:bg-white/[0.015]">
          <div>
            <dt className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-sage dark:text-emerald-400/90 mb-3">
              03 / Conveniência & Rigor
            </dt>
            <dd className="m-0 flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-on-surface dark:text-white tracking-tight leading-none tabular-nums">
                Taxa R$ 0
              </span>
              <span className="font-sans text-xs sm:text-sm text-text-secondary dark:text-slate-400 mt-3 font-light leading-relaxed">
                Deslocamento cortesia em qualquer bairro de Mococa, com instrumentos cirúrgicos
                esterilizados.
              </span>
            </dd>
          </div>
        </div>
      </dl>
    </section>
  )
}
