import type React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, renderHook } from '@testing-library/react'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from '@/hooks/useTheme'

const TestConsumer: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <span data-testid="is-dark-val">{isDark ? 'true' : 'false'}</span>
      <button onClick={() => toggleTheme()}>Toggle</button>
    </div>
  )
}

describe('ThemeContext and ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.documentElement.removeAttribute('data-theme')
  })

  it('throws an error if useTheme is invoked outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme deve ser usado dentro de um ThemeProvider',
    )
  })

  it('provides default theme light when localStorage is empty', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('theme-val').textContent).toBe('light')
    expect(screen.getByTestId('is-dark-val').textContent).toBe('false')
  })

  it('switches to dark mode on toggle, persists in localStorage, and applies classes', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )

    const btn = screen.getByRole('button', { name: /toggle/i })
    fireEvent.click(btn)

    expect(screen.getByTestId('theme-val').textContent).toBe('dark')
    expect(screen.getByTestId('is-dark-val').textContent).toBe('true')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('initializes with dark theme if saved in localStorage', () => {
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('theme-val').textContent).toBe('dark')
    expect(screen.getByTestId('is-dark-val').textContent).toBe('true')
  })
})
