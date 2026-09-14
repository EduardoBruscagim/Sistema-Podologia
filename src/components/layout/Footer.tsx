import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-surface-border dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center text-text-secondary dark:text-slate-400 text-xs font-normal">
        <p>&copy; 2026 Angélica Eduarda Amaro Bruscagim. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
