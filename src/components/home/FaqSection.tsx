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
      'Vou até a sua residência em Mococa com todo o equipamento profissional e maleta esterilizada. Você só precisa escolher um local confortável (sofá ou poltrona). O atendimento é calmo, pontual e sem pressa.',
  },
  {
    question: 'O que preciso preparar na minha casa para o atendimento?',
    answer:
      'Não precisa se preocupar com nada! Eu levo todo o material descartável, toalhas higienizadas e equipamentos portáteis. Basta um lugar aconchegável para você sentar.',
  },
  {
    question: 'Como é garantida a higiene e esterilização dos materiais?',
    answer:
      'Máximo rigor de biossegurança: todos os instrumentos metálicos passam por esterilização a vapor sob pressão em autoclave. Cada conjunto vem em envelope cirúrgico lacrado com indicador químico e aberto exclusivamente na sua frente.',
  },
  {
    question: 'Quais regiões você atende e existe taxa de deslocamento?',
    answer:
      'Atendo em qualquer bairro da cidade de Mococa - SP sem nenhuma cobrança de taxa de deslocamento. O valor informado é o valor final.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'O pagamento é realizado unicamente ao término da sessão, via PIX ou dinheiro vivo.',
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
    const isFirstRender = useRef(true)

    useLayoutEffect(() => {
      const panel = panelRef.current
      if (!panel) return

      // Primeiro render: define o estado inicial sem animação
      if (isFirstRender.current) {
        gsap.set(panel, { height: 0, opacity: 0 })
        isFirstRender.current = false
        return () => {
          gsap.killTweensOf(panel)
        }
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.42,
            ease: 'power3.out',
          },
        )
      } else {
        // Fechamento: recolhe com leve aceleração para parecer responsivo
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.28,
          ease: 'power2.in',
        })
      }

      return () => {
        gsap.killTweensOf(panel)
      }
    }, [isOpen])

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
          hidden={!isOpen}
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
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-bold text-clinical-blue dark:text-sky-400 tracking-wider uppercase mb-3">
          TIRE SUAS DÚVIDAS
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-on-surface dark:text-white tracking-tight">
          Perguntas Frequentes
        </h2>
        <p className="text-sm text-on-surface-variant dark:text-slate-300 mt-2 max-w-lg mx-auto font-normal">
          Tudo o que você precisa saber sobre o atendimento podológico em sua residência.
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
