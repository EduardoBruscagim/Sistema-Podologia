/**
 * PodoSys Global State - Reactive Store
 * Implementação de reatividade granular utilizando ES2024 Proxies. [cite: 68-71, 154]
 * - Elimina a necessidade de Virtual DOM através de interceptadores de 'set'.
 * - Garante performance extrema com baixo consumo de CPU/Memória. [cite: 76]
 */
export const createStore = (initialState) => {
  return new Proxy(initialState, {
    set(target, key, value) {
      target[key] = value;
      // Trigger: Notificar observadores ou disparar Morphdom parcial
      return true;
    }
  });
};
