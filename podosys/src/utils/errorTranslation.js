// ============================================================
//  PodoSys — Error Translation
//  Tradução de mensagens do Supabase Auth para PT-BR.
// ============================================================

const ERROR_MAP = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'Email not confirmed': 'E-mail não confirmado. Verifique sua caixa de entrada.',
  'User already registered': 'Este e-mail já está cadastrado.',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  'Signup requires a valid password': 'Informe uma senha válida.',
  'Unable to validate email address: invalid format': 'Formato de e-mail inválido.',
  'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
  'For security purposes, you can only request this after 60 seconds.': 'Aguarde 60 segundos antes de tentar novamente.',
  'New password should be different from the old password.': 'A nova senha deve ser diferente da senha atual.',
  'A user with this email address has already been registered': 'Este e-mail já está cadastrado. Tente fazer login.',
}

const FALLBACK_MESSAGE = 'Ocorreu um erro. Verifique seus dados e tente novamente.'

/** Traduz erros do Supabase para PT-BR com fallback por busca parcial. */
export function translateError(message) {
  if (!message) return FALLBACK_MESSAGE

  if (ERROR_MAP[message]) return ERROR_MAP[message]

  // Busca parcial — cobre variações de mensagens do Supabase
  const partialMatch = Object.keys(ERROR_MAP).find((key) => message.includes(key))
  if (partialMatch) return ERROR_MAP[partialMatch]

  return FALLBACK_MESSAGE
}
