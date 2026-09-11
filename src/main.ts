import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Hero Animations: movimento suave sem ocultar texto (opacity: 1) para garantir LCP imediato (<0.5s)
  gsap.from('.gsap-hero-reveal', {
    y: 24,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsap.fromTo(
    '.gsap-hero-image',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15 },
  )

  // ScrollTrigger diferido para o evento 'load' para eliminar Reflow Forçado durante o caminho crítico
  const initScrollTrigger = () => {
    gsap.set('.gsap-fade-up', { y: 30, opacity: 0 })

    ScrollTrigger.batch('.gsap-fade-up', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          overwrite: true,
        }),
    })
  }

  if (document.readyState === 'complete') {
    initScrollTrigger()
  } else {
    window.addEventListener('load', initScrollTrigger, { once: true })
  }
})

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle')
const themeIconMoon = document.getElementById('theme-icon-moon')
const themeIconSun = document.getElementById('theme-icon-sun')

if (themeToggleBtn && themeIconMoon && themeIconSun) {
  // Inicialização do Tema
  const currentTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const setDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      themeIconMoon.classList.add('hidden')
      themeIconSun.classList.remove('hidden')
      themeToggleBtn.setAttribute('aria-pressed', 'true')
      themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro')
      themeToggleBtn.setAttribute('title', 'Ativar modo claro')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      themeIconSun.classList.add('hidden')
      themeIconMoon.classList.remove('hidden')
      themeToggleBtn.setAttribute('aria-pressed', 'false')
      themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro')
      themeToggleBtn.setAttribute('title', 'Ativar modo escuro')
      localStorage.setItem('theme', 'light')
    }
  }

  // Define o estado inicial baseado no localStorage ou na preferência do sistema
  if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
    setDarkMode(true)
  } else {
    setDarkMode(false)
  }

  // Listener para alternar tema
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setDarkMode(!isCurrentlyDark)
  })
}
