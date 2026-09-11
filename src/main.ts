import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './style.css'

import { initThemeToggle } from '@/utils/theme'
import { initHeroAnimation } from '@/animations/hero'
import { initBentoAnimation } from '@/animations/bento'
import { initCtaAnimation } from '@/animations/cta'
import { initNavbarAnimation } from '@/animations/navbar'
import { applyReducedMotion } from '@/animations/reducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Inicializa alternador de tema acessível
initThemeToggle()

// Orquestração de animações com matchMedia (Acessibilidade WCAG AAA)
const mm = gsap.matchMedia()

mm.add(
  {
    isMotionOk: '(prefers-reduced-motion: no-preference)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { isMotionOk } = context.conditions!

    const headerEl = document.querySelector('header')
    const floatingNav = document.querySelector('header nav') as HTMLElement | null

    if (!isMotionOk) {
      applyReducedMotion(headerEl, floatingNav)
      return
    }

    initHeroAnimation()
    initBentoAnimation()
    initCtaAnimation()
    initNavbarAnimation(headerEl, floatingNav)
  },
)
