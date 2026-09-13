import React from 'react'

export const TrustStats: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16 max-w-6xl mx-auto w-full">
      <div className="stats stats-vertical lg:stats-horizontal shadow-sm bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl w-full p-2 transition-colors duration-300">
        <div className="stat place-items-center py-6 px-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Experiência Clínica
          </div>
          <div className="stat-value text-3xl sm:text-4xl text-slate-900 dark:text-slate-50 tracking-tight font-bold my-1">
            Desde 2016
          </div>
          <div className="stat-desc text-slate-500 dark:text-slate-400 font-medium">
            10 anos de dedicação à saúde dos pés
          </div>
        </div>

        <div className="stat place-items-center py-6 px-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total de Atendimentos
          </div>
          <div className="stat-value text-3xl sm:text-4xl text-apple-blue tracking-tight font-bold my-1">
            +20.000
          </div>
          <div className="stat-desc text-slate-500 dark:text-slate-400 font-medium">
            Média de 10+ pacientes ao dia
          </div>
        </div>

        <div className="stat place-items-center py-6 px-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Biossegurança
          </div>
          <div className="stat-value text-3xl sm:text-4xl text-slate-900 dark:text-slate-50 tracking-tight font-bold my-1">
            100%
          </div>
          <div className="stat-desc text-slate-500 dark:text-slate-400 font-medium">
            Autoclave e descartáveis individuais
          </div>
        </div>

        <div className="stat place-items-center py-6 px-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Satisfação
          </div>
          <div className="stat-value text-3xl sm:text-4xl text-amber-700 dark:text-amber-400 tracking-tight font-bold my-1 flex items-center gap-1">
            <span>5.0</span>
            <span className="text-2xl text-amber-600 dark:text-amber-400" aria-hidden="true">
              ★
            </span>
          </div>
          <div className="stat-desc text-slate-500 dark:text-slate-400 font-medium">
            Excelência aprovada pelos pacientes
          </div>
        </div>
      </div>
    </section>
  )
}
