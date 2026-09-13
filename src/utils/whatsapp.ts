export const WHATSAPP_NUMBER = '5519999999999'
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Angélica! Sou de Mococa e gostaria de agendar um atendimento de pé e mão em domicílio.'

export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MESSAGE): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
