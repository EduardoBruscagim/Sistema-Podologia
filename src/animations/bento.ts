import gsap from 'gsap'

export const initBentoAnimation = (): void => {
  const bentoTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.bento-header',
      start: 'top 85%',
      once: true,
    },
    defaults: { ease: 'power3.out' },
  })

  // Cabeçalho do Bento Grid
  bentoTl.fromTo(
    '.bento-header',
    { y: 20, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.45,
      clearProps: 'transform',
    },
  )

  // Cascata fluida nos 3 Cards com micro-escala e autoAlpha
  bentoTl.fromTo(
    '.bento-card',
    {
      y: 36,
      scale: 0.96,
      autoAlpha: 0,
    },
    {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.45,
      stagger: 0.12,
      clearProps: 'transform,scale',
    },
    '-=0.15',
  )

  // Micro-pop nos ícones acompanhando cada card
  bentoTl.fromTo(
    '.bento-icon',
    { scale: 0.6, autoAlpha: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 0.35,
      ease: 'back.out(1.8)',
      stagger: 0.12,
      clearProps: 'transform,scale',
    },
    '<0.08',
  )

  // Interações Ricas de Hover (Bento Cards)
  const bentoCards = document.querySelectorAll('.bento-card')
  bentoCards.forEach((card) => {
    const icon = card.querySelector('.bento-icon')

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        scale: 1.015,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      if (icon) {
        gsap.to(icon, {
          scale: 1.12,
          rotation: 4,
          duration: 0.5,
          ease: 'back.out(2)',
          overwrite: 'auto',
        })
      }
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    })
  })
}
