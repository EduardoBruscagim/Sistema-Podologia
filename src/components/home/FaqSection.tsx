import React from 'react'

const FAQ_ITEMS = [
  {
    question: 'Como funciona o atendimento de podologia a domicílio?',
    answer:
      'Levo todo o equipamento profissional necessário até a sua residência: micromotor podológico, instrumentos cirúrgicos esterilizados, iluminação auxiliar e produtos clínicos de alta qualidade. Você recebe o mesmo nível técnico de um consultório particular, com o conforto de não precisar sair de casa.',
  },
  {
    question: 'O que preciso preparar ou disponibilizar na minha casa?',
    answer:
      'Apenas uma poltrona, cadeira confortável ou sofá com boa iluminação e uma tomada comum por perto. Todo o resto — incluindo toalhas descartáveis, campos cirúrgicos, EPIs e descarte biológico seguro — é de minha responsabilidade.',
  },
  {
    question: 'Como é garantida a higiene e biossegurança dos instrumentos?',
    answer:
      'Segurança e saúde são prioridades inegociáveis. Todos os materiais cortantes e de aço inoxidável passam por rigoroso ciclo de lavagem ultrassônica, secagem, envelopamento cirúrgico e esterilização em autoclave. Lixas, lâminas de bisturi e luvas são 100% descartáveis e abertos na sua frente.',
  },
  {
    question: 'Como funciona o agendamento e quais as formas de pagamento?',
    answer:
      'O agendamento é feito diretamente aqui pelo site: você escolhe a data e horário livres na agenda em tempo real. O pagamento é realizado ao final da sessão, aceitando PIX, cartões de crédito/débito e dinheiro.',
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
