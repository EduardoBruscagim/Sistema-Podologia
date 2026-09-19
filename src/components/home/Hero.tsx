import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initHeroAnimation } from '@/animations/hero'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { MapPin } from 'lucide-react'

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)

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
            applyReducedMotion('.gsap-hero-image')
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
      className="max-w-6xl mx-auto px-6 pt-8 pb-16 lg:pt-12 lg:pb-20"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Headline & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent mb-4">
            <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
            Podologia em Domicílio · Mococa, SP
          </span>

          <h1
            id="hero-title"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.08] mb-6 text-balance"
          >
            O cuidado clínico e especializado para seus pés e mãos,
            <br className="hidden sm:inline" /> no{' '}
            <span className="italic font-light">conforto</span> da sua casa em Mococa.
          </h1>

          <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-[48ch] font-light text-pretty">
            Atendimento domiciliar de podologia clínica e manicure em Mococa. Esterilização em
            autoclave, materiais descartáveis e cortesia integral de deslocamento para qualquer
            bairro.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
            <a
              href="#procedimentos"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-on-accent hover:bg-accent-hover active:scale-[0.98] text-xs uppercase tracking-[0.12em] font-medium transition-[background-color,transform,box-shadow] shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              Solicitar Agendamento
            </a>
            <div className="inline-flex items-center gap-2 text-xs text-text-secondary font-light">
              <span className="text-sage font-semibold" aria-hidden="true">
                ✓
              </span>
              <span>Instrumentais estéreis abertos na sua presença</span>
            </div>
          </div>
        </div>

        {/* Right: Real Image Card & Supporting Clinical Setup */}
        <div className="lg:col-span-5 gsap-hero-image relative">
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#1a1816] shadow-md transition-shadow duration-300">
            <picture>
              <source type="image/webp" srcSet="/hero-clinical-bag.webp" />
              <img
                alt="Kit profissional higienizado para atendimento domiciliar com toalhas e instrumentais esterilizados"
                className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover"
                src="/hero-clinical-bag.jpg"
                width={600}
                height={460}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>

          {/* Supporting Clinical Care Setup Preview Card */}
          <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 lg:-bottom-6 lg:-left-6 bg-surface/95 dark:bg-[#1e1b19]/95 backdrop-blur-md p-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] shadow-lg max-w-xs flex items-center gap-3.5 z-10 transition-transform duration-200">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08]">
              <img
                src="/clinical-care-setup.jpg"
                alt="Instrumentos cirúrgicos autoclavados e insumos descartáveis em envelope selado"
                className="w-full h-full object-cover"
                loading="lazy"
                width={72}
                height={72}
              />
            </div>
            <div className="flex flex-col justify-center min-w-0 pr-1">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-sage">
                Biossegurança Cirúrgica
              </span>
              <p className="text-xs text-on-surface dark:text-white font-medium leading-snug truncate">
                Envelopes cirúrgicos selados
              </p>
              <span className="text-[11px] text-text-secondary font-light leading-tight mt-0.5">
                Instrumentos abertos na sua presença
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
