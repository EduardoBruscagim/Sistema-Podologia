import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/home/Hero'
import { TrustStats } from '@/components/home/TrustStats'
import { BentoGrid } from '@/components/home/BentoGrid'
import { ServicesPricing } from '@/components/home/ServicesPricing'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaSection } from '@/components/home/CtaSection'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Footer } from '@/components/layout/Footer'

export const HomePage: React.FC = () => {
  return (
    <div id="app" className="flex-1 flex flex-col">
      {/* Link de salto acessível para navegação por teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-apple-blue text-white font-semibold rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue transition-all"
      >
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <TrustStats />
        <BentoGrid />
        <ServicesPricing />
        <FaqSection />
        <CtaSection />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
