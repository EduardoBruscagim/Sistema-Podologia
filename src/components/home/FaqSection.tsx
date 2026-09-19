import React, { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronDown } from 'lucide-react'
import { initFaqAnimation } from '@/animations/faq'
import { applyReducedMotion } from '@/animations/reducedMotion'

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como funciona o atendimento a domicílio?',
    answer:
      'Vou até a sua residência em Mococa no dia e horário reservados. Levo a maleta com equipamentos portáteis, instrumentais esterilizados em autoclave e materiais 100% descartáveis. Você só precisa escolher uma poltrona ou sofá confortável para relaxar durante a sessão.',
  },
  {
    question: 'Como faço para agendar um atendimento?',
    answer:
      'Os agendamentos são realizados diretamente aqui pelo site, onde você escolhe o procedimento e a data de sua preferência. O canal do WhatsApp permanece disponível para esclarecer dúvidas prévias ou emergências.',
  },
  {
    question: 'O que preciso preparar na minha casa para o atendimento?',
    answer:
      'Não é necessário providenciar nenhum material. Levo toalhas descartáveis, lixas individuais, algodão e todos os dermocosméticos clínicos necessários. Apenas disponibilizar uma tomada comum por perto para a cabine de luz ou micromotor.',
  },
  {
    question: 'Como é garantida a esterilização e higiene dos materiais?',
    answer:
      'Alicates e espátulas de aço cirúrgico passam por ciclo completo de esterilização em autoclave hospitalar a 134°C e são mantidos em envelopes cirúrgicos selados, abertos exclusivamente na sua frente. Lixas, toalhas e luvas são de uso único e descartadas imediatamente.',
  },
  {
    question: 'Quais regiões você atende e existe cobrança de deslocamento?',
    answer:
      'Atendo em qualquer bairro de Mococa, SP, com cortesia integral de deslocamento (taxa R$ 0). O valor informado no menu de procedimentos é exatamente o valor final da sessão.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer:
      'O pagamento é realizado confortavelmente ao final da visita, por meio de PIX ou em dinheiro.',
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
    const panelRef = useRef<HTMLDivElement>(null)
    const prevIsOpenRef = useRef<boolean | null>(null)

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    useLayoutEffect(() => {
      const panel = panelRef.current
      if (!panel) return

      const isInitialMount = prevIsOpenRef.current === null
      const wasOpen = prevIsOpenRef.current
      prevIsOpenRef.current = isOpen

      if (isInitialMount) {
        if (isOpen) {
          gsap.set(panel, { height: 'auto', opacity: 1, display: 'block' })
        } else {
          gsap.set(panel, { height: 0, opacity: 0, display: 'none' })
        }
        return
      }

      if (wasOpen === isOpen) return

      gsap.killTweensOf(panel)

      if (prefersReduced) {
        gsap.set(
          panel,
          isOpen
            ? { height: 'auto', opacity: 1, display: 'block' }
            : { height: 0, opacity: 0, display: 'none' },
        )
        return
      }

      if (isOpen) {
        gsap.set(panel, { display: 'block' })
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.32,
            ease: 'power2.out',
          },
        )
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.24,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(panel, { display: 'none' })
          },
        })
      }

      return () => {
        gsap.killTweensOf(panel)
      }
    }, [isOpen, prefersReduced])

    return (
      <div
        className={`faq-item relative transition-all duration-300 ${
          isOpen ? 'pl-4 sm:pl-5 -ml-1' : 'pl-0'
        }`}
      >
        {/* Hairline Accent Indicator Vertical */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-accent transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
          }`}
        />

        <h3>
          <button
            type="button"
            id={`faq-btn-${index}`}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${index}`}
            onClick={() => onToggle(index)}
            className="w-full flex items-center justify-between py-6 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-lg transition-colors"
          >
            <span
              className={`font-serif text-lg sm:text-xl font-normal transition-colors duration-200 ${
                isOpen
                  ? 'text-accent dark:text-accent font-medium'
                  : 'text-on-surface dark:text-white group-hover:text-accent'
              }`}
            >
              {item.question}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                isOpen
                  ? 'bg-accent text-white shadow-2xs'
                  : 'bg-black/5 dark:bg-white/5 text-text-secondary group-hover:bg-accent/10 group-hover:text-accent'
              }`}
            >
              <ChevronDown
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-white' : 'text-current group-hover:text-accent'
                }`}
              />
            </div>
          </button>
        </h3>

        {/* Painel acessível com WAI-ARIA APG */}
        <div
          ref={panelRef}
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-btn-${index}`}
          style={{ overflow: 'hidden' }}
        >
          <div className="pb-6 pt-1 text-sm sm:text-base text-on-surface-variant font-light leading-relaxed max-w-[55ch] text-pretty">
            {item.answer}
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

  useGSAP(
    () => {
      const el = faqSectionRef.current
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
            applyReducedMotion(['.faq-header', '.faq-item'])
            return
          }

          return initFaqAnimation(el)
        },
      )

      return () => mm.revert()
    },
    { scope: faqSectionRef },
  )

  return (
    <section
      ref={faqSectionRef}
      aria-label="Perguntas Frequentes"
      className="max-w-4xl mx-auto px-6 py-16 lg:py-24"
      id="faq"
    >
      <div className="faq-header mb-12 lg:mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface dark:text-white tracking-tight leading-[1.12] mb-4 text-balance">
          Perguntas frequentes e orientações.
        </h2>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-[48ch] text-pretty">
          Detalhes práticos sobre o atendimento em domicílio, biossegurança dos materiais e formas
          de agendamento.
        </p>
      </div>

      <div className="faq-list divide-y divide-black/[0.08] dark:divide-white/[0.08] border-y border-black/[0.08] dark:border-white/[0.08]">
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
