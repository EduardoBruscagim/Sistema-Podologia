// -----------------------------------------------------------------------------
// PodoSys — Scroll Lock
// Trava e libera o scroll da página (modais, drawers, etc).
// -----------------------------------------------------------------------------

export function lockScroll() {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}
