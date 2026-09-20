/**
 * Gerencia a barra de navegação fixa:
 * - Mantém a barra permanentemente visível no topo da página.
 * - Aplica a classe '.is-scrolled' quando a página rolar mais de 20px,
 *   ativando o efeito translúcido (glassmorphism/blur) e a borda capilar.
 * - Usa listener nativo de alta performance ({ passive: true }) com requestAnimationFrame,
 *   eliminando qualquer reflow forçado ou dependência síncrona do GSAP no caminho crítico.
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

  const initialScroll = typeof window !== 'undefined' ? window.scrollY || 0 : 0
  updateScrolledState(initialScroll)

  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrolledState(window.scrollY || 0)
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    headerEl.removeAttribute('inert')
    headerEl.classList.remove('is-scrolled')
    window.removeEventListener('scroll', onScroll)
  }
}
