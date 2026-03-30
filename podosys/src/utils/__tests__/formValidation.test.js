import { describe, it, expect } from 'vitest'
import { validateForm } from '../formValidation.js'

describe('validateForm', () => {

  // ---------------------------------------------------------------------------
  // Login Mode
  // ---------------------------------------------------------------------------

  describe('login mode', () => {
    it('should pass with valid email and password', () => {
      expect(validateForm('login', { email: 'test@email.com', password: '123456' }))
        .toBeNull()
    })

    it('should reject missing email', () => {
      expect(validateForm('login', { email: '', password: '123456' }))
        .toBe('Informe seu e-mail.')
    })

    it('should reject invalid email format', () => {
      expect(validateForm('login', { email: 'not-an-email', password: '123456' }))
        .toBe('Formato de e-mail inválido.')
    })

    it('should reject missing password', () => {
      expect(validateForm('login', { email: 'test@email.com', password: '' }))
        .toBe('Informe sua senha.')
    })

    it('should reject short password', () => {
      expect(validateForm('login', { email: 'test@email.com', password: '123' }))
        .toBe('A senha deve ter pelo menos 6 caracteres.')
    })
  })

  // ---------------------------------------------------------------------------
  // Register Mode
  // ---------------------------------------------------------------------------

  describe('register mode', () => {
    const validRegister = {
      email: 'test@email.com',
      password: '123456',
      name: 'Maria Silva',
      phone: '11999991234',
      street: 'Rua Exemplo',
      neighborhood: 'Centro',
      addressNumber: '123',
    }

    it('should pass with all valid fields', () => {
      expect(validateForm('register', validRegister)).toBeNull()
    })

    it('should reject missing name', () => {
      expect(validateForm('register', { ...validRegister, name: '' }))
        .toBe('Informe seu nome completo.')
    })

    it('should reject missing phone', () => {
      expect(validateForm('register', { ...validRegister, phone: '' }))
        .toBe('Informe seu número de telefone.')
    })

    it('should reject phone with wrong digit count', () => {
      expect(validateForm('register', { ...validRegister, phone: '1199999' }))
        .toBe('O telefone deve ter 11 dígitos (DDD + número).')
    })

    it('should reject missing street', () => {
      expect(validateForm('register', { ...validRegister, street: '' }))
        .toBe('Informe sua rua.')
    })

    it('should reject missing neighborhood', () => {
      expect(validateForm('register', { ...validRegister, neighborhood: '' }))
        .toBe('Informe seu bairro.')
    })

    it('should reject missing address number', () => {
      expect(validateForm('register', { ...validRegister, addressNumber: '' }))
        .toBe('Informe o número do endereço.')
    })
  })

  // ---------------------------------------------------------------------------
  // Forgot Mode
  // ---------------------------------------------------------------------------

  describe('forgot mode', () => {
    it('should pass with valid email', () => {
      expect(validateForm('forgot', { email: 'test@email.com' })).toBeNull()
    })

    it('should reject missing email', () => {
      expect(validateForm('forgot', { email: '' }))
        .toBe('Informe seu e-mail.')
    })

    it('should not require password', () => {
      expect(validateForm('forgot', { email: 'test@email.com', password: '' }))
        .toBeNull()
    })
  })

  // ---------------------------------------------------------------------------
  // Update Password Mode
  // ---------------------------------------------------------------------------

  describe('update_password mode', () => {
    it('should pass with valid password', () => {
      expect(validateForm('update_password', { password: '123456' })).toBeNull()
    })

    it('should reject missing password', () => {
      expect(validateForm('update_password', { password: '' }))
        .toBe('Informe sua senha.')
    })

    it('should reject short password', () => {
      expect(validateForm('update_password', { password: '12345' }))
        .toBe('A senha deve ter pelo menos 6 caracteres.')
    })

    it('should not require email', () => {
      expect(validateForm('update_password', { email: '', password: '123456' }))
        .toBeNull()
    })
  })
})
