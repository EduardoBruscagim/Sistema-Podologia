// -----------------------------------------------------------------------------
// PodoSys — Scroll Lock
// Trava e libera o scroll da página (modais, drawers, etc) com compensação
// de largura de scrollbar para prevenir layout shift (CLS / salto horizontal).
// -----------------------------------------------------------------------------

let lockCount = 0

export function lockScroll() {
  lockCount++
  if (lockCount > 1) return

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const scrollbarWidth = window.innerWidth - (document.documentElement?.clientWidth || 0)
    if (scrollbarWidth > 0 && document.body) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    if (document.documentElement) document.documentElement.style.overflow = 'hidden'
    if (document.body) document.body.style.overflow = 'hidden'
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return

  if (typeof document !== 'undefined') {
    if (document.documentElement) document.documentElement.style.overflow = ''
    if (document.body) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
}

