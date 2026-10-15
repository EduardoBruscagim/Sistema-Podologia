import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from './Navbar'
import { ThemeProvider } from '@/context/ThemeContext'

describe('Navbar component', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders brand name, navigation links and theme toggle button', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    )

    expect(screen.getByText(/angélica bruscagim/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /ativar modo escuro/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /abrir menu de navegação/i })).toBeDefined()
  })

  it('keeps mobile menu inert and aria-hidden when closed, and active when open', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    )

    const toggleBtn = screen.getByRole('button', { name: /abrir menu de navegação/i })
    const mobileNav = document.getElementById('mobile-menu')
    expect(mobileNav).not.toBeNull()
    expect(mobileNav?.getAttribute('aria-hidden')).toBe('true')
    expect(mobileNav?.hasAttribute('inert')).toBe(true)

    // Open mobile menu
    fireEvent.click(toggleBtn)
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true')
    expect(mobileNav?.getAttribute('aria-hidden')).toBe('false')
    expect(mobileNav?.hasAttribute('inert')).toBe(false)

    // Close mobile menu
    fireEvent.click(toggleBtn)
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false')
    expect(mobileNav?.getAttribute('aria-hidden')).toBe('true')
    expect(mobileNav?.hasAttribute('inert')).toBe(true)
  })

  it('toggles theme when theme button is clicked', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    )

    const themeBtn = screen.getByRole('button', { name: /ativar modo escuro/i })
    fireEvent.click(themeBtn)
    expect(screen.getByRole('button', { name: /ativar modo claro/i })).toBeDefined()
  })
})
