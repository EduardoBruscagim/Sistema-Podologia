import React, { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { initFaqAnimation } from '@/animations/faq'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'

/**
 * Interface representativa de uma pergunta e resposta do FAQ.
 */

interface FaqItem {
  question: string
  answer: string
}

/**
 * Lista de perguntas frequentes sobre os atendimentos em Mococa/SP.
 */

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

/**
 * Propriedades para cada item individual do acordeão.
 */

interface FaqAccordionItemProps {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => void
}

/**
 * Item individual do acordeão acessível (WAI-ARIA Accordion Pattern).
 *
 * ### Decisões Técnicas de Animação e Acessibilidade:
 * 1. **CSS Grid para Altura Fluida:**
 *    - Utiliza transição de `grid-template-rows: 0fr` para `grid-template-rows: 1fr`
 *      permitindo animação suave de expansão e colapso sem medição forçada de `offsetHeight` (zero layout thrashing).
 * 2. **Atributos Semânticos ARIA:**
 *    - Botão com `aria-expanded` e `aria-controls` apontando para o painel correspondente.
 *    - Painel com `role="region"` e `aria-labelledby` apontando para o botão da pergunta.
 * 3. **Indicador Visual Hairline:**
 *    - Traço vertical de acento (`w-[3px] bg-accent`) com transição de escala vertical `scale-y`.
 */

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = React.memo(
  ({ item, index, isOpen, onToggle, onKeyDown }) => {
    return (
      <div className="faq-item relative">
        {/* Hairline Accent Indicator Vertical com escala fluida */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-accent transition-all duration-400 origin-top ${
            isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
        />

        <h3>
          <button
            type="button"
            id={`faq-btn-${index}`}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${index}`}
            onClick={() => onToggle(index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={`w-full flex items-center justify-between py-5 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-xl transition-all duration-300 pl-3 sm:pl-4 pr-2 ${
              isOpen ? 'bg-surface-variant/40' : 'hover:bg-surface-variant/20'
            }`}
          >
            <span
              className={`font-serif text-lg sm:text-xl lg:text-[1.375rem] font-normal tracking-[-0.01em] transition-colors duration-200 ${
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
                className={`w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'rotate-180 text-on-accent' : 'text-current group-hover:text-accent'
                }`}
              />
            </div>
          </button>
        </h3>

        {/* Painel com desdobramento tipográfico fluido */}
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-btn-${index}`}
          aria-hidden={!isOpen}
          className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pl-3 sm:pl-4 ${
            isOpen ? 'grid-rows-[1fr] opacity-100 visible' : 'grid-rows-[0fr] opacity-0 invisible'
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`pb-6 pt-1 text-sm sm:text-base text-on-surface-variant font-light leading-relaxed max-w-[55ch] text-pretty transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
            >
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

FaqAccordionItem.displayName = 'FaqAccordionItem'

/**
 * Seção de Perguntas Frequentes (FaqSection).
 *
 * Suporta navegação completa por teclado segundo os padrões do W3C ARIA:
 * - `ArrowDown`: Move o foco para a próxima pergunta (com wrap para o primeiro item).
 * - `ArrowUp`: Move o foco para a pergunta anterior (com wrap para o último item).
 * - `Home`: Move o foco imediatamente para a primeira pergunta.
 * - `End`: Move o foco imediatamente para a última pergunta.
 */

export const FaqSection: React.FC = () => {
  const faqSectionRef = useRef<HTMLElement | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  // ---------------------------------------------------------------------------
  // Navegação Acessível por Teclado entre Cabeçalhos do Acordeão
  // ---------------------------------------------------------------------------

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const total = FAQ_ITEMS.length
    let targetIndex: number | null = null

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      targetIndex = (currentIndex + 1) % total
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      targetIndex = (currentIndex - 1 + total) % total
    } else if (e.key === 'Home') {
      e.preventDefault()
      targetIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      targetIndex = total - 1
    }

    if (targetIndex !== null) {
      const btn = document.getElementById(`faq-btn-${targetIndex}`)
      btn?.focus()
    }
  }

  // Dispara animação sequencial de entrada dos itens do FAQ via ScrollTrigger
  useSectionAnimation(faqSectionRef, initFaqAnimation, ['.faq-header', '.faq-item'])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      ref={faqSectionRef}
      aria-labelledby="faq-heading"
      className="max-w-4xl mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      id="faq"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="faq-header mb-12 lg:mb-16">
        <h2
          id="faq-heading"
          className="font-serif text-[2rem] sm:text-4xl lg:text-[3rem] font-normal text-on-surface tracking-[-0.02em] leading-[1.12] mb-4 text-balance"
        >
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
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    </section>
  )
}
