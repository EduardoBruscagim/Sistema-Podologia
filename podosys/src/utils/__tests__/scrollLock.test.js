import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { lockScroll, unlockScroll } from '../scrollLock.js'

describe('scrollLock', () => {
  const originalDocument = globalThis.document
  const originalWindow = globalThis.window

  let mockDocument
  let mockWindow

  beforeEach(() => {
    mockDocument = {
      documentElement: { style: { overflow: '' }, clientWidth: 1000 },
      body: { style: { overflow: '', paddingRight: '' } },
    }
    mockWindow = {
      innerWidth: 1015,
    }
    globalThis.document = mockDocument
    globalThis.window = mockWindow
  })

  afterEach(() => {
    globalThis.document = originalDocument
    globalThis.window = originalWindow
  })

  it('should lock scroll and apply scrollbar compensation', () => {
    lockScroll()
    expect(mockDocument.documentElement.style.overflow).toBe('hidden')
    expect(mockDocument.body.style.overflow).toBe('hidden')
    expect(mockDocument.body.style.paddingRight).toBe('15px')

    unlockScroll()
    expect(mockDocument.documentElement.style.overflow).toBe('')
    expect(mockDocument.body.style.overflow).toBe('')
    expect(mockDocument.body.style.paddingRight).toBe('')
  })

  it('should handle nested lock calls cleanly with reentrancy count', () => {
    lockScroll()
    lockScroll()
    expect(mockDocument.documentElement.style.overflow).toBe('hidden')

    unlockScroll()
    // Still locked because of nested lock
    expect(mockDocument.documentElement.style.overflow).toBe('hidden')

    unlockScroll()
    // Now unlocked
    expect(mockDocument.documentElement.style.overflow).toBe('')
  })
})

