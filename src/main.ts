import './style.css'
import type { SystemStatus } from '@/types'
import { formatDate } from '@/utils/format'

const systemInfo: SystemStatus = {
  name: 'Sistema de Podologia',
  version: '0.1.0',
  status: 'online',
  timestamp: formatDate(new Date()),
}

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <main class="container mx-auto p-4 md:p-8 max-w-4xl">
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-base-300">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-primary">${systemInfo.name}</h1>
          <p class="text-sm text-base-content/70">Ambiente de desenvolvimento e validação do stack</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge badge-success gap-1.5 p-3 font-medium">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></span>
            ${systemInfo.status.toUpperCase()}
          </span>
          <span class="badge badge-outline p-3 font-mono text-xs">v${systemInfo.version}</span>
        </div>
      </header>

      <!-- Grid Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Card 1: Validação de Componentes -->
        <div class="card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <h2 class="card-title text-xl flex items-center justify-between">
              Componentes daisyUI 5
              <span class="badge badge-primary badge-sm">Ativo</span>
            </h2>
            <p class="text-sm text-base-content/70">Teste interativo de botões, badges e estados.</p>
            
            <div class="divider my-1"></div>

            <div class="flex flex-wrap gap-2 mb-4">
              <button id="btn-counter" class="btn btn-primary btn-sm">
                Cliques: <span id="counter-value" class="font-bold">0</span>
              </button>
              <button id="btn-open-modal" class="btn btn-secondary btn-sm">
                Abrir Modal
              </button>
              <button class="btn btn-outline btn-sm">Outline</button>
            </div>

            <div class="flex flex-wrap gap-2">
              <span class="badge badge-info">TypeScript</span>
              <span class="badge badge-warning">Tailwind v4</span>
              <span class="badge badge-accent">daisyUI v5</span>
              <span class="badge badge-neutral">Alias @/</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Input Interativo -->
        <div class="card bg-base-100 shadow-md border border-base-300">
          <div class="card-body">
            <h2 class="card-title text-xl">Entrada de Dados</h2>
            <p class="text-sm text-base-content/70">Validação de input e reatividade TypeScript.</p>

            <div class="divider my-1"></div>

            <div class="form-control w-full">
              <label class="label" for="paciente-input">
                <span class="label-text font-medium">Nome do Paciente</span>
              </label>
              <input
                id="paciente-input"
                type="text"
                placeholder="Ex: Maria da Silva"
                class="input input-bordered w-full"
              />
            </div>

            <div class="mt-4 p-3 bg-base-200 rounded-lg text-sm flex items-center justify-between">
              <span class="text-base-content/70">Digitado:</span>
              <span id="paciente-preview" class="font-semibold text-primary">Nenhum</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="alert alert-info shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 class="font-bold">Base Inicial Configurada</h3>
          <div class="text-xs">Inicializado em: ${systemInfo.timestamp} | Strict TypeScript + Vite + Tailwind 4</div>
        </div>
      </div>

      <!-- Modal Component -->
      <dialog id="demo-modal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Validação de Modal daisyUI</h3>
          <p class="py-4 text-sm text-base-content/80">
            Este modal comprova a integração de componentes daisyUI e manipulação nativa via DOM TypeScript com método <code>showModal()</code>.
          </p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-sm btn-primary">Fechar</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  `

  // Interactive Logic
  let clickCount = 0
  const counterBtn = document.querySelector<HTMLButtonElement>('#btn-counter')
  const counterValue = document.querySelector<HTMLSpanElement>('#counter-value')

  counterBtn?.addEventListener('click', () => {
    clickCount += 1
    if (counterValue) {
      counterValue.textContent = String(clickCount)
    }
  })

  const modal = document.querySelector<HTMLDialogElement>('#demo-modal')
  const openModalBtn = document.querySelector<HTMLButtonElement>('#btn-open-modal')

  openModalBtn?.addEventListener('click', () => {
    modal?.showModal()
  })

  const pacienteInput = document.querySelector<HTMLInputElement>('#paciente-input')
  const pacientePreview = document.querySelector<HTMLSpanElement>('#paciente-preview')

  pacienteInput?.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement
    if (pacientePreview) {
      pacientePreview.textContent = target.value.trim() || 'Nenhum'
    }
  })
}
