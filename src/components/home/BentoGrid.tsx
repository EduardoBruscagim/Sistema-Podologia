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
              No conforto do seu lar
            </h3>
            <p className="text-base text-theme-muted leading-relaxed font-medium">
              Cuidado completo para pés e mãos sem você precisar sair de casa, pegar trânsito ou
              esperar em salão.
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="badge badge-primary badge-soft text-xs font-semibold mb-3 self-start">
              Toda Mococa - SP
            </span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-slate-50 text-balance">
              Sem taxa de deslocamento
            </h3>
            <p className="text-base text-theme-muted font-medium leading-relaxed">
              Atendimento em qualquer bairro de Mococa sem nenhum custo extra de transporte. O valor
              é transparente e sem surpresas.
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
              Segurança & Cuidado
            </span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-white text-balance">
              Autoclave e descartáveis
            </h3>
            <p className="text-white text-base font-medium leading-relaxed">
              Alicates e espátulas 100% esterilizados em autoclave, além de toalhas e lixas
              descartáveis abertas na sua frente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
