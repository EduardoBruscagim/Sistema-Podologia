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
      'Vou até a sua casa em Mococa no dia e horário combinados. Levo a maleta com equipamentos portáteis, materiais descartáveis e instrumentais esterilizados. Você só precisa escolher um sofá ou cadeira confortável para relaxar durante a sessão.',
  },
  {
    question: 'Como faço para agendar um atendimento?',
    answer:
      'Todos os agendamentos são realizados diretamente pelo painel aqui do site. Você escolhe o serviço e o melhor dia e horário com calma. O WhatsApp é reservado para esclarecer dúvidas e atender emergências.',
  },
  {
    question: 'O que preciso preparar na minha casa para o atendimento?',
    answer:
      'Não precisa providenciar nada de material. Eu levo toalhas descartáveis, lixas, algodão e todos os produtos necessários. Só é bom ter uma tomada comum por perto caso usemos a cabine de luz ou o micromotor.',
  },
  {
    question: 'Como é garantida a higiene e esterilização dos materiais?',
    answer:
      'Os alicates e espátulas de aço passam por esterilização rigorosa e ficam guardados em embalagens seladas, abertas apenas na sua frente. Lixas, toalhas e luvas são de uso único e descartadas após cada atendimento.',
  },
  {
    question: 'Quais regiões você atende e existe taxa de deslocamento?',
    answer:
      'Atendo em qualquer bairro de Mococa, SP. Não cobro taxa de visita nem valor adicional de transporte: o preço do procedimento já é o valor final.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'O pagamento é feito ao final da visita, por PIX ou em dinheiro.',
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
    const [isHidden, setIsHidden] = useState(!isOpen)

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    // Ajusta visibilidade do painel sincronamente durante a renderização
    if (isOpen && isHidden) {
      setIsHidden(false)
    } else if (!isOpen && !isHidden && prefersReduced) {
      setIsHidden(true)
    }

    useLayoutEffect(() => {
      const panel = panelRef.current
      if (!panel) return

      const isInitialMount = prevIsOpenRef.current === null
      const wasOpen = prevIsOpenRef.current
      prevIsOpenRef.current = isOpen

      if (isInitialMount) {
        if (isOpen) {
          gsap.set(panel, { height: 'auto', opacity: 1 })
        } else {
          gsap.set(panel, { height: 0, opacity: 0 })
        }
        return () => {
          gsap.killTweensOf(panel)
        }
      }

      // Evita re-executar animações em remounts do StrictMode
      if (wasOpen === isOpen) {
        return () => {
          gsap.killTweensOf(panel)
        }
      }

      if (prefersReduced) {
        // Respeita preferência do usuário: troca instantânea sem animação
        gsap.set(panel, isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 })
        return () => {
          gsap.killTweensOf(panel)
        }
      }

      // Cancela qualquer tween em andamento neste painel
      gsap.killTweensOf(panel)

      if (isOpen) {
        // Abertura: expande suavemente do topo para baixo
        const currentHeight = panel.offsetHeight
        const currentOpacity = Number(gsap.getProperty(panel, 'opacity')) || 0

        gsap.fromTo(
          panel,
          { height: currentHeight, opacity: currentOpacity },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.42,
            ease: 'power3.out',
          },
        )
      } else {
        // Fechamento: recolhe suavemente e só aplica hidden ao concluir
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.28,
          ease: 'power2.in',
          onComplete: () => {
            setIsHidden(true)
          },
        })
      }

      return () => {
        gsap.killTweensOf(panel)
      }
    }, [isOpen, prefersReduced])

    return (
      <div
        className={`faq-item rounded-2xl bg-white dark:bg-slate-900 border shadow-2xs transition-colors duration-200 ${
          isOpen
            ? 'border-primary/40 dark:border-primary/30'
            : 'border-surface-border dark:border-slate-800'
        }`}
      >
        <h3 className="text-base font-semibold">
          <button
            type="button"
            id={`faq-btn-${index}`}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${index}`}
            onClick={() => onToggle(index)}
            className={`w-full flex items-center justify-between cursor-pointer min-h-11 px-5 py-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-2xl text-left transition-colors ${
              isOpen ? 'text-primary dark:text-sky-300' : 'text-on-surface dark:text-white'
            }`}
          >
            <span className="pr-4">{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                isOpen
                  ? 'rotate-180 text-primary dark:text-sky-300'
                  : 'text-text-secondary dark:text-slate-400'
              }`}
            />
          </button>
        </h3>

        {/* Painel acessível com WAI-ARIA APG */}
        <div
          ref={panelRef}
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-btn-${index}`}
          hidden={isHidden}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-5 pb-4 border-t border-surface-border dark:border-slate-800 text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed font-normal">
            <div className="pt-3">{item.answer}</div>
          </div>
        </div>
      </div>
    )
  },
)

FaqAccordionItem.displayName = 'FaqAccordionItem'

export const FaqSection: React.FC = () => {
  const faqSectionRef = useRef<HTMLElement | null>(null)
  // null = nenhum item aberto; número = índice do item aberto
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
      className="max-w-4xl mx-auto px-6 py-14"
      id="faq"
    >
      <div className="faq-header text-center mb-10">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-semibold text-clinical-blue dark:text-sky-400 mb-3">
          Dúvidas comuns
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight text-balance">
          Perguntas Frequentes
        </h2>
        <p className="text-sm text-on-surface-variant dark:text-slate-300 mt-2 max-w-lg mx-auto font-normal">
          Como funciona a visita, o agendamento e as formas de pagamento.
        </p>
      </div>

      <div className="faq-list flex flex-col gap-3.5">
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
