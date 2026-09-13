import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initHeroAnimation = (): (() => void) => {
  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  })

  // Cascata de tipografia do Hero (Título, Descrição, Botão de Agendamento)
  heroTl.fromTo(
    '.gsap-hero-reveal',
    { y: 24, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      stagger: 0.12,
      clearProps: 'transform',
    },
  )

  // Entrada suave do Mockup da Agenda com leve sobreposição
  heroTl.fromTo(
    '.gsap-hero-image',
    { y: 36, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      clearProps: 'transform',
    },
    '-=0.45',
  )

  // Cascata dos slots de agendamento no mockup com micro-pop orgânico
  heroTl.fromTo(
    '.hero-slot',
    { scale: 0.75, autoAlpha: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 0.35,
      stagger: 0.05,
      ease: 'back.out(1.6)',
      clearProps: 'scale,transform',
    },
    '-=0.35',
  )

  // Efeito de levitação ambiente contínua do Mockup (60fps na GPU)
  const levitationTween = gsap.to('.hero-levitation-wrapper', {
    y: -8,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  // Pausa a levitação e restaura willChange: 'auto' fora do viewport para poupar GPU
  const levitationTrigger = ScrollTrigger.create({
    trigger: '.hero-levitation-wrapper',
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => {
      gsap.set('.hero-levitation-wrapper', { willChange: 'transform' })
      levitationTween.play()
    },
    onLeave: () => {
      levitationTween.pause()
      gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
    },
    onEnterBack: () => {
      gsap.set('.hero-levitation-wrapper', { willChange: 'transform' })
      levitationTween.play()
    },
    onLeaveBack: () => {
      levitationTween.pause()
      gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
    },
  })

  // Define willChange apenas se estiver visível inicialmente
  if (levitationTrigger.isActive) {
    gsap.set('.hero-levitation-wrapper', { willChange: 'transform' })
  } else {
    levitationTween.pause()
    gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
  }

  return () => {
    heroTl.kill()
    levitationTrigger.kill()
    levitationTween.kill()
    gsap.set('.hero-levitation-wrapper', { willChange: 'auto' })
  }
}
