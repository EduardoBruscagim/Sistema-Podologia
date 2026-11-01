import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders dynamic copyright year deterministically with frozen system time', () => {
    render(<Footer />)
    const copyrightText = screen.getByText(/2026 Angélica Eduarda Amaro Bruscagim/i)
    expect(copyrightText).toBeDefined()
  })

  it('renders all quick navigation links with accessible minimum touch target dimensions', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link', {
      name: /(início|sobre mim|procedimentos|higiene|perguntas)/i,
    })
    expect(links.length).toBeGreaterThanOrEqual(5)

    links.forEach((link) => {
      expect(link.className).toContain('min-h-[44px]')
      expect(link.className).toContain('min-w-[44px]')
    })
  })

  it('displays WhatsApp contact number with tabular numbers', () => {
    render(<Footer />)
    const phoneElement = screen.getByText(/\(19\) 99544-3922/)
    expect(phoneElement).toBeDefined()
    expect(phoneElement.className).toContain('tabular-nums')
  })
})
