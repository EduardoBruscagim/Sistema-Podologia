import React, { useRef } from 'react'
import { initBentoAnimation } from '@/animations/bento'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { Home, MapPin, Clock, Check } from 'lucide-react'

/**
 * Seção de Funcionamento do Atendimento (Bento Grid).
 *
 * ### Filosofia e Estrutura Editorial:
 * Utiliza um padrão Bento Box responsivo (12 colunas em desktop):
 * - **Card 1 (Hero Bento - 7 colunas):** Destaque da comodidade do lar, praticidade e conforto
 *   sem necessidade de estruturas complexas (apenas cadeira e tomada).
 * - **Card 2 (5 colunas - superior):** Cobertura territorial completa em Mococa/SP sem taxa de visita.
 * - **Card 3 (5 colunas - inferior):** Pontualidade rigorosa e atendimento individual com atenção total.
 *
 * Microinterações de hover suaves (`initCardsHover`) são vinculadas via GSAP nos ponteiros finos.
 */

export const BentoGrid: React.FC = () => {
  const bentoSectionRef = useRef<HTMLElement | null>(null)

  // Dispara animações de entrada cascata e microinterações de hover nos cards
  useSectionAnimation(bentoSectionRef, initBentoAnimation, [
    '.bento-header',
    '.bento-card',
    '.bento-icon',
  ])

  return (
    <section
      ref={bentoSectionRef}
      aria-labelledby="bento-heading"
      className="max-w-6xl mx-auto px-6 py-12 lg:py-16"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Cabeçalho Editorial da Seção                                     */}
      {/* ----------------------------------------------------------------- */}

      <div className="bento-header mb-12 lg:mb-16 max-w-2xl">
        <h2
          id="bento-heading"
          className="font-serif text-[2rem] sm:text-4xl lg:text-[3rem] font-normal text-on-surface tracking-[-0.02em] leading-[1.12] mb-4 text-balance"
        >
          Como funciona o atendimento
        </h2>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Grade Bento: Card Principal à Esquerda + 2 Cards Empilhados      */}
      {/* ----------------------------------------------------------------- */}

      <div className="bento-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Card 1 (Destaque Principal / Hero Card do Bento): Conforto do lar */}
        <div className="bento-card lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                Praticidade Residencial
              </span>
              <div className="bento-icon w-10 h-10 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                <Home aria-hidden="true" className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mb-3 leading-snug">
              Conforto absoluto, sem bagunça
            </h3>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light max-w-[46ch] text-pretty">
              Pode deixar comigo: levo o motorzinho, as toalhas e todo o material descartável. Você
              só precisa escolher o lugar mais gostoso da casa pra sentar e me arrumar uma tomada
              pertinho.
            </p>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-surface-border"
            >
              <li className="flex items-center gap-2 text-xs text-text-secondary font-light">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Zero trânsito e zero espera</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-text-secondary font-light">
                <Check aria-hidden="true" className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>Tudo 100% esterilizado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Coluna Direita (2 Cards Complementares Empilhados) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Toda Mococa */}
          <div className="bento-card flex-1 p-6 sm:p-7 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-center shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                  Cobertura
                </span>
                <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                  <MapPin aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                Chego em qualquer bairro
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                Vou até a sua casa em qualquer bairro de Mococa pelo valor da tabela. Não tem
                pegadinha nem taxa escondida de deslocamento.
              </p>
            </div>
          </div>

          {/* Card 3: Pontualidade & Dedicação */}
          <div className="bento-card flex-1 p-6 sm:p-7 rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border flex flex-col justify-center shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                  Pontualidade
                </span>
                <div className="bento-icon w-9 h-9 rounded-lg bg-sage-subtle flex items-center justify-center text-sage">
                  <Clock aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                Seu momento de cuidado
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                O horário que a gente marcar é inteirinho seu. Faço o atendimento com muita calma,
                sem ficar olhando pro relógio ou dividindo a atenção.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
