import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col transition-colors duration-300">
      {/* Link de salto acessível para teclado */}
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-2.5 bg-apple-blue text-white font-semibold rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
      >
        Pular para o conteúdo principal
      </a>

      {/* Topbar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-lg"
          >
            Angélica Eduarda
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-sm btn-ghost min-h-[44px] min-w-[44px] px-4 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="dashboard-main"
        tabIndex={-1}
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 outline-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Olá, {user?.name || 'Paciente'}
              </h1>
              <span className="badge badge-primary badge-outline text-xs uppercase font-semibold">
                {user?.role === 'admin' ? 'Administrador' : 'Paciente'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Gerencie seus agendamentos e histórico de cuidados para pés e mãos em Mococa - SP.
            </p>
          </div>

          <Link
            to="/"
            className="btn rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white border-none shadow-sm shadow-apple-blue/20 min-h-[44px] px-6"
          >
            Voltar para o Início
          </Link>
        </div>

        {/* Stats Grid DaisyUI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="stat bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="stat-title text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Próxima Visita
            </div>
            <div className="stat-value text-2xl sm:text-3xl text-slate-900 dark:text-slate-50 mt-1">
              Nenhuma
            </div>
            <div className="stat-desc text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Nenhum atendimento agendado para hoje.
            </div>
          </div>

          <div className="stat bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="stat-title text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Atendimentos Realizados
            </div>
            <div className="stat-value text-2xl sm:text-3xl text-apple-blue mt-1">0</div>
            <div className="stat-desc text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Histórico completo disponível aqui.
            </div>
          </div>

          <div className="stat bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="stat-title text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Status do Cadastro
            </div>
            <div className="stat-value text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 mt-1">
              Ativo
            </div>
            <div className="stat-desc text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Cadastro verificado com sucesso.
            </div>
          </div>
        </div>

        {/* Card Informativo DaisyUI */}
        <div className="card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="card-body p-0">
            <h2 className="card-title text-xl font-bold text-slate-900 dark:text-slate-50">
              Precisa de um atendimento domiciliar em Mococa?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed mt-1 font-medium">
              Atendimento em qualquer bairro de Mococa sem cobrança de taxa de deslocamento.
              Alicates e materiais esterilizados em autoclave com total higiene no seu lar.
            </p>
            <div className="card-actions justify-start mt-4">
              <Link
                to="/"
                className="btn btn-outline border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
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
