import gsap from 'gsap'

/**
 * Aplica salvaguarda estrita de acessibilidade para usuários com preferência por movimento reduzido
 * (`prefers-reduced-motion: reduce`), conforme as diretrizes WCAG 2.2 (Nível AAA).
 *
 * ### Efeito:
 * 1. Define `opacity: 1` imediatamente em todos os alvos declarados.
 * 2. Executa `clearProps: 'transform,scale,opacity,visibility'` no GSAP para remover quaisquer
 *    estilos inline residuais que possam impedir a renderização ou causar saltos visuais.
 *
 * @param targets - Coleção de seletores ou referências DOM a serem normalizados.
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
    opacity: 1,
    clearProps: 'transform,scale,opacity,visibility',
  })
}
