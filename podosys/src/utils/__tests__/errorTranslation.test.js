import { describe, it, expect } from 'vitest'
import { translateError } from '../errorTranslation.js'

describe('translateError', () => {
  it('should translate exact match', () => {
    expect(translateError('Invalid login credentials')).toBe('E-mail ou senha incorretos.')
  })

  it('should translate partial match', () => {
    expect(translateError('Error: Invalid login credentials happened')).toBe('E-mail ou senha incorretos.')
  })

  it('should return fallback for unknown errors', () => {
    expect(translateError('Some unknown error')).toBe('Ocorreu um erro. Verifique seus dados e tente novamente.')
  })

  it('should return fallback for null/undefined', () => {
    expect(translateError(null)).toBe('Ocorreu um erro. Verifique seus dados e tente novamente.')
    expect(translateError(undefined)).toBe('Ocorreu um erro. Verifique seus dados e tente novamente.')
  })

  it('should translate email not confirmed', () => {
    expect(translateError('Email not confirmed')).toBe('E-mail não confirmado. Verifique sua caixa de entrada.')
  })

  it('should translate rate limit', () => {
    expect(translateError('Email rate limit exceeded')).toBe('Muitas tentativas. Aguarde alguns minutos.')
  })

  it('should translate duplicate user registration', () => {
    expect(translateError('A user with this email address has already been registered'))
      .toBe('Este e-mail já está cadastrado. Tente fazer login.')
  })
})
