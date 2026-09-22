import React, { useRef, useEffect } from 'react'
import { Sparkles, Footprints, Hand, Check, AlertCircle } from 'lucide-react'
import { initServicesAnimation } from '@/animations/services'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { SERVICES, type ServiceItem } from '@/data/services'
import { getWhatsAppUrl, getWhatsAppUrgencyUrl } from '@/utils/whatsapp'

/**
 * Dicionário tipado de ícones correspondentes aos procedimentos clínicos.
 */

const SERVICE_ICONS: Record<
  ServiceItem['icon'],
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
> = {
  sparkles: Sparkles,
  footprints: Footprints,
  hand: Hand,
}

/**
 * Seção de Procedimentos e Valores (ServicesPricing).
 *
 * ### Características Técnicas e de UX:
 * 1. **Efeito Spotlight Seguidor de Cursor:**
 *    - Calcula a posição do mouse em relação ao card e define as variáveis CSS
 *      `--mouse-x` e `--mouse-y` via `requestAnimationFrame`.
 *    - O cancelamento prévio de frames pendentes (`cancelAnimationFrame`) garante
 *      60-120fps fluidos sem engasgos de renderização ou sobrecarga de CPU.
 * 2. **Destaque Editorial:**
 *    - O procedimento recomendado (`isFeatured`) recebe iluminação superior (`animate-border-sheen`)
 *      e contraste de borda proeminente.
 * 3. **Banner de Urgência Podológica:**
 *    - Bloco destacado com contato direto para dores agudas e unhas encravadas.
 * 4. **Garantia de Deslocamento:**
 *    - Exibição de taxa zero de deslocamento e confirmação de pagamento seguro ao final.
 */

export const ServicesPricing: React.FC = () => {
  const servicesSectionRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef<number | null>(null)

  // Inicializa animação em cascata dos cards e da faixa informativa
  useSectionAnimation(servicesSectionRef, initServicesAnimation, [
    '.services-header',
    '.service-card',
    '.services-footer',
  ])

  // Limpeza de qualquer frame de animação pendente no unmount do componente
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  /**
   * Atualiza as coordenadas do efeito radial de iluminação no card que recebe o cursor.
   * Utiliza requestAnimationFrame para throttle nativo e máxima performance.
   */

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const card = e.currentTarget
    const clientX = e.clientX
    const clientY = e.clientY

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
      rafRef.current = null
    })
  }

  return (
    <section
      ref={servicesSectionRef}
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24 scroll-mt-28"
      id="procedimentos"
      aria-labelledby="services-pricing-heading"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Cabeçalho da Seção de Procedimentos                               */}
      {/* ----------------------------------------------------------------- */}

      <div className="services-header mb-12 lg:mb-16 max-w-2xl">
        <h2
          id="services-pricing-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-4 text-balance"
        >
          Procedimentos e valores
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Cuidados especializados com instrumentos esterilizados e taxa zero de visita em toda
          Mococa, SP.
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Grade de Cards de Procedimentos (3 Colunas)                       */}
      {/* ----------------------------------------------------------------- */}

      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {SERVICES.map((service) => {
          const ServiceIcon = SERVICE_ICONS[service.icon]
          return (
            <div
              key={service.id}
              onMouseMove={handleCardMouseMove}
              className={`service-card group p-6 sm:p-8 rounded-xl bg-pure-white dark:bg-surface-variant border transition-[border-color,background-color,box-shadow] duration-300 flex flex-col justify-between relative overflow-hidden ${
                service.isFeatured
                  ? 'border-accent/60 hover:border-accent hover:shadow-md'
                  : 'border-surface-border hover:border-accent/60 hover:shadow-sm'
              }`}
            >
              {/* Feixe sutil de iluminação de borda no procedimento recomendado */}
              {service.isFeatured && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent animate-border-sheen"
                />
              )}

              {/* Spotlight radial editorial que acompanha o cursor (visível e responsivo) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[radial-gradient(280px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(155,65,36,0.14),transparent_65%)] dark:bg-[radial-gradient(280px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(224,130,100,0.22),transparent_65%)]"
              />

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
                    <ServiceIcon aria-hidden="true" className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-normal text-on-surface mb-1.5">
                  {service.title}
                </h3>
                <span className="text-xs text-text-secondary block mb-5 font-light">
                  {service.duration}
                </span>

                {/* Preço e Forma de Cobrança */}
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

                {/* Lista de Itens Inclusos no Procedimento */}
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

              {/* Ação de Agendamento Específico com Deslocamento Cortesia */}
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
                  aria-label={`Agendar Horário: ${service.title} pelo WhatsApp (abre em uma nova aba)`}
                  className={`w-full min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer mt-4 ${
                    service.isFeatured
                      ? 'bg-accent text-on-accent hover:bg-accent-hover active:scale-[0.98]'
                      : 'bg-surface-variant text-on-surface hover:bg-accent hover:text-on-accent active:scale-[0.98]'
                  }`}
                >
                  Agendar Horário
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Chamada para Urgência / Dor de Unha Encravada                     */}
      {/* ----------------------------------------------------------------- */}

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
              Atendimento podológico em domicílio para alívio imediato e desencravamento preventivo
              cuidadoso em Mococa.
            </p>
          </div>
        </div>
        <a
          href={getWhatsAppUrgencyUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Atendimento de Urgência para unha encravada pelo WhatsApp (abre em uma nova aba)"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.12em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer"
        >
          Atendimento de Urgência
        </a>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Reafirmação de Deslocamento e Materiais                          */}
      {/* ----------------------------------------------------------------- */}

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
