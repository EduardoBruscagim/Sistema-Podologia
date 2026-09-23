import React, { useRef } from 'react'
import { initHeroAnimation } from '@/animations/hero'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

/**
 * Seção Principal de Apresentação (Hero Section).
 *
 * ### Decisões de Arquitetura e Performance:
 * 1. **Otimização Extrema de LCP (Largest Contentful Paint):**
 *    - A imagem principal (`/hero-clinical-bag.webp`) utiliza `loading="eager"`, `fetchPriority="high"`
 *      e `decoding="sync"` para que o navegador priorize imediatamente seu download e renderização.
 *    - Não há animação inicial de entrada com fade-in ou scale nesta seção para evitar qualquer
 *      atraso na medição do LCP pelos Core Web Vitals.
 * 2. **Scroll Parallax Dinâmico:**
 *    - O hook `useSectionAnimation` aciona um parallax suave na rolagem via `initHeroAnimation`,
 *      comportando-se de forma estática quando o usuário tiver `prefers-reduced-motion: reduce`.
 * 3. **Hierarquia Semântica:**
 *    - Contém o único `<h1>` da aplicação, marcando o propósito central do serviço.
 */

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)

  // Vincula a animação reativa de rolagem ao escopo da seção Hero
  useSectionAnimation(heroSectionRef, initHeroAnimation, ['.gsap-hero-image', '.gsap-hero-badge'])

  return (
    <section
      id="inicio"
      ref={heroSectionRef}
      className="max-w-6xl mx-auto px-6 pt-8 pb-16 lg:pt-12 lg:pb-20 scroll-mt-28"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ----------------------------------------------------------------- */}
        {/* Lado Esquerdo: Proposta de Valor e Chamada de Ação Primária        */}
        {/* ----------------------------------------------------------------- */}

        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1
            id="hero-title"
            className="font-serif text-[2.75rem] sm:text-5xl lg:text-[4rem] font-normal text-on-surface tracking-[-0.025em] leading-[1.08] mb-6 text-balance"
          >
            Sua podóloga e manicure, sem você precisar sair de casa.
          </h1>

          <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-[48ch] font-light text-pretty">
            Vou até você em qualquer cantinho de Mococa, e não cobro taxa de visita. Pode ficar
            tranquila.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
            <a
              href="#procedimentos"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-on-accent hover:bg-accent-hover active:scale-[0.98] text-xs uppercase tracking-[0.14em] font-medium transition-[background-color,transform] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Lado Direito: Imagem Principal de Atendimento e Card de Higiene   */}
        {/* ----------------------------------------------------------------- */}

        <div className="lg:col-span-5 gsap-hero-image relative">
          <div className="relative rounded-xl overflow-hidden border border-surface-border bg-surface-variant dark:bg-surface-variant">
            <img
              alt="Kit profissional higienizado para atendimento domiciliar com toalhas e instrumentais esterilizados"
              className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover transition-opacity duration-300"
              src="/hero-clinical-bag.webp"
              width={600}
              height={460}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          {/* Card Flutuante de Destaque: Envelopes Lacrados de Higiene */}
          <div className="gsap-hero-badge mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 lg:-bottom-6 lg:-left-6 bg-surface/95 dark:bg-surface-variant/95 backdrop-blur-md p-3 rounded-xl border border-surface-border max-w-xs flex items-center gap-3.5 z-10 transition-transform duration-200">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-lg overflow-hidden border border-surface-border">
              <img
                src="/clinical-care-setup-thumb.webp"
                alt="Instrumentos cirúrgicos autoclavados e insumos descartáveis em envelope selado"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={72}
                height={72}
              />
            </div>
            <div className="flex flex-col justify-center min-w-0 pr-1">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-sage">
                Higiene
              </span>
              <p className="text-xs text-on-surface font-medium leading-snug truncate">
                Envelopes lacrados
              </p>
              <span className="text-[11px] text-text-secondary font-light leading-tight mt-0.5">
                Abertos no momento do atendimento
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
