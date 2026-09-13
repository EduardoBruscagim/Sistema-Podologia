import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initBentoAnimation } from '@/animations/bento'

export const BentoGrid: React.FC = () => {
  const bentoSectionRef = useRef<HTMLElement | null>(null)

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
            gsap.set(['.bento-header', '.bento-card', '.bento-icon'], {
              autoAlpha: 1,
              clearProps: 'transform,scale',
            })
            return
          }

          return initBentoAnimation()
        },
      )
    },
    { scope: bentoSectionRef },
  )

  return (
    <section
      ref={bentoSectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12 md:mb-16 bento-header">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05] text-slate-900 dark:text-slate-50 text-balance">
            Feito para se encaixar
            <br />
            na sua rotina.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-6 bento-grid [perspective:1000px]">
          {/* Card 1 */}
          <div className="bento-card group bg-theme-card rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 border border-theme-card-border shadow-sm shadow-slate-900/5 flex flex-col relative overflow-hidden hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40 transition-shadow duration-300">
            <div className="bento-icon w-14 h-14 bg-apple-blue/10 dark:bg-apple-blue/10 rounded-2xl flex items-center justify-center text-apple-blue mb-6 lg:mb-8">
              <svg
                className="w-7 h-7"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="badge badge-primary badge-soft text-xs font-semibold mb-3 self-start">
              Atendimento Domiciliar
            </span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Sem sala de espera
            </h3>
            <p className="text-base text-theme-muted leading-relaxed font-medium">
              Levo a estrutura completa de um consultório até você. Esqueça o trânsito e o tempo
              perdido.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bento-card group bg-theme-card rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 border border-theme-card-border shadow-sm shadow-slate-900/5 flex flex-col hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40 transition-shadow duration-300">
            <div className="bento-icon w-14 h-14 bg-apple-blue/10 dark:bg-apple-blue/10 rounded-2xl flex items-center justify-center text-apple-blue mb-6 lg:mb-8 shrink-0">
              <svg
                className="w-7 h-7"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="badge badge-primary badge-soft text-xs font-semibold mb-3 self-start">
              Tempo Real
            </span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Marque na hora
            </h3>
            <p className="text-base text-theme-muted font-medium leading-relaxed">
              Acesse minha agenda real e veja os horários livres na hora, sem precisar esperar eu
              responder.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bento-card group bg-apple-blue rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 border border-apple-blue shadow-lg shadow-apple-blue/20 flex flex-col text-white hover:shadow-2xl hover:shadow-apple-blue/40 transition-shadow duration-300">
            <div className="bento-icon w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 lg:mb-8 shrink-0">
              <svg
                className="w-7 h-7"
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="badge badge-outline border-white/40 text-white text-xs font-semibold mb-3 self-start">
              Biossegurança Hospitalar
            </span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-white text-balance">
              Higiene rigorosa
            </h3>
            <p className="text-white text-base font-medium leading-relaxed">
              Todos os materiais são 100% descartáveis ou esterilizados em autoclave, seguindo os
              protocolos da profissão.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
