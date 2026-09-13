import React from 'react'

const FAQ_ITEMS = [
  {
    question: 'Como funciona o atendimento a domicílio?',
    answer:
      'Levo todo o material profissional necessário até a sua casa: alicates e espátulas esterilizados em autoclave, toalhas e lixas descartáveis, produtos de hidratação e esmaltes. Você recebe todo o cuidado com seus pés e mãos com o conforto de não precisar sair de casa.',
  },
  {
    question: 'O que preciso preparar na minha casa para o atendimento?',
    answer:
      'Apenas um local confortável para você se sentar (como sofá ou poltrona) com boa iluminação. Todo o material de proteção, toalhas descartáveis, bacias com protetores e higienização são levados por mim.',
  },
  {
    question: 'Como é garantida a higiene e esterilização dos materiais?',
    answer:
      'Segurança e higiene são prioridades inegociáveis. Todos os instrumentos de corte e metal passam por esterilização em autoclave hospitalar em envelopes selados. Lixas, toalhas e luvas são 100% descartáveis e abertas na sua presença.',
  },
  {
    question: 'Quais regiões você atende e existe taxa de deslocamento?',
    answer:
      'Atendo em qualquer bairro de Mococa - SP com taxa de deslocamento zero (R$ 0)! O valor do procedimento é único e você não paga nada a mais pelo transporte.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer:
      'O pagamento é realizado somente ao término do atendimento. No momento, aceito exclusivamente PIX ou dinheiro vivo.',
  },
]

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10 sm:mb-14">
        <span className="badge badge-primary badge-outline text-xs uppercase font-semibold tracking-wider mb-3">
          Tire suas dúvidas
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-balance">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-3 max-w-xl mx-auto font-medium text-balance">
          Tudo o que você precisa saber sobre o atendimento podológico em sua residência.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={index}
            name="faq-accordion"
            className="collapse collapse-arrow bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl shadow-sm transition-colors duration-200 group cursor-pointer"
          >
            <summary className="collapse-title text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 pr-12 select-none list-none rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2">
              {item.question}
            </summary>
            <div className="collapse-content text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium pt-1 cursor-default">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
