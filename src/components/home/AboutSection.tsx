import React, { useRef } from 'react'
import { initAboutAnimation } from '@/animations/about'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Heart, ShieldCheck, Calendar, Check, ArrowUpRight } from 'lucide-react'

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useSectionAnimation(sectionRef, initAboutAnimation, '.about-reveal')

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24 scroll-mt-28"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: Cartão de Apresentação e Credenciais Humanas */}
        <div className="about-reveal lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border p-7 sm:p-8 flex flex-col items-center text-center shadow-xs">
            {/* Emblema Editorial com Monograma */}
            <div className="relative mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-surface-variant dark:bg-surface flex items-center justify-center border border-surface-border text-accent">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                  aria-hidden="true"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.4"
                  />
                  <path
                    d="M32 16L43 46H37.8L35.2 39H28.8L26.2 46H21L32 16ZM32 24.2L29.6 35H34.4L32 24.2Z"
                    className="fill-on-surface"
                  />
                  <circle cx="43" cy="20" r="3" className="fill-accent" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-1 px-3 py-1 rounded-full bg-sage text-white text-[11px] uppercase font-semibold tracking-wider shadow-xs">
                Mococa · SP
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-on-surface mb-1">
              Angélica Eduarda
            </h3>
            <span className="font-sans text-xs uppercase tracking-[0.16em] text-accent font-medium mb-4">
              Podologia & Manicure em Domicílio
            </span>

            {/* Credenciais em pílulas discretas */}
            <div className="w-full flex flex-col gap-2 pt-4 border-t border-surface-border text-left">
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant font-light">
                <Calendar aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
                <span>Atuação profissional em Mococa desde 2016</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant font-light">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
                <span>Instrumentos cirúrgicos esterilizados em autoclave</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant font-light">
                <Heart aria-hidden="true" className="w-4 h-4 text-accent shrink-0" />
                <span>Atenção e carinho especial para idosos e acamados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: História, Filosofia de Atendimento e Confiança */}
        <div className="about-reveal lg:col-span-7 flex flex-col items-start text-left">
          <h2
            id="about-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-6 text-balance"
          >
            Cuidado dedicado com a confiança de quem atende na sua casa
          </h2>

          <div className="space-y-4 text-base text-on-surface-variant font-light leading-relaxed mb-8 max-w-[54ch] text-pretty">
            <p>
              Sou <strong>Angélica Eduarda</strong>. Desde 2016 dedico minha vocação ao cuidado da
              saúde dos pés e das mãos de famílias em Mococa. Entendo que abrir as portas da sua
              residência requer confiança absoluta, pontualidade e discrição.
            </p>
            <p>
              Meu atendimento foi desenhado para quem busca comodidade sem abrir mão do padrão
              clínico hospitalar: levo todos os aparelhos, toalhas descartáveis e envelopes
              cirúrgicos lacrados até a sua sala ou quarto.
            </p>
            <p>
              Tenho um carinho especial por atender idosos, pessoas com sensibilidade nos pés ou
              restrições de mobilidade. Todo o procedimento — do corte correto ao desencravamento
              preventivo — é realizado sem pressa e com a máxima paciência.
            </p>
          </div>

          {/* Destaques Práticos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
            <div className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Sem taxa de visita em toda Mococa</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Horário individual reservado</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Materiais abertos na sua frente</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Pagamento no final por PIX ou dinheiro</span>
            </div>
          </div>

          {/* Ação Direta de Contato Humanizado */}
          <a
            href={getWhatsAppUrl(
              'Olá, Angélica! Li sobre seu atendimento no site e gostaria de conversar sobre um horário em domicílio em Mococa.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com Angélica Eduarda no WhatsApp (abre em nova aba)"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] cursor-pointer"
          >
            <span>Falar com a Angélica</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
