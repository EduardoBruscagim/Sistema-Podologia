// -----------------------------------------------------------------------------
// PodoSys — Form Validation
// Validação frontend dos formulários de autenticação.
// -----------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Valida campos do formulário de auth conforme o modo ativo.
 * Retorna mensagem de erro (string) ou null se válido.
 *
 * @param {string} mode - 'login' | 'register' | 'forgot' | 'update_password'
 * @param {object} fields - Campos do formulário (phone sem máscara, strings trimadas)
 */
export function validateForm(mode, fields) {
  const { email, password, name, phone, street, neighborhood, addressNumber } = fields

  // Campos exclusivos de cadastro (Progressive Disclosure — Baymard UX Benchmark)
  if (mode === 'register') {
    if (!name?.trim()) return 'Informe seu nome completo.'
    if (phone?.trim() && phone.trim().length !== 11) {
      return 'O telefone deve ter 11 dígitos (DDD + número).'
    }
  }

  // E-mail — obrigatório em login, register e forgot
  const needsEmail = mode === 'login' || mode === 'register' || mode === 'forgot'
  if (needsEmail) {
    if (!email?.trim()) return 'Informe seu e-mail.'
    if (!EMAIL_REGEX.test(email.trim())) return 'Formato de e-mail inválido.'
  }

  // Senha — obrigatória em login, register e update_password
  const needsPassword = mode === 'login' || mode === 'register' || mode === 'update_password'
  if (needsPassword) {
    if (!password) return 'Informe sua senha.'
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
  }

  return null
}
