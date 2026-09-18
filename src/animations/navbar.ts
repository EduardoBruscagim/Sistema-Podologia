import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initNavbarAnimation = (
  headerEl: HTMLElement,
  navContainerEl: HTMLElement,
): (() => void) => {
  headerEl.removeAttribute('inert')
  headerEl.style.visibility = 'visible'
  navContainerEl.style.pointerEvents = 'auto'
  gsap.set(navContainerEl, { yPercent: 0 })

  let isHidden = false
  let isScrolled = false

  const showNavbar = () => {
    if (!isHidden) return
    isHidden = false
    headerEl.removeAttribute('inert')
    headerEl.style.visibility = 'visible'
    navContainerEl.style.pointerEvents = 'auto'

    gsap.to(navContainerEl, {
      yPercent: 0,
      duration: 0.28,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const hideNavbar = () => {
    if (isHidden) return
    // Previne recolhimento se o usuário estiver navegando por teclado dentro do menu
    if (headerEl.contains(document.activeElement)) return

    isHidden = true
    gsap.to(navContainerEl, {
      yPercent: -120,
      duration: 0.28,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        if (isHidden && !headerEl.contains(document.activeElement)) {
          navContainerEl.style.pointerEvents = 'none'
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

      // Atualiza classe visual de scroll suavemente no header
      if (scrollY > 20 && !isScrolled) {
        isScrolled = true
        headerEl.classList.add('is-scrolled')
      } else if (scrollY <= 20 && isScrolled) {
        isScrolled = false
        headerEl.classList.remove('is-scrolled')
      }

      // No topo da página (Hero), garante barra sempre visível sem repetições de escrita no DOM
      if (scrollY < 60) {
        if (isHidden) showNavbar()
        lastScrollY = scrollY
        return
      }

      // Ignora microvibrações de trackpad (< 8px)
      if (delta < 8) return

      // Rolando para baixo
      if (direction === 1 && scrollY > 100) {
        hideNavbar()
      }
      // Rolando para cima
      else if (direction === -1) {
        showNavbar()
      }

      lastScrollY = scrollY
    },
  })

  return () => {
    headerEl.removeEventListener('focusin', handleFocusIn)
    headerEl.removeAttribute('inert')
    headerEl.classList.remove('is-scrolled')
    st.kill()
    gsap.killTweensOf(navContainerEl)
  }
}
