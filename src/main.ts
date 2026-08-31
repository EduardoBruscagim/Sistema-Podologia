import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Hero Animations (Carregamento inicial)
  gsap.fromTo(
    '.gsap-hero-reveal',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
  );

  // Microanimações em Scroll (Apple style) otimizadas com batch
  // Garante que os elementos iniciais fiquem invisíveis antes do batch agir
  gsap.set('.gsap-fade-up', { y: 40, opacity: 0 });

  ScrollTrigger.batch('.gsap-fade-up', {
    start: 'top 85%',
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) => gsap.to(batch, { y: 40, opacity: 0, duration: 0.4, ease: 'power2.in', overwrite: true }),
  });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconMoon = document.getElementById('theme-icon-moon');
const themeIconSun = document.getElementById('theme-icon-sun');

if (themeToggleBtn && themeIconMoon && themeIconSun) {
  // Inicialização do Tema
  const currentTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      themeIconMoon.classList.add('hidden');
      themeIconSun.classList.remove('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  };

  // Define o estado inicial baseado no localStorage ou na preferência do sistema
  if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }

  // Listener para alternar tema
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setDarkMode(!isCurrentlyDark);
  });
}
