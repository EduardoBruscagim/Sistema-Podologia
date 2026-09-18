/**
 * Número oficial de WhatsApp para dúvidas e emergências com Angélica Eduarda (Mococa/SP):
 * 55 19 99544-3922 -> '5519995443922'
 * Pode ser customizado via variável de ambiente VITE_WHATSAPP_NUMBER.
 */
const rawEnvNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined

export const WHATSAPP_NUMBER = rawEnvNumber ? rawEnvNumber.replace(/\D/g, '') : '5519995443922'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Angélica! Gostaria de tirar uma dúvida sobre os atendimentos em domicílio em Mococa.'

export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MESSAGE): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Retorna link do WhatsApp para dúvidas específicas sobre procedimentos ou atendimento.
 */
export const getWhatsAppDoubtUrl = (topic?: string): string => {
  const message = topic
    ? `Olá, Angélica! Gostaria de tirar uma dúvida sobre ${topic} em Mococa.`
    : 'Olá, Angélica! Gostaria de tirar uma dúvida sobre os atendimentos em domicílio em Mococa.'
  return getWhatsAppUrl(message)
}

/**
 * Retorna link do WhatsApp para situações de urgência podológica (dor aguda, unha encravada inflamada).
 */
export const getWhatsAppUrgencyUrl = (): string => {
  const message =
    'Olá, Angélica! Estou com uma urgência podológica com dor e preciso de orientação para atendimento em Mococa.'
  return getWhatsAppUrl(message)
}

/**
 * Retorna o número de WhatsApp formatado para exibição legível na interface (ex: (19) 99544-3922).
 */
export const getWhatsAppDisplayNumber = (): string => {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('55')) {
    return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  return WHATSAPP_NUMBER
}
