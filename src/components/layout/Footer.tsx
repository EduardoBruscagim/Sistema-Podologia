import React from 'react'
import { getWhatsAppUrl } from '@/utils/whatsapp'

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
        <div>
          <div className="font-bold text-lg text-slate-900 dark:text-slate-50 mb-2">
            Angélica Eduarda
          </div>
          <p className="text-theme-muted text-sm font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
            Cuidado especializado para pés e mãos no conforto da sua residência. Corte anatômico,
            desencravar suave, cutilagem e esmaltação.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            Esterilização em autoclave e materiais 100% descartáveis.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Atendimento & Região
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed">
            Mococa - SP (Toda a cidade)
            <br />
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              Sem taxa de deslocamento
            </span>
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-3">
            Pagamentos: Somente PIX ou Dinheiro vivo
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Horário flexível sob agendamento
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Canal de Contato Direto
          </div>
          <div className="space-y-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Conversar pelo WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
            <p className="text-xs text-theme-muted">
              Dúvidas sobre procedimentos, valores ou horários especiais são respondidas
              rapidamente.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80 pt-6 text-center text-slate-500 dark:text-slate-400 text-xs font-medium">
        <p>&copy; 2026 Angélica Eduarda Amaro Bruscagim. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
