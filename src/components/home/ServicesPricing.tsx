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
    },
    { scope: servicesSectionRef },
  )

  return (
    <section ref={servicesSectionRef} className="max-w-6xl mx-auto px-6 py-12" id="procedimentos">
      <div className="services-header text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-bold text-clinical-blue dark:text-sky-400 tracking-wider uppercase mb-3">
          ATENDIMENTO EM MOCOCA - SP
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight mb-4">
          Pés e mãos bem cuidados em casa.
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
          Corte anatômico, desencravamento suave, cutilagem e pintura de unhas. Levo toda a
          estrutura higienizada até você, sem taxa de deslocamento em Mococa.
        </p>
      </div>

      {/* 3 Cards de Procedimentos */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Pé e Mão Completo */}
        <div className="service-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-5 right-5">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold tracking-wide uppercase">
              Mais Pedido
            </span>
          </div>
          <div>
            <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <Sparkles aria-hidden="true" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1.5">
              Pé e Mão Completo
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
              Duração: Aproximadamente 1h30
            </span>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
              O pacote favorito dos clientes: cuidado completo para pés e mãos no conforto do seu
              lar, com corte anatômico e esmaltação cuidadosa.
            </p>
            <ul
              aria-label="Benefícios do procedimento Pé e Mão Completo"
              className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
            >
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Corte anatômico e desencravar suave</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Esmaltação e pintura completa (pés e mãos)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Materiais esterilizados em autoclave e descartáveis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Sem nenhuma taxa de deslocamento em Mococa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Cuidado dos Pés */}
        <div className="service-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <Footprints aria-hidden="true" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1">
              Cuidado dos Pés (Podologia &amp; Pedicure)
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
              Duração: Aproximadamente 50 min
            </span>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
              Alívio de dores, calosidades e unhas encravadas com delicadeza e precisão para você
              voltar a pisar com total leveza.
            </p>
            <ul
              aria-label="Benefícios do Cuidado dos Pés"
              className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
            >
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Desencravamento preventivo e alívio de dores</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Remoção de calosidades e lixamento seguro</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Higienização e corte anatômico das unhas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Pintura e esmaltação inclusa sem custo adicional</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3: Cuidado das Mãos */}
        <div className="service-card p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <div className="service-icon w-11 h-11 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-5">
              <Hand aria-hidden="true" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface dark:text-white mb-1">
              Cuidado das Mãos (Manicure)
            </h3>
            <span className="text-xs text-text-secondary dark:text-slate-400 block mb-3 font-semibold">
              Duração: Aproximadamente 40 min
            </span>
            <p className="text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed mb-6 font-normal">
              Unhas bem alinhadas, cutículas tratadas com suavidade e esmaltação duradoura para as
              suas mãos refletirem bem-estar.
            </p>
            <ul
              aria-label="Benefícios do Cuidado das Mãos"
              className="flex flex-col gap-2.5 text-xs text-on-surface-variant dark:text-slate-300"
            >
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Corte e formato anatômico das unhas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Cutilagem cuidadosa sem machucar</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Esmaltação com secagem rápida e acabamento perfeito</span>
              </li>
              <li className="flex items-center gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                <span>Alicates esterilizados em autoclave e descartáveis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Faixa de transparência abaixo dos cards */}
      <div className="services-footer p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-surface-border dark:border-slate-800 text-center text-xs text-on-surface-variant dark:text-slate-300 shadow-2xs">
        📍 Atendimento Domiciliar em Mococa - SP • Formas de pagamento aceitas:{' '}
        <span className="font-semibold text-primary">Somente PIX ou Dinheiro vivo</span> ao término
        do atendimento.
      </div>
    </section>
  )
}
