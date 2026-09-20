import gsap from 'gsap'

export const initFaqAnimation = (sectionEl: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // Cabeçalho do FAQ
    gsap.fromTo(
      '.faq-header',
      { y: 16, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )

    // Cascata dos itens de perguntas e respostas
    gsap.fromTo(
      '.faq-item',
      { y: 14, autoAlpha: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          once: true,
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      },
    )
  }, sectionEl)

  return () => {
    ctx.revert()
  }
}
