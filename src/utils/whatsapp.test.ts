import { describe, it, expect } from 'vitest'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
  getWhatsAppUrl,
  getWhatsAppDoubtUrl,
  getWhatsAppUrgencyUrl,
  getWhatsAppDisplayNumber,
} from './whatsapp'

describe('whatsapp utils', () => {
  it('has default sanitized phone number without non-digit characters', () => {
    expect(WHATSAPP_NUMBER).toBe('5519995443922')
    expect(/^\d+$/.test(WHATSAPP_NUMBER)).toBe(true)
  })

  it('generates standard WhatsApp URL with encoded message', () => {
    const url = getWhatsAppUrl()
    expect(url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`,
    )
  })

  it('generates customized WhatsApp URL with specific message and encodes accents and spaces', () => {
    const customMessage = 'Olá! Gostaria de agendar Podologia Clínica (R$ 75).'
    const url = getWhatsAppUrl(customMessage)
    expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`)
    expect(url).toContain(encodeURIComponent(customMessage))
    expect(url).not.toContain(' ')
  })

  it('generates contextual doubt URL for a specific procedure', () => {
    const topic = 'Tratamento de Calosidades'
    const url = getWhatsAppDoubtUrl(topic)
    const expectedMessage = `Olá, Angélica! Gostaria de tirar uma dúvida sobre ${topic} em Mococa.`
    expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(expectedMessage)}`)
  })

  it('falls back to default message if no topic provided to getWhatsAppDoubtUrl', () => {
    const url = getWhatsAppDoubtUrl()
    expect(url).toBe(getWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE))
  })

  it('generates urgency URL with priority pain relief message', () => {
    const url = getWhatsAppUrgencyUrl()
    expect(url).toContain(encodeURIComponent('unha doendo'))
    expect(url).toContain(encodeURIComponent('Mococa'))
  })

  it('formats display number into friendly Brazilian mobile phone format', () => {
    const formatted = getWhatsAppDisplayNumber()
    expect(formatted).toBe('(19) 99544-3922')
  })
})
