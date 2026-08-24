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
        .toEqual({ field: 'email', message: 'Informe seu e-mail.' })
    })

    it('should reject invalid email format', () => {
      expect(validateForm('login', { email: 'not-an-email', password: '123456' }))
        .toEqual({ field: 'email', message: 'Formato de e-mail inválido.' })
    })

    it('should reject missing password', () => {
      expect(validateForm('login', { email: 'test@email.com', password: '' }))
        .toEqual({ field: 'password', message: 'Informe sua senha.' })
    })

    it('should reject short password', () => {
      expect(validateForm('login', { email: 'test@email.com', password: '123' }))
        .toEqual({ field: 'password', message: 'A senha deve ter pelo menos 6 caracteres.' })
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
      phone: '',
      street: '',
      neighborhood: '',
      addressNumber: '',
    }

    it('should pass with minimal required fields (name, email, password)', () => {
      expect(validateForm('register', validRegister)).toBeNull()
    })

    it('should reject missing name', () => {
      expect(validateForm('register', { ...validRegister, name: '' }))
        .toEqual({ field: 'name', message: 'Informe seu nome completo.' })
    })

    it('should pass when optional phone and address are empty', () => {
      expect(validateForm('register', { ...validRegister, phone: '', street: '', neighborhood: '', addressNumber: '' }))
        .toBeNull()
    })

    it('should reject phone with wrong digit count if provided', () => {
      expect(validateForm('register', { ...validRegister, phone: '1199999' }))
        .toEqual({ field: 'phone', message: 'O telefone deve ter 11 dígitos (DDD + número).' })
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
        .toEqual({ field: 'email', message: 'Informe seu e-mail.' })
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
        .toEqual({ field: 'password', message: 'Informe sua senha.' })
    })

    it('should reject short password', () => {
      expect(validateForm('update_password', { password: '12345' }))
        .toEqual({ field: 'password', message: 'A senha deve ter pelo menos 6 caracteres.' })
    })

    it('should not require email', () => {
      expect(validateForm('update_password', { email: '', password: '123456' }))
        .toBeNull()
    })
  })
})

