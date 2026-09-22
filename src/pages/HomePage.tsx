import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/home/Hero'
import { TrustStats } from '@/components/home/TrustStats'
import { BentoGrid } from '@/components/home/BentoGrid'
import { AboutSection } from '@/components/home/AboutSection'
import { ServicesPricing } from '@/components/home/ServicesPricing'
import { TechnologySection } from '@/components/home/TechnologySection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaSection } from '@/components/home/CtaSection'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'

/**
 * Página Inicial da Aplicação (HomePage).
 *
 * ### Estrutura Semântica e Acessibilidade:
 * 1. **Skip-to-Content Link:**
 *    - Link invisível na visualização padrão (`sr-only`) que se torna visível ao receber foco por `Tab`
 *      (`focus:not-sr-only`), permitindo que usuários de navegação por teclado saltem diretamente
 *      para a área de conteúdo principal (`#main-content`), em conformidade com o critério WCAG 2.4.1.
 * 2. **Landmarks Semânticos:**
 *    - `<header>` (no Navbar), `<main id="main-content">`, `<footer>` e `<aside>` (WhatsAppButton).
 * 3. **Sequência da Página:**
 *    - Hero -> TrustStats -> BentoGrid -> AboutSection -> ServicesPricing -> TechnologySection -> FaqSection -> CtaSection.
 */
export const HomePage: React.FC = () => {
  return (
    <div id="app" className="flex-1 flex flex-col">
      {/* Link de Acessibilidade para Pular Navegação (Skip Link) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2.5 focus:bg-accent focus:text-on-accent focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:font-medium focus:rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-md transition-all"
      >
        Pular para o conteúdo principal
      </a>

      {/* Cabeçalho Fixo com Navegação */}
      <Navbar />

      {/* Conteúdo Principal da Página */}
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full pt-28 pb-16 outline-none scroll-mt-28"
      >
        <Hero />
        <TrustStats />
        <BentoGrid />
        <AboutSection />
        <ServicesPricing />
        <TechnologySection />
        <FaqSection />
        <CtaSection />
      </main>

      {/* Rodapé e Botão Flutuante de Contato */}
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
