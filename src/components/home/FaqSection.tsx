import React, { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { initFaqAnimation } from '@/animations/faq'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como funciona o atendimento em domicílio?',
    answer:
      'O atendimento é realizado na sua casa com dia e horário combinados. Levo os aparelhos e materiais necessários. Você só precisa de um lugar para sentar e uma tomada por perto.',
  },
  {
    question: 'Como faço para agendar?',
    answer:
      'Escolha o procedimento nesta página e clique no botão para abrir o WhatsApp. Por lá combinamos o dia e o horário.',
  },
  {
    question: 'Preciso preparar algo em casa?',
    answer:
      'Não precisa preparar nada. Levo toalhas, lixas e produtos. É necessário apenas ter uma tomada próxima para ligar os aparelhos.',
  },
  {
    question: 'Como é feita a esterilização dos instrumentos?',
    answer:
      'Alicates e espátulas de metal são esterilizados em autoclave e embalados em envelopes lacrados, abertos na sua frente. Lixas, toalhas e luvas são descartadas após o uso.',
  },
  {
    question: 'Existe cobrança de deslocamento em Mococa?',
    answer:
      'Não há taxa de visita. Atendo em qualquer bairro de Mococa pelo valor da tabela de procedimentos.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'O pagamento é feito ao final do atendimento, por PIX ou em dinheiro.',
  },
]

interface FaqAccordionItemProps {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = React.memo(
  ({ item, index, isOpen, onToggle }) => {
    return (
      <div className="faq-item relative">
        {/* Hairline Accent Indicator Vertical */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-accent transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <h3>
          <button
            type="button"
            id={`faq-btn-${index}`}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${index}`}
            onClick={() => onToggle(index)}
            className="w-full flex items-center justify-between py-6 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg transition-colors pl-3 sm:pl-4"
          >
            <span
              className={`font-serif text-lg sm:text-xl font-normal transition-colors duration-200 ${
                isOpen ? 'text-accent font-medium' : 'text-on-surface group-hover:text-accent'
              }`}
            >
              {item.question}
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                isOpen
                  ? 'bg-accent text-on-accent'
                  : 'bg-surface-variant text-text-secondary group-hover:bg-accent/10 group-hover:text-accent'
              }`}
            >
              <ChevronDown
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-on-accent' : 'text-current group-hover:text-accent'
                }`}
              />
            </div>
          </button>
        </h3>

        {/* Painel acessível com WAI-ARIA APG sem layout thrashing */}
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-btn-${index}`}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out pl-3 sm:pl-4 ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-6 pt-1 text-sm sm:text-base text-on-surface-variant font-light leading-relaxed max-w-[55ch] text-pretty">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

FaqAccordionItem.displayName = 'FaqAccordionItem'

export const FaqSection: React.FC = () => {
  const faqSectionRef = useRef<HTMLElement | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  useSectionAnimation(faqSectionRef, initFaqAnimation, ['.faq-header', '.faq-item'])

  return (
    <section
      ref={faqSectionRef}
      aria-label="Perguntas Frequentes"
      className="max-w-4xl mx-auto px-6 py-16 lg:py-24 scroll-mt-28"
      id="faq"
    >
      <div className="faq-header mb-12 lg:mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface tracking-tight leading-[1.12] mb-4 text-balance">
          Perguntas frequentes
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Dúvidas comuns sobre o atendimento em domicílio e materiais.
        </p>
      </div>

      <div className="faq-list divide-y divide-surface-border border-y border-surface-border">
        {FAQ_ITEMS.map((item, index) => (
          <FaqAccordionItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  )
}
