// ============================================================
//  PodoSys — Escape Stack
//  Stack de handlers para a tecla Escape.
//  O handler ativo mais recente (maior z-index) tem prioridade.
// ============================================================

const handlers = []

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return

  // Itera do último ao primeiro — prioridade para o handler mais recente
  for (let i = handlers.length - 1; i >= 0; i--) {
    if (handlers[i].isActive()) {
      handlers[i].handler()
      break
    }
  }
})

/**
 * Registra um handler de Escape com verificação de estado ativo.
 * Retorna função para desregistrar.
 *
 * @param {() => boolean} isActive - Retorna true se o handler deve responder
 * @param {() => void} handler - Função executada ao pressionar Escape
 */
export function registerEscapeHandler(isActive, handler) {
  const entry = { isActive, handler }
  handlers.push(entry)
  return () => {
    const index = handlers.indexOf(entry)
    if (index !== -1) handlers.splice(index, 1)
  }
}
