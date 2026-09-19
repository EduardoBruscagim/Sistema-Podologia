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
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Como funciona o atendimento
        </h2>
      </div>

      <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1: Conforto do lar */}
        <div className="bento-card p-6 sm:p-8 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">01</span>
              <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                <Home aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-3 leading-snug">
              Espaço simples
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              Levo os materiais e aparelhos. É necessário apenas um lugar para sentar e uma tomada
              por perto.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-border flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Não precisa providenciar materiais</span>
            </span>
          </div>
        </div>

        {/* Card 2: Toda Mococa */}
        <div className="bento-card p-6 sm:p-8 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">02</span>
              <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                <MapPin aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-3 leading-snug">
              Sem taxa de visita
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              Atendimento em qualquer bairro de Mococa pelo valor da tabela, sem cobrança extra de
              deslocamento.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-border flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Preço final sem acréscimo</span>
            </span>
          </div>
        </div>

        {/* Card 3: Pontualidade & Dedicação */}
        <div className="bento-card p-6 sm:p-8 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg text-sage tracking-widest font-normal">03</span>
              <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                <Clock aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-3 leading-snug">
              Horário marcado
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[38ch] text-pretty">
              Atendimento com horário reservado, sem atender outra pessoa ao mesmo tempo.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-border flex items-center text-xs text-text-secondary font-light">
            <span className="flex items-center gap-2">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>Atendimento individual</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
