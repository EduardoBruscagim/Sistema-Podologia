import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Footprints, Hand, Check, MapPin } from 'lucide-react'
import { initServicesAnimation } from '@/animations/services'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { SERVICES, type ServiceItem } from '@/data/services'

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

  const renderServiceIcon = (icon: ServiceItem['icon']) => {
    switch (icon) {
      case 'sparkles':
        return <Sparkles aria-hidden="true" className="w-4 h-4" />
      case 'footprints':
        return <Footprints aria-hidden="true" className="w-4 h-4" />
      case 'hand':
        return <Hand aria-hidden="true" className="w-4 h-4" />
    }
  }

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
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Corte anatômico, alívio de cantos, desbaste de calosidades e manicure completa.
          Atendimento na sua casa sem cobrança de deslocamento em Mococa.
        </p>
      </div>

      {/* 3 Cards de Procedimentos mapeados a partir de services.ts */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`service-card group p-6 sm:p-8 rounded-xl bg-white dark:bg-[#161413] border transition-[border-color,background-color] duration-300 shadow-xs flex flex-col justify-between ${
              service.isFeatured
                ? 'border-accent/40 hover:border-accent hover:bg-accent/[0.02] dark:hover:bg-accent/[0.04]'
                : 'border-black/[0.08] dark:border-white/[0.08] hover:border-accent/50 hover:bg-accent/[0.015] dark:hover:bg-accent/[0.03]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                    service.isFeatured
                      ? 'bg-accent/10 text-accent dark:bg-accent/20'
                      : 'bg-black/5 dark:bg-white/5 text-text-secondary'
                  }`}
                >
                  {service.badge}
                </span>
                <div
                  className={`service-icon w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    service.isFeatured
                      ? 'bg-accent/10 dark:bg-accent/20 text-accent group-hover:bg-accent group-hover:text-white'
                      : 'bg-sage-subtle dark:bg-[#19261F] text-sage group-hover:bg-accent/15 group-hover:text-accent'
                  }`}
                >
                  {renderServiceIcon(service.icon)}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-normal text-on-surface dark:text-white mb-1.5">
                {service.title}
              </h3>
              <span className="text-xs text-text-secondary block mb-5 font-light">
                {service.duration}
              </span>

              {/* Preço */}
              <div className="mb-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-sans text-text-secondary font-light">R$</span>
                  <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface dark:text-white tracking-tight tabular-nums">
                    {service.price}
                  </span>
                  <span className="text-xs text-text-secondary font-light ml-2">
                    {service.priceSuffix}
                  </span>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-light max-w-[36ch] text-pretty">
                {service.description}
              </p>

              <ul
                aria-label={`Benefícios do procedimento ${service.title}`}
                className="flex flex-col gap-3 text-xs text-on-surface-variant font-light"
              >
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-text-secondary font-light">Deslocamento</span>
              <span className="text-xs font-medium text-sage">Taxa R$ 0 em Mococa</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reafirmação de Deslocamento e Materiais */}
      <div className="services-footer p-6 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-surface-variant/30 dark:bg-[#161413]/30 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-light">
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
