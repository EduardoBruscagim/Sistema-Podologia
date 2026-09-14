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
    },
    { scope: bentoSectionRef },
  )

  return (
    <section ref={bentoSectionRef} className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 bento-header">
        <h2 className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight leading-tight">
          Feito para se encaixar
          <br />
          na sua rotina.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">
        {/* Card 1: Conforto do lar */}
        <div className="bento-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <Home aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary block mb-1.5">
              Atendimento Domiciliar
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              No conforto do seu lar
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Cuidado completo para pés e mãos sem você precisar sair de casa, enfrentar trânsito ou
              esperar em salas de espera.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-apple-gray dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary" />
              <span>Máxima comodidade</span>
            </span>
          </div>
        </div>

        {/* Card 2: Toda Mococa */}
        <div className="bento-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <MapPin aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary block mb-1.5">
              Toda Mococa - SP
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Sem taxa de deslocamento
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Atendimento em qualquer bairro de Mococa sem acréscimo de custo de transporte. O valor
              é transparente e sem cobranças extras.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-apple-gray dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary" />
              <span>Sem custos ocultos</span>
            </span>
          </div>
        </div>

        {/* Card 3: Pontualidade & Flexibilidade */}
        <div className="bento-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="bento-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <Clock aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary block mb-1.5">Horário Marcado</span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Pontualidade e flexibilidade
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Agendamento adaptável à sua rotina com horário reservado exclusivamente para você,
              garantindo atenção calma e sem pressa.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-apple-gray dark:border-slate-800 flex items-center justify-between text-xs text-text-secondary dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="w-4 h-4 text-primary" />
              <span>Atendimento com hora certa</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
