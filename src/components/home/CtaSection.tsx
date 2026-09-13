import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAuth } from '@/hooks/useAuth'
import { initCtaAnimation } from '@/animations/cta'

export const CtaSection: React.FC = () => {
  const ctaSectionRef = useRef<HTMLElement | null>(null)
  const { isAuthenticated, openAuthModal } = useAuth()
  const navigate = useNavigate()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          isMotionOk: '(prefers-reduced-motion: no-preference)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMotionOk } = context.conditions!
          if (!isMotionOk) {
            gsap.set('.cta-reveal', {
              autoAlpha: 1,
              clearProps: 'transform',
            })
            return
          }

          return initCtaAnimation()
        },
      )
    },
    { scope: ctaSectionRef },
  )

  return (
    <section
      ref={ctaSectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-apple-blue/5 dark:bg-slate-950 text-slate-900 dark:text-white text-center relative overflow-hidden transition-colors duration-300"
    >
      {/* Glow sutil no fundo do CTA */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-apple-blue/10 dark:from-apple-blue/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto cta-reveal relative z-10 px-2 sm:px-4">
        <h2 className="text-3xl sm:text-4xl md:text-[5rem] font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.05] text-balance">
          Escolha o dia.
          <br />
          Eu chego até você.
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-theme-muted font-medium max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-14 leading-relaxed sm:leading-snug text-balance">
          Atendimento domiciliar em toda a cidade de Mococa - SP sem taxa de deslocamento. Cuidado
          completo para seus pés e mãos com materiais esterilizados em autoclave e itens
          descartáveis.
        </p>
        <button
          type="button"
          onClick={() => {
            if (isAuthenticated) {
              navigate('/dashboard')
            } else {
              openAuthModal('register')
            }
          }}
          className="bg-apple-blue hover:bg-apple-blue-hover text-white text-base sm:text-lg md:text-xl font-medium px-8 py-3.5 sm:py-4 md:px-12 md:py-5 rounded-full transition-all active:scale-95 shadow-lg shadow-apple-blue/30 hover:shadow-xl hover:shadow-apple-blue/40 leading-tight w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 focus-visible:ring-apple-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agendar horário
        </button>
      </div>
    </section>
  )
}
