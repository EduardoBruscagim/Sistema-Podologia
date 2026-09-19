import gsap from 'gsap'

/**
 * Ensures targets are fully visible and any CSS transforms or scale
 * applied by GSAP are cleared for users with prefers-reduced-motion.
 */
export const applyReducedMotion = (
  targets: gsap.DOMTarget = [
    '.gsap-hero-image',
    '.stat-block',
    '.bento-header',
    '.bento-card',
    '.bento-icon',
    '.services-header',
    '.service-card',
    '.service-icon',
    '.services-footer',
    '.tech-header',
    '.tech-card',
    '.tech-icon',
    '.tech-featured',
    '.faq-header',
    '.faq-item',
    '.cta-reveal',
  ],
): void => {
  gsap.set(targets, {
    autoAlpha: 1,
    clearProps: 'transform,scale,opacity',
  })
}

/**
 * Resets the floating navbar to be static, visible and interactive
 * for users with prefers-reduced-motion.
 */
export const applyNavbarReducedMotion = (
  headerEl: HTMLElement | null,
  floatingNav: HTMLElement | null,
): void => {
  if (!headerEl || !floatingNav) return
  headerEl.removeAttribute('inert')
  headerEl.style.visibility = 'visible'
  floatingNav.style.pointerEvents = 'auto'
  gsap.set(floatingNav, { yPercent: 0, clearProps: 'transform' })
}
