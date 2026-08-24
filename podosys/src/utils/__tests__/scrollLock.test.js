import { describe, it, expect, beforeEach } from 'vitest'
import { lockScroll, unlockScroll } from '../scrollLock.js'

describe('scrollLock', () => {
  beforeEach(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  it('should lock and unlock scroll', () => {
    lockScroll()
    expect(document.documentElement.style.overflow).toBe('hidden')
    expect(document.body.style.overflow).toBe('hidden')

    unlockScroll()
    expect(document.documentElement.style.overflow).toBe('')
    expect(document.body.style.overflow).toBe('')
  })

  it('should handle nested lock calls cleanly', () => {
    lockScroll()
    lockScroll()
    expect(document.documentElement.style.overflow).toBe('hidden')

    unlockScroll()
    // Still locked because of nested lock
    expect(document.documentElement.style.overflow).toBe('hidden')

    unlockScroll()
    // Now unlocked
    expect(document.documentElement.style.overflow).toBe('')
  })
})
