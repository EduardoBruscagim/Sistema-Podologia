import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Footprints, Hand, Check, MapPin, AlertCircle } from 'lucide-react'
import { initServicesAnimation } from '@/animations/services'
import { applyReducedMotion } from '@/animations/reducedMotion'
import { SERVICES, type ServiceItem } from '@/data/services'
import { getWhatsAppUrl, getWhatsAppUrgencyUrl } from '@/utils/whatsapp'

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
        <h2
          id="services-pricing-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Procedimentos e valores
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Cuidados especializados com instrumentos esterilizados e taxa zero de visita em toda Mococa, SP.
        </p>
      </div>

      {/* 3 Cards de Procedimentos mapeados a partir de services.ts */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`service-card group p-6 sm:p-8 rounded-xl bg-pure-white dark:bg-surface-variant border transition-[border-color,background-color] duration-300 flex flex-col justify-between ${
              service.isFeatured
                ? 'border-accent/40 hover:border-accent hover:bg-accent/[0.02] dark:hover:bg-accent/[0.04]'
                : 'border-surface-border hover:border-accent/50 hover:bg-accent/[0.015] dark:hover:bg-accent/[0.03]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                    service.isFeatured
                      ? 'bg-accent/10 text-accent dark:bg-accent/20'
                      : 'bg-surface-variant text-text-secondary dark:bg-surface-border dark:text-on-surface-variant'
                  }`}
                >
                  {service.badge}
                </span>
                <div
                  className={`service-icon w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    service.isFeatured
                      ? 'bg-accent/10 dark:bg-accent/20 text-accent group-hover:bg-accent group-hover:text-on-accent'
                      : 'bg-sage-subtle text-sage group-hover:bg-accent/15 group-hover:text-accent'
                  }`}
                >
                  {renderServiceIcon(service.icon)}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-normal text-on-surface mb-1.5">
                {service.title}
              </h3>
              <span className="text-xs text-text-secondary block mb-5 font-light">
                {service.duration}
              </span>

              {/* Preço */}
              <div className="mb-6 pb-6 border-b border-surface-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-sans text-text-secondary font-light">R$</span>
                  <span className="font-serif text-4xl lg:text-5xl font-light text-on-surface tracking-tight tabular-nums">
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

            <div className="pt-6 mt-6 border-t border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary font-light">Deslocamento</span>
                <span className="text-xs font-medium text-sage">Taxa R$ 0 em Mococa</span>
              </div>
              <a
                href={getWhatsAppUrl(
                  `Olá, Angélica! Gostaria de agendar o atendimento de ${service.title} em Mococa.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Agendar procedimento ${service.title} pelo WhatsApp (abre em nova aba)`}
                className={`w-full min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer mt-4 ${
                  service.isFeatured
                    ? 'bg-accent text-on-accent hover:bg-accent-hover active:scale-[0.98]'
                    : 'bg-surface-variant text-on-surface hover:bg-accent hover:text-on-accent active:scale-[0.98]'
                }`}
              >
                Agendar Horário
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Chamada para Urgência / Dor de Unha Encravada */}
      <div className="mb-6 p-5 sm:p-6 rounded-xl border border-accent/25 bg-accent/5 dark:bg-accent/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle aria-hidden="true" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-on-surface font-normal leading-snug">
              Está com dor aguda ou unha encravada?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed mt-0.5 max-w-[55ch]">
              Atendimento podológico em domicílio para alívio imediato e desencravamento preventivo cuidadoso em Mococa.
            </p>
          </div>
        </div>
        <a
          href={getWhatsAppUrgencyUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir atendimento de urgência para unha encravada no WhatsApp (abre em nova aba)"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.12em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        >
          Atendimento de Urgência
        </a>
      </div>

      {/* Reafirmação de Deslocamento e Materiais */}
      <div className="services-footer p-6 rounded-xl border border-surface-border bg-surface-variant/30 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-light">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-sage font-medium" aria-hidden="true">
            •
          </span>
          <span>
            Os instrumentos são esterilizados e os materiais descartáveis são abertos na hora do
            atendimento.
          </span>
        </div>
        <div className="font-sans text-xs font-medium text-on-surface shrink-0">
          Pagamento ao final por PIX ou dinheiro
        </div>
      </div>
    </section>
  )
}
