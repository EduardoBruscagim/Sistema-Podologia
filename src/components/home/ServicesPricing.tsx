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
          Mococa, SP • Atendimento Domiciliar Sem Taxa de Visita
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
        <div className="service-card p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-accent/30 dark:border-accent/40 hover:border-accent/60 transition-colors duration-200 shadow-xs flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent">
                Mais Procurado
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-accent">
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
                <span>Sem taxa de deslocamento em Mococa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Cuidado dos Pés */}
        <div className="service-card p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/40 transition-colors duration-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary dark:text-slate-400">
                Podologia Clínica
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage dark:text-[#7EA08E]">
                <Footprints aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
              Cuidado dos Pés
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-5 font-light">
              Duração média de 50 minutos
            </span>

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-sans text-text-secondary dark:text-slate-400 font-light">
                  R$
                </span>
                <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                  50
                </span>
                <span className="text-xs text-text-secondary dark:text-slate-400 font-light ml-2">
                  podologia e pedicure
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
              Tratamento preventivo para alívio de dor, desbaste de calosidades e cuidado de cantos
              encravados com total suavidade.
            </p>

            <ul
              aria-label="Benefícios do Cuidado dos Pés"
              className="flex flex-col gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-light"
            >
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Desencravamento preventivo e alívio de pressão</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Remoção segura de calosidades e lixamento</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Higienização cirúrgica e corte anatômico</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Esmaltação inclusa se desejar pintar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3: Cuidado das Mãos */}
        <div className="service-card p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border border-black/[0.08] dark:border-white/[0.08] hover:border-accent/40 transition-colors duration-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-text-secondary dark:text-slate-400">
                Manicure Cuidadosa
              </span>
              <div className="service-icon w-9 h-9 rounded-full bg-sage-subtle dark:bg-[#19261F] flex items-center justify-center text-sage dark:text-[#7EA08E]">
                <Hand aria-hidden="true" className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
              Cuidado das Mãos
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-5 font-light">
              Duração média de 40 minutos
            </span>

            {/* Preço */}
            <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-sans text-text-secondary dark:text-slate-400 font-light">
                  R$
                </span>
                <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                  40
                </span>
                <span className="text-xs text-text-secondary dark:text-slate-400 font-light ml-2">
                  manicure individual
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
              Unhas alinhadas, cutículas hidratadas com delicadeza e esmaltação uniforme e duradoura
              com a cor da sua escolha.
            </p>

            <ul
              aria-label="Benefícios do Cuidado das Mãos"
              className="flex flex-col gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-light"
            >
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Corte, lixamento e alinhamento do formato</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Cutilagem higiênica sem agressão à pele</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Esmaltação com secagem rápida</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Alicates esterilizados e lixas descartáveis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Faixa de transparência e garantia com alto contraste */}
      <div className="services-footer p-6 rounded-xl bg-white dark:bg-[#161413] border border-black/[0.08] dark:border-white/[0.08] text-center shadow-xs">
        <p className="text-xs sm:text-sm text-on-surface dark:text-white/90 font-light max-w-[45ch] mx-auto leading-relaxed text-pretty">
          Atendimento domiciliar em Mococa, SP. Deslocamento incluso em qualquer bairro. Pagamento
          realizado ao término da sessão via PIX ou dinheiro. Agendamento exclusivo pelo site.
        </p>
      </div>
    </section>
  )
}
