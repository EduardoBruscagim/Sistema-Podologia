import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAuth } from '@/hooks/useAuth'
import { initHeroAnimation } from '@/animations/hero'

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)
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
            gsap.set(['.gsap-hero-reveal', '.gsap-hero-image', '.hero-slot'], {
              autoAlpha: 1,
              clearProps: 'transform,scale',
            })
            gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
            return
          }

          return initHeroAnimation()
        },
      )
    },
    { scope: heroSectionRef },
  )

  return (
    <section
      ref={heroSectionRef}
      className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center"
    >
      {/* Blur de fundo assimétrico */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-apple-blue/20 dark:from-apple-blue/20 to-transparent blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        <div className="lg:col-span-7">
          <h1 className="gsap-hero-reveal text-4xl sm:text-6xl md:text-[6.5rem] lg:text-[7.5rem] font-bold tracking-tighter leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8 text-slate-900 dark:text-slate-50">
            Pés e mãos
            <br />
            <span className="text-slate-500 dark:text-slate-400">bem cuidados.</span>
          </h1>
          <p className="gsap-hero-reveal text-base sm:text-lg md:text-2xl text-theme-muted font-medium max-w-xl mb-8 sm:mb-12 leading-relaxed sm:leading-snug text-balance">
            Cuidado profissional para pés e mãos no conforto do seu lar em Mococa - SP. Corte
            correto, desencravar suave, hidratação e esmaltação sem taxa de deslocamento.
          </p>
          <div className="gsap-hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/dashboard')
                } else {
                  openAuthModal('register')
                }
              }}
              className="bg-apple-blue hover:bg-apple-blue-hover text-white text-base sm:text-lg font-medium px-8 py-3.5 sm:py-4 rounded-full transition-all active:scale-95 shadow-sm shadow-apple-blue/20 hover:shadow-md hover:shadow-apple-blue/30 leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 focus-visible:ring-apple-blue disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              Agendar horário
            </button>
            <span className="badge badge-primary badge-outline text-xs uppercase font-semibold tracking-wider py-3 px-4 rounded-full self-center sm:self-auto">
              ✓ Toda Mococa - SP
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative gsap-hero-image w-full max-w-md mx-auto lg:max-w-none mt-6 lg:mt-0">
          {/* Glassmorphism 'floating' UI representation */}
          <div className="hero-levitation-wrapper">
            <div
              className="hero-mockup-card w-full aspect-auto sm:aspect-[4/5] bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/80 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden flex flex-col justify-between p-6 sm:p-8 relative lg:rotate-2"
              aria-hidden="true"
            >
              <div className="flex justify-between items-center mb-8 sm:mb-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-apple-blue/10 dark:bg-apple-blue/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-apple-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="w-16 sm:w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
                <div className="h-4 sm:h-5 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
              </div>
              <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-3" aria-hidden="true">
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-apple-blue border border-apple-blue/30 shadow-lg shadow-apple-blue/30" />
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="hero-slot aspect-square rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </div>
              {/* Selo de Demonstração de Atendimento */}
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-950/40 backdrop-blur-[4px]">
                <span className="badge badge-lg bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 font-semibold text-xs tracking-wider uppercase px-4 py-3 rounded-full shadow-md backdrop-blur-md">
                  Atendimento Domiciliar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
