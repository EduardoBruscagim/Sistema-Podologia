/**
 * Utilitários para geração de links e formatação do canal oficial de WhatsApp.
 * Centraliza os parâmetros de contato profissional para Angélica Eduarda em Mococa/SP.
 */

/**
 * Leitura da variável de ambiente opcional para override do número em staging/teste.
 */
const rawEnvNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined

/**
 * Número de telefone oficial sanitizado no padrão E.164 (apenas dígitos, ex: '5519995443922').
 * Padrão: 55 (Brasil) 19 (Mococa/Região) 99544-3922.
 */
export const WHATSAPP_NUMBER = rawEnvNumber ? rawEnvNumber.replace(/\D/g, '') : '5519995443922'

/**
 * Mensagem padrão de saudação inicial ao abrir o canal de dúvidas.
 */
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Angélica! Gostaria de tirar uma dúvida sobre o atendimento em domicílio em Mococa.'

/**
 * Gera a URL universal da API do WhatsApp (`https://wa.me/...`) com o texto devidamente codificado.
 *
 * @param message - Texto predefinido que aparecerá na caixa de mensagem do cliente.
 * @returns Link completo para abertura no WhatsApp Web ou aplicativo móvel.
 */
export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MESSAGE): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Retorna link do WhatsApp parametrizado para esclarecimento de dúvidas sobre um procedimento específico.
 *
 * @param topic - Nome do procedimento ou tema de dúvida (ex: "Pé e Mão Completo", "Cabine UV").
 * @returns URL formatada com mensagem contextualizada.
 */
export const getWhatsAppDoubtUrl = (topic?: string): string => {
  const message = topic
    ? `Olá, Angélica! Gostaria de tirar uma dúvida sobre ${topic} em Mococa.`
    : WHATSAPP_DEFAULT_MESSAGE
  return getWhatsAppUrl(message)
}

/**
 * Retorna link do WhatsApp parametrizado com mensagem prioritária de alívio rápido
 * para situações de urgência podológica (ex: dor aguda, unha encravada ou inflamada).
 *
 * @returns URL formatada com solicitação de atendimento prioritário.
 */
export const getWhatsAppUrgencyUrl = (): string => {
  const message =
    'Olá, Angélica! Estou com a unha doendo e gostaria de ver um horário para atendimento em Mococa.'
  return getWhatsAppUrl(message)
}

/**
 * Formata o número E.164 para exibição amigável e legível na interface de usuário.
 * Exemplo: '5519995443922' -> '(19) 99544-3922'.
 *
 * @returns String formatada com DDD entre parênteses e hífen no número celular.
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
