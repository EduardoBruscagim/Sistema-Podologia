import React, { useRef } from 'react'
import { initAboutAnimation } from '@/animations/about'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { Heart, ShieldCheck, Calendar, Check, ArrowUpRight, GraduationCap } from 'lucide-react'

/**
 * Seção Sobre a Profissional (AboutSection).
 *
 * ### Estrutura Editorial e Humanização:
 * - **Lado Esquerdo (Card de Credenciais):**
 *   Monograma tipográfico em SVG (iniciais e agulha/ponto de cuidado), badge de Mococa/SP
 *   e lista de credenciais fundamentais (experiência desde 2016, autoclave cirúrgica e foco em idosos).
 * - **Lado Direito (Narrativa Pessoal e Diferenciais):**
 *   Texto humanizado que detalha a discrição e a biossegurança no atendimento domiciliar,
 *   lista de 4 compromissos práticos e botão de contato direto com a Angélica pelo WhatsApp.
 */

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Dispara animação de entrada da seção About com revelação suave
  useSectionAnimation(sectionRef, initAboutAnimation, '.about-reveal')

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="max-w-6xl mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* ----------------------------------------------------------------- */}
        {/* Lado Esquerdo: Cartão de Apresentação e Credenciais Humanas       */}
        {/* ----------------------------------------------------------------- */}

        <div className="about-reveal lg:col-span-5 flex flex-col items-center">
          <div className="about-card w-full max-w-sm rounded-2xl bg-pure-white dark:bg-surface-variant border border-surface-border p-7 sm:p-8 flex flex-col items-center text-center shadow-xs">
            {/* Emblema Editorial com Monograma */}
            <div className="relative mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-surface-variant dark:bg-surface flex items-center justify-center border border-surface-border text-accent overflow-hidden">
                <img
                  src="/angelica.jpg"
                  alt="Foto da Angélica Eduarda Amaro Bruscagim"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-2 -right-1 px-3 py-1 rounded-full bg-sage text-on-sage text-[11px] uppercase font-semibold tracking-[0.16em] shadow-xs">
                Mococa · SP
              </div>
            </div>

            <p className="font-serif text-2xl font-normal text-on-surface mb-1">Angélica Eduarda</p>
            <span className="font-sans text-xs uppercase tracking-[0.16em] text-accent font-medium mb-4">
              Podologia & Manicure em Domicílio
            </span>

            {/* Credenciais em pílulas discretas */}
            <ul
              role="list"
              aria-label="Credenciais profissionais"
              className="w-full flex flex-col gap-2 pt-4 border-t border-surface-border text-left"
            >
              <li className="flex items-start gap-2.5 text-xs text-on-surface-variant font-light leading-snug">
                <Calendar aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
                <span>Cuidando de pés e mãos em Mococa desde 2016</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-on-surface-variant font-light leading-snug">
                <GraduationCap aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
                <span>Formada em São Paulo</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-on-surface-variant font-light leading-snug">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
                <span>Tudo 100% esterilizado em autoclave</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-on-surface-variant font-light leading-snug">
                <Heart aria-hidden="true" className="w-4 h-4 text-accent shrink-0" />
                <span>Muito cuidado com idosos e pés sensíveis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Lado Direito: História, Filosofia de Atendimento e Confiança      */}
        {/* ----------------------------------------------------------------- */}

        <div className="about-reveal lg:col-span-7 flex flex-col items-start text-left">
          <h2
            id="about-heading"
            className="font-serif text-[2rem] sm:text-4xl lg:text-[3rem] font-normal text-on-surface tracking-[-0.02em] leading-[1.12] mb-6 text-balance"
          >
            Cuidado e paciência, direto na sua casa
          </h2>

          <div className="space-y-4 text-base text-on-surface-variant font-light leading-relaxed mb-8 max-w-[54ch] text-pretty">
            <p>
              Oi, eu sou a <strong>Angélica Eduarda Amaro Bruscagim</strong>! Cuido da saúde dos pés
              e das mãos aqui em Mococa desde 2016. Eu sei que abrir a porta de casa pra alguém
              exige muita confiança, por isso levo a discrição e a pontualidade muito a sério.
            </p>
            <p>
              Pensei nesse formato de atendimento para quem não quer (ou não pode) pegar trânsito ou
              esperar em salão, mas não abre mão da limpeza de uma clínica. Pode ficar tranquila na sua casa, eu levo até você o meu equipamento, toalhas e os alicates.
            </p>
            <p>
              Tenho um cuidado enorme por atender idosos, diabéticos, quem tem a unha mais
              sensível ou quem está com dificuldade de andar. Faço tudo no tempo da pessoa, sem
              pressa nenhuma, sempre com muito cuidado pra não machucar.
            </p>
          </div>

          {/* Destaques Práticos de Conveniência */}
          <ul
            role="list"
            aria-label="Diferenciais do atendimento"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8"
          >
            <li className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Vou a qualquer bairro de Mococa sem cobrar visita</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Aquele horário é exclusivo seu</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Abro os materiais na sua frente</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-on-surface font-normal p-3 rounded-lg bg-surface-variant/40 border border-surface-border">
              <Check aria-hidden="true" className="w-4 h-4 text-sage shrink-0" />
              <span>Você paga no finalzinho, no PIX ou dinheiro</span>
            </li>
          </ul>

          {/* Ação Direta de Contato Humanizado */}
          <a
            href={getWhatsAppUrl('Oi, Angélica! Vi o seu site e queria marcar um horário pra mim.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Angélica no WhatsApp (abre em uma nova aba)"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-on-accent text-xs uppercase tracking-[0.14em] font-medium hover:bg-accent-hover active:scale-[0.98] transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface min-h-[44px] cursor-pointer"
          >
            <span>Falar com a Angélica</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
