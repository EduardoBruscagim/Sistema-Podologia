import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initCtaAnimation } from '@/animations/cta'
import { applyReducedMotion } from '@/animations/reducedMotion'

export const CtaSection: React.FC = () => {
  const ctaSectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const el = ctaSectionRef.current
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
            applyReducedMotion('.cta-reveal')
            return
          }

          return initCtaAnimation(el)
        },
      )
    },
    { scope: ctaSectionRef },
  )

  return (
    <section ref={ctaSectionRef} className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="cta-reveal">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface dark:text-white tracking-tight leading-tight mb-5">
          Escolha o dia.
          <br />
          Eu chego até você.
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
          Atendimento domiciliar em toda a cidade de Mococa - SP sem taxa de deslocamento. Cuidado
          completo para seus pés e mãos com materiais esterilizados em autoclave e itens
          descartáveis.
        </p>
        <a
          className="inline-flex items-center justify-center min-h-11 px-8 rounded-full bg-primary text-on-primary text-sm sm:text-base font-semibold hover:bg-primary-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          href="#procedimentos"
        >
          Agendar horário
        </a>
      </div>
    </section>
  )
}
