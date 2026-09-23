import React, { useRef } from 'react'
import { Sun, Zap, ShieldCheck, Shield, Thermometer, Trash2 } from 'lucide-react'
import { initTechnologyAnimation } from '@/animations/technology'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

/**
 * Seção de Higiene, Biossegurança e Equipamentos (TechnologySection).
 *
 * ### Destaques de Comunicação e Autoridade Clínica:
 * 1. **Célula Principal (Full Bleed Image):**
 *    - Apresenta a garantia máxima de esterilização hospitalar em autoclave a 134°C,
 *      envelopes com indicador de esterilização abertos no momento do atendimento
 *      e descarte estrito de lixas, lâminas e toalhas de uso único.
 *    - A fotografia em sangria total (`/clinical-care-setup.webp`) utiliza gradientes de fusão
 *      suaves (`bg-gradient-to-r` e `bg-gradient-to-b`) para integração harmoniosa com o tema claro e escuro.
 * 2. **Cards Secundários de Equipamentos Portáteis:**
 *    - **Fototerapia LED de Luz Vermelha:** Aparelho portátil que acelera a cicatrização e acalma inflamações.
 *    - **Cabine LED UV Portátil:** Secagem ultrarrápida de esmalte para conveniência domiciliar imediata.
 */

export const TechnologySection: React.FC = () => {
  const techSectionRef = useRef<HTMLElement | null>(null)

  // Dispara animações de ScrollTrigger nos cards tecnológicos e no destaque de biossegurança
  useSectionAnimation(techSectionRef, initTechnologyAnimation, [
    '.tech-header',
    '.tech-card',
    '.tech-featured',
  ])

  return (
    <section
      ref={techSectionRef}
      aria-labelledby="tech-heading"
      className="max-w-6xl mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      id="tecnologia"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Cabeçalho Editorial da Seção de Higiene                          */}
      {/* ----------------------------------------------------------------- */}

      <div className="tech-header mb-12 lg:mb-16 max-w-2xl">
        <h2
          id="tech-heading"
          className="font-serif text-[2rem] sm:text-4xl lg:text-[3rem] font-normal text-on-surface tracking-[-0.02em] leading-[1.12] mb-4 text-balance"
        >
          Higiene e equipamentos
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Levo tudo de mais seguro e moderno até você.
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Bento Grid: Célula Principal de Autoclave + 2 Cards Secundários   */}
      {/* ----------------------------------------------------------------- */}

      <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Célula Principal de Autoridade: Esterilização em Autoclave e 100% Descartáveis */}
        <div className="tech-featured col-span-1 md:col-span-2 lg:col-span-12 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border hover:border-accent/40 transition-[border-color,background-color] duration-300 relative overflow-hidden flex flex-col lg:block">
          {/* Conteúdo textual e indicadores de autoridade */}
          <div className="relative z-10 lg:max-w-[56%] xl:max-w-[54%] p-6 sm:p-8 lg:p-10 flex flex-col lg:justify-between lg:h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-md bg-accent/10 text-accent dark:bg-accent/20">
                  <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  Esterilização
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-surface-variant dark:bg-surface-border text-text-secondary dark:text-on-surface-variant">
                  Autoclave
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-surface-variant dark:bg-surface-border text-text-secondary dark:text-on-surface-variant">
                  Descartáveis
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-on-surface mb-4 leading-tight">
                Instrumentos esterilizados e materiais descartáveis
              </h3>

              <p className="text-sm sm:text-base text-on-surface-variant font-light leading-relaxed mb-6 sm:mb-8 max-w-[50ch] text-pretty">
                Meus alicates de metal são esterilizados em autoclave e ficam em envelopes lacrados
                que eu só abro aí na sua frente. Lixas, lâminas, toalhas e luvas vão pro lixo depois
                do uso.
              </p>
            </div>

            {/* Indicadores de autoridade com ícones em círculo */}
            <ul
              role="list"
              aria-label="Garantias de esterilização e biossegurança"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-surface-border"
            >
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Thermometer aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-medium text-on-surface">Autoclave</strong>
                  <span className="text-text-secondary font-light">
                    Esterilização em alta temperatura
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Shield aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-medium text-on-surface">Envelopes lacrados</strong>
                  <span className="text-text-secondary font-light">
                    Abertos no início do atendimento
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Trash2 aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-medium text-on-surface">Descartáveis</strong>
                  <span className="text-text-secondary font-light">
                    Lixas, toalhas e luvas de uso único
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Imagem sangrando (bleed total) à direita com gradiente de mistura perfeito */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[54%] xl:w-[56%] w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto overflow-hidden">
            <img
              src="/clinical-care-setup.webp"
              alt="Mesa de atendimento clínico domiciliar com instrumentais esterilizados em envelope cirúrgico e descartáveis"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              width={1200}
              height={896}
            />
            {/* Gradiente de transição suave / mistura perfeita com tokens semânticos */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 xl:w-60 bg-gradient-to-r from-pure-white via-pure-white/80 to-transparent dark:from-surface-variant dark:via-surface-variant/80 dark:to-transparent pointer-events-none" />
            <div className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-pure-white via-pure-white/80 to-transparent dark:from-surface-variant dark:via-surface-variant/80 dark:to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Card Secundário 1: Fototerapia LED */}
        <div className="tech-card col-span-1 md:col-span-1 lg:col-span-6 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border hover:border-accent/40 transition-[border-color,background-color] duration-300 overflow-hidden flex flex-col sm:flex-row group">
          <div className="w-full sm:w-[42%] aspect-[16/10] sm:aspect-auto shrink-0 relative overflow-hidden bg-surface-variant/30">
            <img
              src="/tech-fototerapia.webp"
              alt="Aparelho de fototerapia LED de luz vermelha para podologia"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none sm:hidden" />
          </div>

          <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-md bg-accent/10 dark:bg-accent/20 text-accent">
                  Fototerapia
                </span>
                <div className="tech-icon w-8 h-8 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent">
                  <Sun aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                LED de luz vermelha
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                Acelera a cicatrização e acalma qualquer desconforto nas unhas.
              </p>
            </div>
          </div>
        </div>

        {/* Card Secundário 2: Cabine UV Portátil */}
        <div className="tech-card col-span-1 md:col-span-1 lg:col-span-6 rounded-xl bg-pure-white dark:bg-surface-variant border border-surface-border hover:border-accent/40 transition-[border-color,background-color] duration-300 overflow-hidden flex flex-col sm:flex-row group">
          <div className="w-full sm:w-[42%] aspect-[16/10] sm:aspect-auto shrink-0 relative overflow-hidden bg-surface-variant/30">
            <img
              src="/tech-cabine-uv.webp"
              alt="Cabine LED UV portátil para secagem rápida de esmalte"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none sm:hidden" />
          </div>

          <div className="flex-1 p-6 sm:p-7 flex flex-col justify-center">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-md bg-sage-subtle text-sage">
                  Secagem
                </span>
                <div className="tech-icon w-8 h-8 rounded-lg bg-sage-subtle text-sage flex items-center justify-center">
                  <Zap aria-hidden="true" className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface mb-2 leading-snug">
                Cabine UV portátil
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light text-pretty">
                Seca o esmalte na hora. Você já sai calçando o sapato que quiser sem borrar nada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
