import React from 'react'
import { getWhatsAppUrl } from '@/utils/whatsapp'

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-12 px-6 border-t border-black/[0.06] dark:border-white/[0.06] bg-surface transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="sr-only">Navegação e Informações Complementares</h2>
        {/* Grid Multicolunas que colapsa com divisores hairline no mobile */}
        <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.06] md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-12 md:gap-10 lg:gap-8 pb-12 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Col 1: Identidade / Marca */}
          <div className="py-6 first:pt-0 md:py-0 md:col-span-1 lg:col-span-4 flex flex-col items-start">
            <span className="font-serif text-lg lg:text-xl font-normal tracking-wide text-on-surface dark:text-white mb-3">
              Angélica Eduarda
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light max-w-[34ch] text-pretty mb-4">
              Podologia clínica e cuidado especializado para pés e mãos no conforto e silêncio da
              sua casa.
            </p>
            <span className="text-[11px] text-accent font-medium tracking-wide">
              Atendimento Domiciliar • Mococa, SP
            </span>
          </div>

          {/* Col 2: Navegação Rápida com Touch Targets Otimizados (min 44px) */}
          <div className="py-6 md:py-0 md:col-span-1 lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Navegação Rápida
            </h3>
            <nav aria-label="Navegação do rodapé">
              <ul className="flex flex-col text-xs text-on-surface-variant font-light">
                <li>
                  <a
                    href="#inicio"
                    className="py-2.5 inline-flex items-center min-h-[44px] hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="#procedimentos"
                    className="py-2.5 inline-flex items-center min-h-[44px] hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                  >
                    Procedimentos & Valores
                  </a>
                </li>
                <li>
                  <a
                    href="#tecnologia"
                    className="py-2.5 inline-flex items-center min-h-[44px] hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                  >
                    Biossegurança & Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="py-2.5 inline-flex items-center min-h-[44px] hover:text-accent transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
                  >
                    Perguntas Frequentes
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 3: Biossegurança Hospitalar */}
          <div className="py-6 md:py-0 md:col-span-1 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Biossegurança Hospitalar
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                <span>Autoclave cirúrgica a 134°C</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                <span>Materiais 100% descartáveis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                <span>Envelopes estéreis abertos na sua frente</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                <span>Taxa R$ 0 de deslocamento em Mococa</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Atendimento & Contato */}
          <div className="py-6 last:pb-0 md:py-0 md:col-span-1 lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.16em] font-medium text-on-surface dark:text-white mb-4">
              Atendimento & Contato
            </h3>
            <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-3">
              Sessões com hora marcada de segunda a sábado. Agendamentos diretamente pelo site.
            </p>
            <a
              href={getWhatsAppUrl(
                'Olá, Angélica! Gostaria de tirar uma dúvida sobre os atendimentos em domicílio.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dúvidas no WhatsApp (abre em uma nova aba)"
              className="inline-flex items-center gap-1.5 min-h-[44px] py-1 text-xs text-accent hover:text-accent-hover font-medium transition-colors group focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
            >
              <span>Dúvidas no WhatsApp</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Linha inferior de direitos autorais com alinhamento responsivo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-light text-center sm:text-left">
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
