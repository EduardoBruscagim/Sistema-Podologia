// -----------------------------------------------------------------------------
// PodoSys — Scroll Lock
// Trava e libera o scroll da página (modais, drawers, etc) com compensação
// de largura de scrollbar para prevenir layout shift (CLS / salto horizontal).
// -----------------------------------------------------------------------------

let lockCount = 0

export function lockScroll() {
  lockCount++
  if (lockCount > 1) return

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

