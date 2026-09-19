import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Zap, ShieldCheck, Shield, Check } from 'lucide-react'
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
      aria-labelledby="tech-heading"
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24"
      id="tecnologia"
    >
      <div className="tech-header mb-12 lg:mb-16 max-w-2xl">
        <h2
          id="tech-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Biossegurança cirúrgica e recursos portáteis.
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Aparelhos portáteis selecionados para regeneração, conforto e acabamento impecável, com o
          mesmo nível de assepsia de um consultório clínico.
        </p>
      </div>

      {/* Bento Grid Tecnológico e Biossegurança */}
      <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Célula Principal de Autoridade: Esterilização em Autoclave a 134°C + 100% Descartáveis */}
        <div className="tech-featured col-span-1 md:col-span-2 lg:col-span-12 p-6 sm:p-8 lg:p-10 rounded-xl bg-white dark:bg-surface-variant border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/40 transition-[border-color,background-color] duration-300 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent">
                    <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                    Biossegurança Hospitalar
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary">
                    Autoclave a 134°C
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary">
                    100% Descartáveis
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-on-surface dark:text-white mb-4 leading-tight">
                  Esterilização cirúrgica em autoclave a 134°C e materiais 100% descartáveis
                </h3>

                <p className="text-sm sm:text-base text-on-surface-variant font-light leading-relaxed mb-6 max-w-[56ch] text-pretty">
                  Todos os alicates e instrumentais de aço inoxidável passam por ciclo completo de
                  esterilização em autoclave sob alta temperatura (134°C) e pressão de vapor. Cada
                  kit permanece lacrado em envelope cirúrgico com barreira biológica e indicador
                  químico, sendo aberto exclusivamente na sua presença. Lixas, lâminas, toalhas e
                  luvas são de uso único e descartadas ao término do procedimento.
                </p>
              </div>

              {/* Indicadores de autoridade */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="w-4 h-4 text-accent dark:text-accent shrink-0 mt-0.5"
                  />
                  <div className="text-xs">
                    <strong className="block font-medium text-on-surface dark:text-white">
                      Autoclave a 134°C
                    </strong>
                    <span className="text-text-secondary font-light">Eliminação de esporos</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="w-4 h-4 text-accent dark:text-accent shrink-0 mt-0.5"
                  />
                  <div className="text-xs">
                    <strong className="block font-medium text-on-surface dark:text-white">
                      Kit Selado Individual
                    </strong>
                    <span className="text-text-secondary font-light">Aberto na sua presença</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="w-4 h-4 text-accent dark:text-accent shrink-0 mt-0.5"
                  />
                  <div className="text-xs">
                    <strong className="block font-medium text-on-surface dark:text-white">
                      100% Descartáveis
                    </strong>
                    <span className="text-text-secondary font-light">Uso único garantido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prova Visual Autêntica: Setup Real em Mesa de Atendimento */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-surface-variant/30 group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <picture>
                  <source type="image/webp" srcSet="/clinical-care-setup.webp" />
                  <img
                    src="/clinical-care-setup.jpg"
                    alt="Mesa de atendimento clínico domiciliar com instrumentais esterilizados em envelope cirúrgico e descartáveis"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={1200}
                    height={896}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs font-light">
                    <Shield aria-hidden="true" className="w-3.5 h-3.5 text-sage" />
                    Kit aberto na sua frente
                  </span>
                  <span className="hidden sm:inline-block text-[11px] text-white/80 font-light">
                    Mococa, SP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Secundário 1: Fototerapia LED */}
        <div className="tech-card col-span-1 md:col-span-1 lg:col-span-6 p-6 sm:p-8 rounded-xl bg-white dark:bg-surface-variant border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/40 transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent">
                Bioestimulação Celular
              </span>
              <div className="tech-icon w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-accent">
                <Sparkles aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface dark:text-white mb-2.5 leading-snug">
              Fototerapia LED de luz vermelha
            </h3>

            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[42ch] text-pretty">
              Atua na regeneração celular dos tecidos, aliviando processos inflamatórios imediatos e
              acelerando a cicatrização de cantos de unhas doloridos ou sensibilizados.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2 text-xs text-text-secondary font-light">
            <Check
              aria-hidden="true"
              className="w-3.5 h-3.5 text-accent dark:text-accent shrink-0"
            />
            <span>Ação anti-inflamatória e regenerativa</span>
          </div>
        </div>

        {/* Card Secundário 2: Cabine UV Portátil */}
        <div className="tech-card col-span-1 md:col-span-1 lg:col-span-6 p-6 sm:p-8 rounded-xl bg-white dark:bg-surface-variant border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/40 transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent">
                Acabamento & Proteção
              </span>
              <div className="tech-icon w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-accent">
                <Zap aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface dark:text-white mb-2.5 leading-snug">
              Cabine portátil de luz ultravioleta
            </h3>

            <p className="text-sm text-on-surface-variant leading-relaxed font-light max-w-[42ch] text-pretty">
              Acelera a polimerização e a secagem profunda do esmalte, impedindo borrões no calçado
              e proporcionando ação auxiliar contra fungos e bactérias.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2 text-xs text-text-secondary font-light">
            <Check
              aria-hidden="true"
              className="w-3.5 h-3.5 text-accent dark:text-accent shrink-0"
            />
            <span>Secagem rápida sem borrões ao calçar</span>
          </div>
        </div>
      </div>
    </section>
  )
}
