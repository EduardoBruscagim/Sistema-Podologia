import ScrollTrigger from 'gsap/ScrollTrigger'

/**
 * Gerencia a barra de navegação fixa:
 * - Mantém a barra permanentemente visível no topo da página (sem ocultar no scroll down).
 * - Aplica a classe '.is-scrolled' quando a página rolar mais de 20px,
 *   ativando o efeito translúcido (glassmorphism/blur) e a borda capilar.
 */
export const initNavbarAnimation = (
  headerEl: HTMLElement,
  navContainerEl?: HTMLElement,
): (() => void) => {
  headerEl.removeAttribute('inert')
  headerEl.style.visibility = 'visible'
  if (navContainerEl) {
    navContainerEl.style.pointerEvents = 'auto'
  }

  let isScrolled = false

  const updateScrolledState = (scrollY: number) => {
    if (scrollY > 20 && !isScrolled) {
      isScrolled = true
      headerEl.classList.add('is-scrolled')
    } else if (scrollY <= 20 && isScrolled) {
      isScrolled = false
      headerEl.classList.remove('is-scrolled')
    }
  }

  // Verifica estado inicial caso a página seja carregada com scroll prévio
  const initialScroll = typeof window !== 'undefined' ? window.scrollY || 0 : 0
  updateScrolledState(initialScroll)

  const st = ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      updateScrolledState(self.scroll())
    },
  })

  return () => {
    headerEl.removeAttribute('inert')
    headerEl.classList.remove('is-scrolled')
    st.kill()
  }
}
