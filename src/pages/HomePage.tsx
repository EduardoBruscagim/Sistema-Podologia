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

export const HomePage: React.FC = () => {
  return (
    <div id="app" className="flex-1 flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2.5 focus:bg-accent focus:text-on-accent focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:font-medium focus:rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-md transition-all"
      >
        Pular para o conteúdo principal
      </a>
      <Navbar />
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
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
