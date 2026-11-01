import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrustStats } from './TrustStats'

describe('TrustStats component', () => {
  it('renders semantic definition list with statistics heading', () => {
    render(<TrustStats />)
    const heading = screen.getByRole('heading', { name: /estatísticas e credenciais/i })
    expect(heading).toBeDefined()
    expect(heading.className).toContain('sr-only')

    expect(screen.getByText(/atendimentos realizados/i)).toBeDefined()
    expect(screen.getByText(/taxa de visita/i)).toBeDefined()
  })

  it('renders accessible screen-reader text while hiding animated visual counter', () => {
    render(<TrustStats />)
    const srOnlyText = screen.getByText('Mais de 25.000 atendimentos')
    expect(srOnlyText).toBeDefined()
    expect(srOnlyText.className).toContain('sr-only')

    const visualCounter = screen.getByText('+25.000')
    expect(visualCounter.getAttribute('aria-hidden')).toBe('true')
    expect(visualCounter.className).toContain('tabular-nums')
  })

  it('renders courtesy displacement metric (R$ 0) with tabular numbers', () => {
    render(<TrustStats />)
    const zeroFee = screen.getByText('R$ 0')
    expect(zeroFee).toBeDefined()
    expect(zeroFee.className).toContain('tabular-nums')
  })
})
