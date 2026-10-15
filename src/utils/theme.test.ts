import { describe, it, expect, beforeEach } from 'vitest'
import { updateThemeColorMeta } from './theme'

describe('theme utils (updateThemeColorMeta)', () => {
  beforeEach(() => {
    // Limpa todas as tags meta theme-color do DOM de teste
    document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove())
  })

  it('creates a new meta[name="theme-color"] tag if none exists and sets dark color', () => {
    updateThemeColorMeta(true)
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    expect(meta).not.toBeNull()
    expect(meta?.getAttribute('content')).toBe('#11100f')
  })

  it('creates a new meta[name="theme-color"] tag if none exists and sets light color', () => {
    updateThemeColorMeta(false)
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    expect(meta).not.toBeNull()
    expect(meta?.getAttribute('content')).toBe('#faf8f5')
  })

  it('updates existing meta tag, removes media attribute, and removes duplicate tags', () => {
    const meta1 = document.createElement('meta')
    meta1.name = 'theme-color'
    meta1.content = '#faf8f5'
    meta1.setAttribute('media', '(prefers-color-scheme: light)')
    document.head.appendChild(meta1)

    const meta2 = document.createElement('meta')
    meta2.name = 'theme-color'
    meta2.content = '#11100f'
    meta2.setAttribute('media', '(prefers-color-scheme: dark)')
    document.head.appendChild(meta2)

    expect(document.querySelectorAll('meta[name="theme-color"]').length).toBe(2)

    updateThemeColorMeta(true)

    const remainingMetas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    expect(remainingMetas.length).toBe(1)
    expect(remainingMetas[0].getAttribute('content')).toBe('#11100f')
    expect(remainingMetas[0].hasAttribute('media')).toBe(false)
  })
})
