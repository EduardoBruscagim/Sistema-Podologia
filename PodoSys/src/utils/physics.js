/**
 * PodoSys Motion - Animation Physics
 * Helpers para animações baseadas em física de molas (Spring Physics). [cite: 33]
 * - Substitui curvas de Bézier estáticas por movimentos orgânicos. [cite: 38]
 * - Física calculada pela fórmula da aceleração (a):
 * }a = \frac{-k(x - target) - d \cdot v}{m}} [cite: 34]
 */
export const springConfig = {
  ios: { stiffness: 170, damping: 26, mass: 1 },
  gentle: { stiffness: 120, damping: 14, mass: 1 }
};
