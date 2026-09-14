import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Zap, ShieldCheck, Shield } from 'lucide-react'
import { initTechnologyAnimation } from '@/animations/technology'
import { applyReducedMotion } from '@/animations/reducedMotion'

export const TechnologySection: React.FC = () => {
  const techSectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const el = techSectionRef.current
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
            applyReducedMotion(['.tech-header', '.tech-card', '.tech-featured'])
            return
          }

          return initTechnologyAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: techSectionRef },
  )

  return (
    <section
      ref={techSectionRef}
      aria-labelledby="technology-heading"
      className="max-w-6xl mx-auto px-6 py-12"
      id="tecnologia"
    >
      <div className="tech-header text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-semibold text-clinical-blue dark:text-sky-400 mb-3">
          Equipamentos portáteis
        </div>
        <h2
          id="technology-heading"
          className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight mb-4 text-balance"
        >
          Recursos que acompanham o atendimento
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
          Aparelhos práticos que levo na maleta para cuidar da saúde, da cicatrização e do
          acabamento das suas unhas.
        </p>
      </div>

      <div className="tech-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Card 1: Luz Vermelha */}
        <div className="tech-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="tech-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
              <Sparkles aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary dark:text-sky-300 block mb-1.5">
              Fototerapia LED
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Luz vermelha terapêutica
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Auxilia na recuperação celular, alivia incômodos imediatos e acelera a cicatrização de
              cantos de unhas inflamados ou sensíveis.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-surface-border dark:border-slate-800 flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-300 font-medium">
            <span className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/15 text-clinical-blue dark:text-sky-400 text-xs font-semibold">
              Alívio e cicatrização
            </span>
          </div>
        </div>

        {/* Card 2: Luz Ultravioleta */}
        <div className="tech-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="tech-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
              <Zap aria-hidden="true" className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-primary dark:text-sky-300 block mb-1.5">
              Secagem e higiene
            </span>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-2.5">
              Cabine de luz ultravioleta
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
              Acelera a secagem do esmalte para evitar borrões na hora de calçar o sapato e tem ação
              auxiliar contra fungos e bactérias.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-surface-border dark:border-slate-800 flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-300 font-medium">
            <span className="px-3 py-1 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 text-clinical-blue dark:text-sky-400 text-xs font-semibold">
              Secagem rápida e proteção
            </span>
          </div>
        </div>
      </div>

      {/* Card Destacado: Esterilização e Higiene */}
      <div className="tech-featured p-5 sm:p-7 lg:p-8 rounded-3xl bg-primary text-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-start md:items-center gap-4">
            <div className="featured-icon w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
              <ShieldCheck aria-hidden="true" className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white tracking-wide block mb-1">
                Higiene e esterilização
              </span>
              <h3 className="text-xl font-bold text-white mb-1.5">
                Instrumentos esterilizados e materiais descartáveis
              </h3>
              <p className="text-sm text-white leading-relaxed font-normal max-w-2xl">
                Todos os alicates e espátulas de aço são higienizados e esterilizados. Cada conjunto
                vem lacrado em embalagem individual e é aberto na sua frente. Luvas, lixas e toalhas
                são de uso único e descartadas após o procedimento.
              </p>
            </div>
          </div>
          <div className="shrink-0 pt-2 md:pt-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
              <Shield aria-hidden="true" className="w-4 h-4" />
              <span>Materiais esterilizados e descartáveis</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
