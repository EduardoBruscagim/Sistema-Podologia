import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initNavbarAnimation = (
  headerEl: HTMLElement,
  floatingNav: HTMLElement,
): (() => void) => {
  // Garante estado inicial 100% visível e interativo
  headerEl.removeAttribute('inert')
  headerEl.style.visibility = 'visible'
  floatingNav.style.pointerEvents = 'auto'
  gsap.set(floatingNav, { yPercent: 0 })

  let isHidden = false

  const showNavbar = () => {
    headerEl.removeAttribute('inert')
    headerEl.style.visibility = 'visible'
    floatingNav.style.pointerEvents = 'auto'
    if (!isHidden) return
    isHidden = false
    gsap.to(floatingNav, {
      yPercent: 0,
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const hideNavbar = () => {
    if (isHidden) return
    // Não recolhe a barra se algum elemento filho estiver focado
    if (headerEl.contains(document.activeElement)) return
    isHidden = true
    gsap.to(floatingNav, {
      yPercent: -150,
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        if (isHidden && !headerEl.contains(document.activeElement)) {
          floatingNav.style.pointerEvents = 'none'
        }
      },
    })
  }

  const handleFocusIn = () => {
    showNavbar()
  }

  headerEl.addEventListener('focusin', handleFocusIn)

  let lastScrollY = window.scrollY || 0

  const st = ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      const scrollY = self.scroll()
      const direction = self.direction
      const delta = Math.abs(scrollY - lastScrollY)

      // Próximo ao topo da página (Hero), a barra sempre fica visível
      if (scrollY < 80) {
        showNavbar()
        lastScrollY = scrollY
        return
      }

      // Ignora micro-movimentos e trepidações de trackpad/touch (< 10px)
      if (delta < 10) {
        return
      }

      // Rolando para baixo após o limiar -> recolhe suavemente
      if (direction === 1 && scrollY > 120) {
        hideNavbar()
      }
      // Rolando para cima com intenção de leitura -> revela suavemente
      else if (direction === -1) {
        showNavbar()
      }

      lastScrollY = scrollY
    },
  })

  return () => {
    headerEl.removeEventListener('focusin', handleFocusIn)
    headerEl.removeAttribute('inert')
    st.kill()
    gsap.killTweensOf(floatingNav)
  }
}
