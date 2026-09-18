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
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24"
    >
      <div className="bento-header mb-12 lg:mb-16 max-w-2xl">
        <h2
          id="bento-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Como funciona o atendimento clínico na sua residência.
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Estrutura técnica completa, biossegurança cirúrgica e conforto absoluto levados até você,
          com discrição e pontualidade.
        </p>
      </div>

      <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1: Conforto do lar */}
        <div className="bento-card p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161413] border border-black/[0.06] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">01</span>
              <div className="bento-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage">
                <Home aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface dark:text-white mb-3 leading-snug">
              Tudo pronto na sua sala ou quarto
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              Levo os equipamentos, instrumentais esterilizados e materiais descartáveis. Você só
              precisa escolher um sofá ou poltrona confortável.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Sem fila ou sala de espera</span>
            </span>
          </div>
        </div>

        {/* Card 2: Toda Mococa */}
        <div className="bento-card p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161413] border border-black/[0.06] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">02</span>
              <div className="bento-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage">
                <MapPin aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface dark:text-white mb-3 leading-snug">
              Preço único sem taxa de visita
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              Atendo em qualquer bairro de Mococa sem acréscimo de deslocamento. O valor do
              procedimento é exatamente o preço final.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Sem surpresas no valor</span>
            </span>
          </div>
        </div>

        {/* Card 3: Pontualidade & Dedicação */}
        <div className="bento-card p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161413] border border-black/[0.06] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">03</span>
              <div className="bento-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage">
                <Clock aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface dark:text-white mb-3 leading-snug">
              Sessão dedicada no seu tempo
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              A sessão é agendada com calma e dedicação exclusiva para realizar o procedimento sem
              pressa, com precisão técnica e atenção aos detalhes.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Pontualidade no horário marcado</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
