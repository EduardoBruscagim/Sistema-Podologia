// -----------------------------------------------------------------------------
// PodoSys — Event Bus
// Barramento de eventos desacoplado para comunicação entre features.
// -----------------------------------------------------------------------------

const listeners = new Map()

export const eventBus = {
  /** Registra callback para um evento. Retorna função de desinscrição. */
  on(event, callback) {
    if (!listeners.has(event)) listeners.set(event, new Set())
    listeners.get(event).add(callback)
    return () => listeners.get(event)?.delete(callback)
  },

  /** Dispara evento com dados opcionais. */
  emit(event, data) {
    listeners.get(event)?.forEach((fn) => fn(data))
  },

  /** Remove callback específico de um evento. */
  off(event, callback) {
    listeners.get(event)?.delete(callback)
  },
}
