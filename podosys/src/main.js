// ============================================================
//  PodoSys — Entry Point
//  Bootstrap da aplicação: monta a view, inicializa eventos e Auth.
// ============================================================

import './styles/global.css'
import { renderLandingPage, initLandingEvents } from './features/landing/index.js'
import { renderAuthDrawer, initAuthEvents } from './features/auth/index.js'
import { AuthManager, authStore } from './state/auth.js'

import {
  createIcons,
  ArrowRight,
  ChevronRight,
  Footprints,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide'

const ROOT_SELECTOR = 'app'

const LUCIDE_ICONS = { ArrowRight, ChevronRight, Footprints, LayoutDashboard, Menu, Moon, Sun, X }

function getRootElement() {
  const root = document.getElementById(ROOT_SELECTOR)
  if (!root) throw new Error('Critical: Root element #app missing from index.html')
  return root
}

function renderApplication(rootElement) {
  const template = document.createElement('template')

  // Monta o layout base: View Principal + Drawer de Autenticação sobreposto
  template.innerHTML = `
    <div id="router-view" class="w-full h-full min-h-screen">
      ${renderLandingPage().trim()}
    </div>
    ${renderAuthDrawer().trim()}
  `

  rootElement.replaceChildren(...template.content.childNodes)
}

function hydrateApplication() {
  initLandingEvents()
  initAuthEvents() // Hidrata a lógica do Drawer de Auth

  createIcons({
    icons: LUCIDE_ICONS,
    nameAttr: 'data-lucide',
    attrs: { 'stroke-width': 1.5 },
  })
}

// ── Bootstrap ───────────────────────────────────────────────

async function bootstrap() {
  const rootElement = getRootElement()
  renderApplication(rootElement)
  requestAnimationFrame(hydrateApplication)

  // Inicializa a sessão com o Supabase de forma assíncrona
  await AuthManager.initialize()

  // Escuta as reações do nosso Store Proxy (Reatividade sem React)
  AuthManager.subscribe((property, value, target) => {
    if (property === 'isAuthenticated' && value === true) {
      console.log('Usuário Autenticado via Proxy!', target.profile)
      // Aqui faremos a transição de rota para a agenda no futuro
    }
    
    // Dispara modal para refazer a senha caso usuário tenha voltado pelo link do e-mail
    if (property === 'isRecoveringPassword' && value === true) {
      if (window.openAuthDrawer) {
        window.openAuthDrawer('update_password')
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', bootstrap)
