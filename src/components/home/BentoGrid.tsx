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

      <div className="bento-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Card 1 (Destaque Principal / Hero Card do Bento): Conforto do lar */}
        <div className="bento-card lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                Praticidade Residencial
              </span>
              <div className="bento-icon w-10 h-10 rounded-xl bg-sage-subtle flex items-center justify-center text-sage">
                <Home aria-hidden="true" className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mb-3 leading-snug">
              Espaço simples, conforto absoluto
            </h3>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light max-w-[46ch] text-pretty">
              Levo todos os aparelhos, toalhas higienizadas e insumos descartáveis. Você só precisa de uma cadeira ou poltrona confortável e uma tomada comum por perto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-surface-border">
              <div className="flex items-center gap-2 text-xs text-text-secondary font-light">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Sem trânsito ou filas de salão</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary font-light">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Insumos 100% esterilizados</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-border flex items-center text-xs text-sage font-medium">
            Atendimento no seu ritmo e na privacidade do seu lar
          </div>
        </div>

        {/* Coluna Direita (2 Cards Complementares Empilhados) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Toda Mococa */}
          <div className="bento-card flex-1 p-6 sm:p-7 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                  Cobertura
                </span>
                <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                  <MapPin aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                Sem taxa de visita
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                Atendimento em qualquer bairro da cidade de Mococa pelo valor exato da tabela, sem acréscimo de deslocamento.
              </p>
            </div>

            <div className="mt-6 pt-3.5 border-t border-surface-border flex items-center text-xs text-text-secondary font-light">
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Preço final transparente garantido</span>
              </span>
            </div>
          </div>

          {/* Card 3: Pontualidade & Dedicação */}
          <div className="bento-card flex-1 p-6 sm:p-7 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                  Pontualidade
                </span>
                <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                  <Clock aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                Horário exclusivo
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                Seu horário é reservado exclusivamente para você, sem divisão de atenção e com dedicação integral.
              </p>
            </div>

            <div className="mt-6 pt-3.5 border-t border-surface-border flex items-center text-xs text-text-secondary font-light">
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Atendimento calmo e individual</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
