import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initCtaAnimation } from '@/animations/cta'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { getWhatsAppUrl, getWhatsAppDoubtUrl } from '@/utils/whatsapp'

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
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-5 max-w-[26ch] text-balance"
        >
          Agende seu atendimento em domicílio
        </h2>
        <p className="text-base text-on-surface-variant max-w-[48ch] mx-auto leading-relaxed mb-10 font-light text-pretty">
          Entre em contato pelo WhatsApp para agendar seu horário ou tirar dúvidas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href={getWhatsAppUrl(
              'Olá, Angélica! Li as informações no site e gostaria de agendar um atendimento em domicílio em Mococa.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar agendamento pelo WhatsApp (abre em nova aba)"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-[background-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            Solicitar Agendamento
          </a>
          <a
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-pure-white dark:bg-surface-variant border border-surface-border hover:border-accent text-on-surface text-xs uppercase tracking-[0.14em] font-medium hover:bg-surface-variant active:scale-[0.98] transition-[background-color,border-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            href={getWhatsAppDoubtUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tirar dúvidas no WhatsApp (abre em uma nova aba)"
          >
            Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
