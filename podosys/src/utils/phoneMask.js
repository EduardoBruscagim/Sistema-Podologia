// -----------------------------------------------------------------------------
// PodoSys — Phone Mask
// Máscara e limpeza de telefone brasileiro (DD) 9XXXX-XXXX.
// -----------------------------------------------------------------------------

/** Aplica máscara (DD) 9XXXX-XXXX a um valor numérico. */
export function applyPhoneMask(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/** Remove a máscara e retorna apenas dígitos. */
export function stripPhoneMask(value) {
  return value.replace(/\D/g, '')
}
