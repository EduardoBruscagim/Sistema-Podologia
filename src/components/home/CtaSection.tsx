import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initCtaAnimation } from '@/animations/cta'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { useAuth } from '@/hooks/useAuth'

export const CtaSection: React.FC = () => {
  const ctaSectionRef = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()
  const { isAuthenticated, openAuthModal } = useAuth()

  const handleAgendar = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      openAuthModal('login')
    }
  }

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
      className="max-w-4xl mx-auto px-6 py-16 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="cta-reveal">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface dark:text-white tracking-tight leading-tight mb-5 text-balance"
        >
          Quer agendar seu atendimento em domicílio?
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
          Os agendamentos são realizados diretamente pelo painel do site. Caso tenha dúvidas
          pontuais ou precise de um atendimento de emergência, fale comigo pelo WhatsApp.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleAgendar}
            className="inline-flex items-center justify-center min-h-11 px-8 rounded-full bg-primary text-on-primary text-sm sm:text-base font-semibold hover:bg-primary-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            Agendar no painel
          </button>
          <a
            className="inline-flex items-center justify-center min-h-11 px-7 rounded-full bg-white dark:bg-slate-800 border border-surface-border dark:border-slate-700 text-on-surface dark:text-slate-200 text-sm sm:text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            href={getWhatsAppUrl(
              'Olá, Angélica! Gostaria de tirar uma dúvida sobre os atendimentos em domicílio.',
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
