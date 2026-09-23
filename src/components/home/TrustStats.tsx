import React, { useRef } from 'react'
import { initStatsAnimation } from '@/animations/stats'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

/**
 * Seção de Estatísticas e Credenciais de Confiança (TrustStats).
 *
 * ### Características de Acessibilidade e Semântica:
 * 1. **Lista de Definições Semântica (`<dl>`, `<dt>`, `<dd>`):**
 *    - Estrutura acessível para pares de termos e valores métricos.
 * 2. **Suporte a Leitores de Tela:**
 *    - O valor numérico animado utiliza `aria-hidden="true"` enquanto um texto estático
 *      completo (`sr-only`) é providenciado para anunciar "Mais de 25.000 atendimentos"
 *      sem confusão durante a animação de contagem.
 * 3. **Tipografia Numérica Tabular:**
 *    - A classe `tabular-nums` garante larguras fixas de caracteres numéricos,
 *      evitando tremor/oscilação horizontal durante o rollup numérico do GSAP.
 */

export const TrustStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Inicia a animação de contagem progressiva e revelação quando o bloco atinge a viewport
  useSectionAnimation(sectionRef, initStatsAnimation, '.stat-reveal')

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-stats-heading"
      className="max-w-6xl mx-auto px-6 pt-4 pb-12 lg:pb-16"
    >
      <h2 id="trust-stats-heading" className="sr-only">
        Estatísticas e Credenciais
      </h2>

      <dl className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-surface-border bg-pure-white dark:bg-surface-variant overflow-hidden">
        {/* ----------------------------------------------------------------- */}
        {/* Célula 1: Destaque de Atendimentos Realizados (+25.000)           */}
        {/* ----------------------------------------------------------------- */}

        <div className="stat-block stat-reveal col-span-1 bg-pure-white dark:bg-surface-variant border-b md:border-b-0 md:border-r border-surface-border p-6 sm:p-8 lg:p-10 flex flex-col justify-center transition-colors duration-200">
          <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-sage mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage inline-block" aria-hidden="true" />
            Atendimentos realizados
          </dt>
          <dd className="m-0 flex flex-col">
            <span className="sr-only">Mais de 25.000 atendimentos</span>
            <span
              className="stat-counter-value font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-on-surface tracking-tight leading-none tabular-nums"
              aria-hidden="true"
            >
              +25.000
            </span>
            <span className="mt-2 text-xs sm:text-sm text-text-secondary leading-snug">
              De segunda a sábado, por toda Mococa, desde 2016.
            </span>
          </dd>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Célula 2: Deslocamento Cortesia (Taxa R$ 0 em Mococa)             */}
        {/* ----------------------------------------------------------------- */}

        <div className="stat-block stat-reveal col-span-1 bg-pure-white dark:bg-surface-variant p-6 sm:p-8 lg:p-10 flex flex-col justify-center transition-colors duration-200">
          <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden="true" />
            Taxa de visita
          </dt>
          <dd className="m-0 flex flex-col">
            <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-on-surface tracking-tight leading-none tabular-nums">
              R$ 0
            </span>
          </dd>
        </div>
      </dl>
    </section>
  )
}
