import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import {
  Sun,
  Moon,
  LogOut,
  Home,
  Calendar,
  Sparkles,
  ShieldCheck,
  CalendarPlus,
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col text-on-surface dark:text-slate-100 transition-colors duration-300">
      {/* Link de salto acessível para teclado */}
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-primary text-white font-semibold rounded-full shadow-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
      >
        Pular para o conteúdo principal
      </a>

      {/* Topbar */}
      <header className="border-b border-surface-border dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-lg tracking-tight text-on-surface dark:text-white hover:opacity-80 transition-opacity focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            Angélica Eduarda
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 shrink-0 flex items-center justify-center text-text-secondary dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-apple-gray dark:hover:bg-slate-800 rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDark ? (
                <Sun aria-hidden="true" className="w-5 h-5" />
              ) : (
                <Moon aria-hidden="true" className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="min-h-11 px-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary dark:text-slate-300 hover:text-on-surface dark:hover:text-white hover:bg-apple-gray dark:hover:bg-slate-800 rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                <LogOut aria-hidden="true" className="w-4 h-4" />
                <span>Sair</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="min-h-11 px-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary-hover shadow-xs transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="dashboard-main"
        tabIndex={-1}
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 outline-none"
      >
        {/* Banner de Demonstração (Fase 1) & Proteção / Prompt de Autenticação */}
        <aside
          aria-label="Aviso de ambiente de demonstração"
          className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <Sparkles
              aria-hidden="true"
              className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0"
            />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="font-semibold">
                Ambiente de Demonstração (Fase 1 — Mock do Painel do Paciente).
              </strong>{' '}
              O agendamento online integrado estará disponível na Fase 2.
            </p>
          </div>
          {!user && (
            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="flex-1 sm:flex-initial min-h-11 px-5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-xs transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center active:scale-[0.98]"
              >
                Fazer Login
              </button>
              <Link
                to="/"
                className="flex-1 sm:flex-initial min-h-11 px-5 rounded-full bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white text-xs sm:text-sm font-semibold hover:bg-apple-gray dark:hover:bg-slate-800 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center active:scale-[0.98]"
              >
                Voltar ao Início
              </Link>
            </div>
          )}
        </aside>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface dark:text-white">
                Olá, {user?.name || 'Paciente'}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-bold text-clinical-blue dark:text-sky-400 tracking-wider uppercase">
                {user?.role === 'admin' ? 'Administrador' : user ? 'Paciente' : 'Demonstração'}
              </span>
            </div>
            <p className="text-on-surface-variant dark:text-slate-300 text-sm sm:text-base font-normal">
              Gerencie seus agendamentos e histórico de cuidados para pés e mãos em Mococa - SP.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-sm min-h-[44px] px-6 active:scale-[0.98] transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary self-start sm:self-auto"
          >
            <Home aria-hidden="true" className="w-4 h-4" />
            <span>Voltar para o Início</span>
          </Link>
        </div>

        {/* Stats Grid no padrão Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Stat 1: Próxima Visita */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-clinical-teal-subtle dark:bg-slate-800 flex items-center justify-center text-primary mb-4">
                <Calendar aria-hidden="true" className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-1">
                Próxima Visita
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-on-surface dark:text-white tracking-tight">
                Nenhuma
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border dark:border-slate-800 text-xs text-on-surface-variant dark:text-slate-400 font-normal">
              Nenhum atendimento agendado para hoje.
            </div>
          </div>

          {/* Stat 2: Atendimentos Realizados */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-clinical-teal-subtle dark:bg-slate-800 flex items-center justify-center text-primary mb-4">
                <Sparkles aria-hidden="true" className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-1">
                Atendimentos Realizados
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">0</div>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border dark:border-slate-800 text-xs text-on-surface-variant dark:text-slate-400 font-normal">
              Histórico completo registrado no sistema.
            </div>
          </div>

          {/* Stat 3: Status do Cadastro */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <ShieldCheck aria-hidden="true" className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-text-secondary dark:text-slate-400 uppercase tracking-wider block mb-1">
                Status do Cadastro
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                Ativo
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border dark:border-slate-800 text-xs text-on-surface-variant dark:text-slate-400 font-normal">
              Cadastro validado com sucesso.
            </div>
          </div>
        </div>

        {/* Card Informativo Alinhado ao Bento Grid */}
        <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-surface-border dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow duration-300">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-clinical-teal-subtle dark:bg-slate-800 border border-surface-border-subtle dark:border-slate-700 text-xs font-bold text-clinical-blue dark:text-sky-400 tracking-wider uppercase mb-3">
              ATENDIMENTO DOMICILIAR EM MOCOCA - SP
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface dark:text-white tracking-tight mb-2">
              Precisa de um atendimento para seus pés e mãos?
            </h2>
            <p className="text-on-surface-variant dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
              Atendimento em qualquer bairro de Mococa sem cobrança de taxa de deslocamento.
              Alicates e instrumentos esterilizados em autoclave e descartáveis individuais abertos
              na sua presença.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar pelo WhatsApp (abre em uma nova aba)"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-sm active:scale-[0.98] transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                <CalendarPlus aria-hidden="true" className="w-4 h-4" />
                <span>Agendar pelo WhatsApp</span>
              </a>
              <Link
                to="/#procedimentos"
                className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-white dark:bg-slate-800 border border-surface-border dark:border-slate-700 text-on-surface dark:text-white text-sm font-semibold hover:bg-apple-gray dark:hover:bg-slate-700 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                Conhecer Serviços
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
