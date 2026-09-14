import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initBentoAnimation } from '@/animations/bento'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { Home, MapPin, Clock, Check } from 'lucide-react'

export const BentoGrid: React.FC = () => {
  const bentoSectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const el = bentoSectionRef.current
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
            applyReducedMotion(['.bento-header', '.bento-card', '.bento-icon'])
            return
          }

          return initBentoAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: bentoSectionRef },
  )

  return (
    <section
      ref={bentoSectionRef}
      aria-labelledby="bento-heading"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="mb-10 bento-header">
        <h2
          id="bento-heading"
          className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight leading-tight"
        >
          Como funciona a visita
          <br />
          na sua casa.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">
        {/* Card 1: Conforto do lar */}
        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
              <Home aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary dark:text-sky-300 block mb-1.5">
              Na sua casa
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Tudo pronto na sua sala ou quarto
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Levo os equipamentos, instrumentais esterilizados e materiais descartáveis. Você só
              precisa escolher um sofá ou poltrona confortável.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-surface-border dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary dark:text-sky-300" />
              <span>Sem fila ou sala de espera</span>
            </span>
          </div>
        </div>

        {/* Card 2: Toda Mococa */}
        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
              <MapPin aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary dark:text-sky-300 block mb-1.5">
              Mococa, SP
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Preço único sem taxa de visita
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Atendo em qualquer bairro de Mococa sem cobrar acréscimo de deslocamento. O valor do
              procedimento é o preço final.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-surface-border dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary dark:text-sky-300" />
              <span>Sem surpresas no valor</span>
            </span>
          </div>
        </div>

        {/* Card 3: Pontualidade & Flexibilidade */}
        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
              <Clock aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary dark:text-sky-300 block mb-1.5">
              Horário reservado
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Tempo dedicado a você
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              A sessão é agendada com calma para realizar o procedimento no seu tempo, com cuidado e
              sem correria.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-surface-border dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary dark:text-sky-300" />
              <span>Pontualidade no horário marcado</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
