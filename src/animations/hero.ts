import gsap from 'gsap'

export const initHeroAnimation = (): void => {
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
  gsap.to('.hero-levitation-wrapper', {
    y: -8,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
}
