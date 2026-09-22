/**
 * Gerencia o estado visual da barra de navegação durante a rolagem (Navbar Scroll State).
 *
 * ### Decisões de Arquitetura e Performance:
 * 1. **Zero Reflow com Listener Passivo:**
 *    Usa um listener nativo de rolagem com `{ passive: true }`, evitando bloqueio da thread principal.
 * 2. **Throttling via requestAnimationFrame (rAF):**
 *    Garante que a atualização da classe `.is-scrolled` seja despachada apenas uma vez por quadro de animação
 *    (60-120fps), eliminando jank ou trabalho repetitivo no scroll.
 * 3. **Independência do GSAP no Caminho Crítico:**
 *    A transição visual de vidro/blur e a borda capilar são controladas puramente por transições CSS
 *    quando `.is-scrolled` é adicionado/removido, liberando a biblioteca GSAP para outros efeitos.
 *
 * @param headerEl - Elemento `<header>` fixo no topo.
 * @param navContainerEl - Container pai opcional para ajuste de propriedades de ponteiro.
 * @returns Função de cleanup para remoção do listener e restauração de estado.
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

  // Atualiza classe apenas quando o limiar de 20px for ultrapassado
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
