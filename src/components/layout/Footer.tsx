import React from 'react'
import { getWhatsAppUrl } from '@/utils/whatsapp'

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-12 px-6 border-t border-black/[0.08] dark:border-white/[0.08] bg-[#FAF8F5] dark:bg-[#11100F] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col divide-y divide-black/[0.08] dark:divide-white/[0.08] md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-12 md:gap-10 lg:gap-8 pb-12 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Col 1: Identidade / Marca */}
          <div className="py-6 first:pt-0 md:py-0 lg:col-span-4 flex flex-col items-start">
            <span className="font-serif text-lg lg:text-xl font-normal tracking-wide text-on-surface dark:text-white mb-3">
              Angélica Eduarda
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-light max-w-[34ch] text-pretty mb-4">
              Podologia clínica e cuidado especializado para pés e mãos no conforto e silêncio da
              sua casa.
            </p>
            <span className="text-[11px] text-accent font-medium tracking-wide">
              Atendimento Domiciliar • Mococa, SP
            </span>
          </div>

          {/* Col 2: Navegação Rápida */}
          <div className="py-6 md:py-0 lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Navegação Rápida
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-light">
              <li>
                <a
                  href="#inicio"
                  className="hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#procedimentos"
                  className="hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  Procedimentos & Valores
                </a>
              </li>
              <li>
                <a
                  href="#tecnologia"
                  className="hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  Biossegurança & Recursos
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                >
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Biossegurança Hospitalar */}
          <div className="py-6 md:py-0 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Biossegurança Hospitalar
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-light">
              <li>Autoclave cirúrgica a 134°C</li>
              <li>Materiais 100% descartáveis</li>
              <li>Envelopes estéreis abertos na sua frente</li>
              <li>Taxa R$ 0 de deslocamento em Mococa</li>
            </ul>
          </div>

          {/* Col 4: Atendimento & Contato */}
          <div className="py-6 last:pb-0 md:py-0 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Atendimento & Contato
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 font-light leading-relaxed mb-3">
              Sessões com hora marcada de segunda a sábado. Agendamentos pelo site.
            </p>
            <a
              href={getWhatsAppUrl(
                'Olá, Angélica! Gostaria de esclarecer uma dúvida sobre o atendimento.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium transition-colors group focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
            >
              <span>Falar no WhatsApp</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Linha inferior de direitos autorais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary dark:text-slate-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} Angélica Eduarda Amaro Bruscagim. Todos os direitos
            reservados.
          </p>
          <p>Mococa, São Paulo, Brasil.</p>
        </div>
      </div>
    </footer>
  )
}
