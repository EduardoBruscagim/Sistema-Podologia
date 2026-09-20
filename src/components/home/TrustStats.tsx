import React, { useRef } from 'react'
import { initStatsAnimation } from '@/animations/stats'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

export const TrustStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useSectionAnimation(sectionRef, initStatsAnimation, '.stat-reveal')

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-stats-heading"
      className="max-w-6xl mx-auto px-6 pt-4 pb-16 lg:pb-20"
    >
      <h2 id="trust-stats-heading" className="sr-only">
        Estatísticas e Credenciais
      </h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 rounded-xl border border-surface-border bg-pure-white dark:bg-surface-variant overflow-hidden">
        {/* Célula 1: Destaque Principal (+25.000) */}
        <div className="stat-block col-span-1 md:col-span-2 lg:col-span-6 bg-pure-white dark:bg-surface-variant border-b lg:border-b-0 lg:border-r border-surface-border p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors duration-200">
          <div className="stat-reveal flex flex-col justify-between h-full">
            <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-sage mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage inline-block" aria-hidden="true" />
              Atendimentos realizados
            </dt>
            <dd className="m-0 flex flex-col">
              <span
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-on-surface tracking-tight leading-none tabular-nums"
                aria-label="Mais de 25.000 atendimentos"
              >
                +25.000
              </span>
              <span className="font-sans text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 font-light leading-relaxed max-w-[44ch]">
                Atendimentos com ficha individual de acompanhamento.
              </span>
            </dd>
          </div>
        </div>

        {/* Célula 2: Trajetória Clínica (Desde 2016) */}
        <div className="stat-block col-span-1 md:col-span-1 lg:col-span-3 bg-pure-white dark:bg-surface-variant border-b md:border-b-0 md:border-r border-surface-border p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-colors duration-200">
          <div className="stat-reveal flex flex-col justify-between h-full">
            <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-sage mb-3">
              Atuação em Mococa
            </dt>
            <dd className="m-0 flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-on-surface tracking-tight leading-none tabular-nums">
                Desde 2016
              </span>
              <span className="font-sans text-xs sm:text-sm text-text-secondary mt-3 font-light leading-relaxed">
                Experiência em podologia e manicure domiciliar na cidade.
              </span>
            </dd>
          </div>
        </div>

        {/* Célula 3: Deslocamento Cortesia (Taxa R$ 0) */}
        <div className="stat-block col-span-1 md:col-span-1 lg:col-span-3 bg-pure-white dark:bg-surface-variant p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-colors duration-200">
          <div className="stat-reveal flex flex-col justify-between h-full">
            <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-sage mb-3">
              Deslocamento em Mococa
            </dt>
            <dd className="m-0 flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-on-surface tracking-tight leading-none tabular-nums">
                Taxa R$ 0
              </span>
              <span className="font-sans text-xs sm:text-sm text-text-secondary mt-3 font-light leading-relaxed">
                Sem taxa de visita em qualquer bairro da cidade.
              </span>
            </dd>
          </div>
        </div>
      </dl>
    </section>
  )
}
