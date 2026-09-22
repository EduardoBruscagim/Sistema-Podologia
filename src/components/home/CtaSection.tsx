import React, { useRef } from 'react'
import { initCtaAnimation } from '@/animations/cta'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { getWhatsAppUrl, getWhatsAppDoubtUrl } from '@/utils/whatsapp'

/**
 * Seção de Chamada para Ação Final (CtaSection).
 *
 * Oferece duas opções claras de conversão para o usuário:
 * 1. **Botão Primário (Terracotta Accent):** Abertura do WhatsApp com mensagem pronta de agendamento.
 * 2. **Botão Secundário (Borda Editorial):** Abertura do canal direto de esclarecimento de dúvidas prévias.
 */

export const CtaSection: React.FC = () => {
  const ctaSectionRef = useRef<HTMLElement | null>(null)

  // Inicia animação de revelação suave da chamada final
  useSectionAnimation(ctaSectionRef, initCtaAnimation, '.cta-reveal')

  return (
    <section
      ref={ctaSectionRef}
      className="max-w-4xl mx-auto px-6 pt-16 pb-20 lg:pt-20 lg:pb-24 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="cta-reveal flex flex-col items-center">
        <h2
          id="cta-heading"
          className="font-serif text-[2rem] sm:text-4xl lg:text-[3rem] font-normal text-on-surface tracking-[-0.02em] leading-[1.12] mb-5 max-w-[26ch] text-balance"
        >
          Agende seu atendimento em domicílio
        </h2>
        <p className="text-base text-on-surface-variant max-w-[48ch] mx-auto leading-relaxed mb-10 font-light text-pretty">
          Entre em contato pelo WhatsApp para agendar seu horário ou tirar dúvidas.
        </p>

        {/* Grupo de Ações de Conversão */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* Ação Primária: Agendamento */}
          <a
            href={getWhatsAppUrl(
              'Olá, Angélica! Li as informações no site e gostaria de agendar um atendimento em domicílio em Mococa.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar agendamento pelo WhatsApp (abre em uma nova aba)"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-[background-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer"
          >
            Solicitar Agendamento
          </a>

          {/* Ação Secundária: Dúvidas */}
          <a
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-pure-white dark:bg-surface-variant border border-surface-border hover:border-accent text-on-surface text-xs uppercase tracking-[0.14em] font-medium hover:bg-surface-variant active:scale-[0.98] transition-[background-color,border-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            href={getWhatsAppDoubtUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dúvidas no WhatsApp: falar com Angélica (abre em uma nova aba)"
          >
            Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
