import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initHeroAnimation } from '@/animations/hero'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { useAuth } from '@/hooks/useAuth'

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)
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
      const el = heroSectionRef.current
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
            applyReducedMotion(['.gsap-hero-reveal', '.gsap-hero-image'])
            return
          }

          return initHeroAnimation(el)
        },
      )
      return () => mm.revert()
    },
    { scope: heroSectionRef },
  )

  return (
    <section
      ref={heroSectionRef}
      className="max-w-6xl mx-auto px-6 pt-10 pb-12 lg:pb-16"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Headline & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <h1
            id="hero-title"
            className="gsap-hero-reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface dark:text-white tracking-tight leading-[1.08] mb-6 text-balance"
          >
            Cuidado profissional para seus pés e mãos sem sair de casa.
          </h1>
          <p className="gsap-hero-reveal text-base sm:text-lg text-on-surface-variant dark:text-slate-300 leading-relaxed mb-8 max-w-lg font-normal">
            Atendimento domiciliar de podologia e manicure em qualquer bairro de Mococa, SP.
            Instrumentos esterilizados, materiais descartáveis e sem cobrança de taxa de
            deslocamento.
          </p>
          <div className="gsap-hero-reveal flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAgendar}
              className="inline-flex items-center justify-center min-h-11 px-7 rounded-full bg-primary text-on-primary text-sm sm:text-base font-semibold hover:bg-primary-hover active:scale-[0.98] transition-[background-color,transform,box-shadow] shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Agendar horário
            </button>
            <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-surface-border dark:border-slate-700 text-xs font-semibold text-on-surface-variant dark:text-slate-300 shadow-2xs">
              <span className="text-primary dark:text-sky-300 font-bold">✓</span>
              <span>Agendamento online pelo site</span>
            </div>
          </div>
        </div>

        {/* Right: Real Image Card */}
        <div className="lg:col-span-6 gsap-hero-image">
          <div className="relative rounded-3xl overflow-hidden border border-surface-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-slate-700 text-xs font-semibold text-on-surface dark:text-white shadow-xs">
                Atendimento em domicílio
              </span>
            </div>
            <picture>
              <source type="image/webp" srcSet="/hero-clinical-bag.webp" />
              <img
                alt="Kit profissional higienizado para atendimento domiciliar com toalhas e instrumentais esterilizados"
                className="w-full h-[400px] lg:h-[460px] object-cover"
                src="/hero-clinical-bag.jpg"
                width={600}
                height={460}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
