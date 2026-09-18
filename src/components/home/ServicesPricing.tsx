import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Footprints, Hand, Check, MapPin } from 'lucide-react'
import { initServicesAnimation } from '@/animations/services'
import { applyReducedMotion } from '@/animations/reducedMotion'

export const ServicesPricing: React.FC = () => {
  const servicesSectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const el = servicesSectionRef.current
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
            applyReducedMotion(['.services-header', '.service-card', '.services-footer'])
            return
          }

          return initServicesAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: servicesSectionRef },
  )

  return (
    <section
      ref={servicesSectionRef}
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24"
      id="procedimentos"
      aria-labelledby="services-pricing-heading"
    >
      <div className="services-header mb-12 lg:mb-16 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent mb-3">
          <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
          Atendimento Domiciliar em Mococa, SP
        </span>
        <h2
          id="services-pricing-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Procedimentos clínicos e valores.
        </h2>
        <p className="text-base text-on-surface-variant dark:text-slate-300 font-light leading-relaxed max-w-[48ch] text-pretty">
          Corte anatômico, alívio de cantos, desbaste de calosidades e manicure completa.
          Atendimento na sua casa sem cobrança de deslocamento em Mococa.
        </p>
      </div>

      {/* 3 Cards de Procedimentos */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {/* Card 1: Pé e Mão Completo */}
        <div className="service-card group p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-accent/40 dark:border-accent/40 hover:border-accent dark:hover:border-accent hover:bg-accent/[0.02] dark:hover:bg-accent/[0.04] transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent">
                Mais Procurado
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Sparkles aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
              Pé e Mão Completo
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-5 font-light">
              Duração média de 1h30
            </span>

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-sans text-text-secondary dark:text-slate-400 font-light">
                  R$
                </span>
                <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                  75
                </span>
                <span className="text-xs text-text-secondary dark:text-slate-400 font-light ml-2">
                  sessão completa
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
              Cuidado integral para unhas dos pés e das mãos na mesma visita, com corte correto,
              cutilagem suave e esmaltação.
            </p>

            <ul
              aria-label="Benefícios do procedimento Pé e Mão Completo"
              className="flex flex-col gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-light"
            >
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Corte correto e alívio de cantos de unhas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Cutilagem e esmaltação completa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Alicates esterilizados em autoclave e descartáveis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Secagem rápida com cabine UV sem custo extra</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-text-secondary dark:text-slate-400 font-light">
              Deslocamento
            </span>
            <span className="text-xs font-medium text-sage dark:text-[#7ea08e]">
              Taxa R$ 0 em Mococa
            </span>
          </div>
        </div>

        {/* Card 2: Apenas Pés */}
        <div className="service-card group p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/50 dark:hover:border-accent/50 hover:bg-accent/[0.015] dark:hover:bg-accent/[0.03] transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary dark:text-slate-400">
                Podologia Clínica
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage dark:text-[#7EA08E] transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                <Footprints aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
              Cuidado dos Pés
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-5 font-light">
              Duração média de 1h
            </span>

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-sans text-text-secondary dark:text-slate-400 font-light">
                  R$
                </span>
                <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                  45
                </span>
                <span className="text-xs text-text-secondary dark:text-slate-400 font-light ml-2">
                  sessão
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
              Foco clínico em corte anatômico de unhas, desbaste de calosidades plantares e alívio
              de desconfortos.
            </p>

            <ul
              aria-label="Benefícios do procedimento Cuidado dos Pés"
              className="flex flex-col gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-light"
            >
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Corte correto para evitar unhas encravadas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Desbaste suave de calosidades</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Hidratação podológica e esmaltação</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Esterilização hospitalar e descartáveis</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-text-secondary dark:text-slate-400 font-light">
              Deslocamento
            </span>
            <span className="text-xs font-medium text-sage dark:text-[#7ea08e]">
              Taxa R$ 0 em Mococa
            </span>
          </div>
        </div>

        {/* Card 3: Apenas Mãos */}
        <div className="service-card group p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/50 dark:hover:border-accent/50 hover:bg-accent/[0.015] dark:hover:bg-accent/[0.03] transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary dark:text-slate-400">
                Manicure Cuidadosa
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage dark:text-[#7EA08E] transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                <Hand aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
              Cuidado das Mãos
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-5 font-light">
              Duração média de 40min
            </span>

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-sans text-text-secondary dark:text-slate-400 font-light">
                  R$
                </span>
                <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                  35
                </span>
                <span className="text-xs text-text-secondary dark:text-slate-400 font-light ml-2">
                  sessão
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
              Manicure tradicional e cutilagem cuidadosa com materiais 100% esterilizados para a sua
              total segurança.
            </p>

            <ul
              aria-label="Benefícios do procedimento Cuidado das Mãos"
              className="flex flex-col gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-light"
            >
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Corte anatômico e lixamento técnico</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Cutilagem suave e hidratação das cutículas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Esmaltação de alta durabilidade</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Materiais individuais e descartáveis</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-text-secondary dark:text-slate-400 font-light">
              Deslocamento
            </span>
            <span className="text-xs font-medium text-sage dark:text-[#7ea08e]">
              Taxa R$ 0 em Mococa
            </span>
          </div>
        </div>
      </div>

      {/* Reafirmação de Deslocamento e Materiais */}
      <div className="services-footer p-6 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-surface-variant/30 dark:bg-[#161413]/30 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary dark:text-slate-400 font-light">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-sage font-medium" aria-hidden="true">
            •
          </span>
          <span>
            Todos os procedimentos incluem instrumentais esterilizados em autoclave e descartáveis
            abertos na sua frente.
          </span>
        </div>
        <div className="font-sans text-xs font-medium text-on-surface dark:text-white shrink-0">
          Pagamento no final via PIX ou dinheiro
        </div>
      </div>
    </section>
  )
}
