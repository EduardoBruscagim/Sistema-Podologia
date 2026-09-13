import React from 'react'

interface ServiceItem {
  id: string
  title: string
  duration: string
  description: string
  features: string[]
  isHighlight?: boolean
}

const SERVICES: ServiceItem[] = [
  {
    id: 'pe-e-mao',
    title: 'Pé e Mão Completo',
    duration: '~1h30',
    description:
      'O pacote favorito das clientes: cuidado geral, corte técnico, desencravamento suave dos cantos, lixamento, cutilagem e esmaltação completa no conforto do seu lar.',
    features: [
      'Corte anatômico e desencravar suave',
      'Esmaltação e pintura completa (pés e mãos)',
      'Materiais esterilizados em autoclave e descartáveis',
      'Sem nenhuma taxa de deslocamento em Mococa',
    ],
    isHighlight: true,
  },
  {
    id: 'pes',
    title: 'Cuidado dos Pés (Podologia & Pedicure)',
    duration: '~50 min',
    description:
      'Tratamento detalhado para os pés: corte correto, desencravamento, alívio de dores nos cantos, lixamento de asperezas, hidratação e esmaltação.',
    features: [
      'Desencravamento preventivo e alívio',
      'Desbaste de calosidades e lixamento',
      'Higienização e corte seguro',
      'Pintura e esmaltação inclusa',
    ],
  },
  {
    id: 'maos',
    title: 'Cuidado das Mãos (Manicure)',
    duration: '~40 min',
    description:
      'Cuidado delicado para as mãos: corte, formato das unhas, cutilagem higiênica e esmaltação uniforme com a cor da sua escolha.',
    features: [
      'Corte e alinhamento das unhas',
      'Cutilagem cuidadosa',
      'Esmaltação com secagem rápida',
      'Alicates e materiais 100% esterilizados',
    ],
  },
]

export const ServicesPricing: React.FC = () => {
  return (
    <section id="precos" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="text-center mb-12 sm:mb-16">
        <span className="badge badge-primary badge-outline text-xs uppercase font-semibold tracking-wider mb-3">
          Atendimento em Mococa - SP
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          Pés e mãos bem cuidados em casa.
        </h2>
        <p className="text-theme-muted text-base sm:text-lg mt-3 max-w-2xl mx-auto font-medium text-balance">
          Corte anatômico, desencravamento suave, cutilagem e pintura de unhas. Levo toda a
          estrutura higienizada até você, sem taxa de deslocamento em Mococa.
        </p>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-300 border ${
              service.isHighlight
                ? 'bg-theme-card border-apple-blue/40 shadow-lg shadow-apple-blue/10 dark:shadow-black/40 ring-1 ring-apple-blue/30 md:-translate-y-1'
                : 'bg-theme-card border-theme-card-border shadow-sm shadow-slate-900/5'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {service.title}
                </h3>
              </div>

              {service.isHighlight && (
                <div className="mb-3">
                  <span className="badge bg-apple-blue text-white text-xs uppercase font-bold tracking-wider py-2.5 px-3 rounded-full">
                    Mais Pedido
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                <svg
                  className="w-4 h-4 text-apple-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Duração aproximada: {service.duration}</span>
              </div>

              <p className="text-theme-muted text-sm sm:text-base font-medium leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  O que está incluso:
                </div>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Informativo: Atendimento em Mococa e Pagamento */}
      <div className="bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg text-center sm:text-left">
          <span>📍 Atendimento Domiciliar em Mococa - SP</span>
        </div>
        <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium text-center sm:text-right">
          Formas de pagamento aceitas:{' '}
          <span className="font-bold text-apple-blue">Somente PIX ou Dinheiro vivo</span> ao término
          do atendimento.
        </div>
      </div>
    </section>
  )
}
