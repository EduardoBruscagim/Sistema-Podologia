import { describe, it, expect } from 'vitest'
import { applyPhoneMask, stripPhoneMask } from '../phoneMask.js'

describe('applyPhoneMask', () => {
  it('should return empty string for empty input', () => {
    expect(applyPhoneMask('')).toBe('')
  })

  it('should format 1 digit as opening DDD', () => {
    expect(applyPhoneMask('1')).toBe('(1')
  })

  it('should format 2 digits as DDD', () => {
    expect(applyPhoneMask('11')).toBe('(11')
  })

  it('should format 3-7 digits with DDD and space', () => {
    expect(applyPhoneMask('119')).toBe('(11) 9')
    expect(applyPhoneMask('1199999')).toBe('(11) 99999')
  })

  it('should format 8-11 digits with DDD, space and dash', () => {
    expect(applyPhoneMask('11999991')).toBe('(11) 99999-1')
    expect(applyPhoneMask('11999991234')).toBe('(11) 99999-1234')
  })

  it('should strip non-digit characters before masking', () => {
    expect(applyPhoneMask('(11) 99999-1234')).toBe('(11) 99999-1234')
    expect(applyPhoneMask('abc11def9g')).toBe('(11) 9')
  })

  it('should cap at 11 digits', () => {
    expect(applyPhoneMask('119999912345678')).toBe('(11) 99999-1234')
  })
})

describe('stripPhoneMask', () => {
  it('should return only digits', () => {
    expect(stripPhoneMask('(11) 99999-1234')).toBe('11999991234')
  })

  it('should handle already clean input', () => {
    expect(stripPhoneMask('11999991234')).toBe('11999991234')
  })

  it('should return empty string for non-digit input', () => {
    expect(stripPhoneMask('abc')).toBe('')
  })
})
