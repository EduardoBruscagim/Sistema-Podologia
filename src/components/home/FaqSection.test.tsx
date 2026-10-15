import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FaqSection } from './FaqSection'

describe('FaqSection component', () => {
  it('renders section heading and all question buttons', () => {
    render(<FaqSection />)
    const heading = screen.getByRole('heading', { name: /principais dúvidas/i })
    expect(heading).toBeDefined()

    const question1 = screen.getByRole('button', {
      name: /como funciona o atendimento na minha casa\?/i,
    })
    expect(question1).toBeDefined()
    expect(question1.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggles answer visibility on question click', () => {
    render(<FaqSection />)
    const question1 = screen.getByRole('button', {
      name: /como funciona o atendimento na minha casa\?/i,
    })

    // Click to open
    fireEvent.click(question1)
    expect(question1.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText(/a gente combina o dia e a hora/i)).toBeDefined()

    // Click to close
    fireEvent.click(question1)
    expect(question1.getAttribute('aria-expanded')).toBe('false')
  })

  it('allows switching open question when clicking another item', () => {
    render(<FaqSection />)
    const question1 = screen.getByRole('button', {
      name: /como funciona o atendimento na minha casa\?/i,
    })
    const question2 = screen.getByRole('button', {
      name: /como eu marco um horário\?/i,
    })

    fireEvent.click(question1)
    expect(question1.getAttribute('aria-expanded')).toBe('true')
    expect(question2.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(question2)
    expect(question1.getAttribute('aria-expanded')).toBe('false')
    expect(question2.getAttribute('aria-expanded')).toBe('true')
  })

  it('renders FAQPage structured data in ld+json script', () => {
    const { container } = render(<FaqSection />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const json = JSON.parse(script?.textContent || '{}')
    expect(json['@type']).toBe('FAQPage')
    expect(json.mainEntity.length).toBeGreaterThan(0)
  })
})
