import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initCtaAnimation } from '@/animations/cta'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { getWhatsAppDoubtUrl } from '@/utils/whatsapp'

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

      return () => mm.revert()
    },
    { scope: ctaSectionRef },
  )

  return (
    <section
      ref={ctaSectionRef}
      className="max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="cta-reveal flex flex-col items-center">
        <h2
          id="cta-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.12] mb-5 max-w-[26ch] text-balance"
        >
          O cuidado com a sua saúde começa com um horário reservado.
        </h2>
        <p className="text-base text-on-surface-variant max-w-[48ch] mx-auto leading-relaxed mb-10 font-light text-pretty">
          Os agendamentos são realizados diretamente no site com escolha do procedimento e data.
          Para esclarecer dúvidas prévias ou emergências podológicas, o canal no WhatsApp permanece
          à disposição.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href="#procedimentos"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            Solicitar Agendamento
          </a>
          <a
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-white dark:bg-surface-variant border border-black/[0.08] dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/20 text-on-surface text-xs uppercase tracking-[0.14em] font-medium hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-[background-color,border-color,transform,box-shadow] shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            href={getWhatsAppDoubtUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tirar dúvidas no WhatsApp (abre em uma nova aba)"
          >
            Tirar Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
