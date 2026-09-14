import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles, Footprints, Hand, Check } from 'lucide-react'
import { initServicesAnimation } from '@/animations/services'
import { applyReducedMotion } from '@/animations/reducedMotion'

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

  return (
    <section
      ref={servicesSectionRef}
      className="max-w-6xl mx-auto px-6 py-12"
      id="procedimentos"
      aria-labelledby="services-pricing-heading"
    >
      <div className="services-header text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-semibold text-clinical-blue dark:text-sky-400 mb-3">
          Mococa, SP
        </div>
        <h2
          id="services-pricing-heading"
          className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight mb-4 text-balance"
        >
          Procedimentos e valores
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal mb-3">
          Corte correto de unhas, alívio de cantos encravados, cutilagem e esmaltação. Estrutura
          higienizada levada até a sua casa, sem taxa de visita.
        </p>
        <p className="text-xs sm:text-sm font-semibold text-primary dark:text-sky-300">
          Sem taxa de deslocamento em nenhum bairro de Mococa, SP. Pagamento via PIX ou em dinheiro.
        </p>
      </div>

      {/* 3 Cards de Procedimentos */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Pé e Mão Completo */}
        <div className="service-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col relative overflow-hidden">
          <div className="absolute top-5 right-5">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold tracking-wide">
              Mais pedido
            </span>
          </div>
          <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
            <Sparkles aria-hidden="true" className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1.5">
            Pé e Mão Completo
          </h3>
          <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
            Duração média de 1h30
          </span>

          {/* Preço transparente */}
          <div className="my-4 pt-3 pb-3 border-y border-surface-border dark:border-slate-800">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface dark:text-white tracking-tight tabular-nums">
                R$ 75
              </span>
              <span className="text-xs font-semibold text-text-secondary dark:text-slate-400">
                Pé e mão completo
              </span>
            </div>
            <p className="text-xs text-text-secondary dark:text-slate-400 font-medium mt-1">
              Sem taxa de deslocamento em Mococa, SP. Pagamento via PIX ou em dinheiro.
            </p>
          </div>

          <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
            Cuidado completo para unhas dos pés e das mãos na mesma visita, com corte correto,
            cutilagem suave e esmaltação.
          </p>
          <ul
            aria-label="Benefícios do procedimento Pé e Mão Completo"
            className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
          >
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Corte correto e alívio de cantos de unhas</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Cutilagem e esmaltação completa para pés e mãos</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Alicates esterilizados e toalhas descartáveis</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Sem taxa de deslocamento em nenhum bairro de Mococa</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Cuidado dos Pés */}
        <div className="service-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
            <Footprints aria-hidden="true" className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1">
            Cuidado dos Pés (Podologia e Pedicure)
          </h3>
          <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
            Duração média de 50 minutos
          </span>

          {/* Preço transparente */}
          <div className="my-4 pt-3 pb-3 border-y border-surface-border dark:border-slate-800">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface dark:text-white tracking-tight tabular-nums">
                R$ 50
              </span>
              <span className="text-xs font-semibold text-text-secondary dark:text-slate-400">
                Podologia e pedicure
              </span>
            </div>
            <p className="text-xs text-text-secondary dark:text-slate-400 font-medium mt-1">
              Sem taxa de deslocamento em Mococa, SP. Pagamento via PIX ou em dinheiro.
            </p>
          </div>

          <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
            Tratamento para aliviar dores, desbastar calosidades e cuidar de unhas encravadas de
            forma preventiva e suave.
          </p>
          <ul
            aria-label="Benefícios do Cuidado dos Pés"
            className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
          >
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Desencravamento preventivo e alívio de pressão no canto da unha</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Lixamento seguro e remoção de calosidades</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Higienização e corte correto das unhas</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Esmaltação inclusa se você desejar pintar</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Cuidado das Mãos */}
        <div className="service-card p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary dark:text-sky-300 mb-5">
            <Hand aria-hidden="true" className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1">
            Cuidado das Mãos (Manicure)
          </h3>
          <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
            Duração média de 40 minutos
          </span>

          {/* Preço transparente */}
          <div className="my-4 pt-3 pb-3 border-y border-surface-border dark:border-slate-800">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface dark:text-white tracking-tight tabular-nums">
                R$ 40
              </span>
              <span className="text-xs font-semibold text-text-secondary dark:text-slate-400">
                Manicure
              </span>
            </div>
            <p className="text-xs text-text-secondary dark:text-slate-400 font-medium mt-1">
              Sem taxa de deslocamento em Mococa, SP. Pagamento via PIX ou em dinheiro.
            </p>
          </div>

          <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
            Unhas alinhadas, cutículas tratadas com suavidade e esmaltação duradoura com a cor da
            sua preferência.
          </p>
          <ul
            aria-label="Benefícios do Cuidado das Mãos"
            className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
          >
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Corte, lixamento e alinhamento do formato</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Cutilagem higiênica sem machucar</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Esmaltação com secagem rápida</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="w-4 h-4 text-primary dark:text-sky-300 shrink-0"
              />
              <span>Alicates esterilizados e lixas descartáveis</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Faixa de transparência abaixo dos cards */}
      <div className="services-footer p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-surface-border dark:border-slate-800 text-center text-xs text-on-surface-variant dark:text-slate-300 shadow-2xs">
        Atendimento em domicílio em Mococa, SP. Deslocamento incluso em qualquer bairro. Pagamento
        feito ao término da sessão, em dinheiro ou PIX. Agendamento exclusivo pelo painel do site.
      </div>
    </section>
  )
}
