// -----------------------------------------------------------------------------
// PodoSys — Entry Point
// Bootstrap da aplicação: monta a view, inicializa eventos e Auth.
// -----------------------------------------------------------------------------

import './styles/global.css'
import { renderLandingPage, initLandingEvents } from './features/landing/index.js'
import { renderAuthDrawer, initAuthEvents } from './features/auth/index.js'
import { AuthManager } from './state/auth.js'
import { eventBus } from './utils/eventBus.js'

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
  Eye,
  EyeOff,
  Calendar,
  Clock,
  CheckCircle2,
  UserCheck,
} from 'lucide'

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const ROOT_SELECTOR = 'app'

const LUCIDE_ICONS = {
  ArrowRight,
  ChevronRight,
  Footprints,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  X,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  CheckCircle2,
  UserCheck,
}

// -----------------------------------------------------------------------------
// DOM Assembly
// -----------------------------------------------------------------------------

function getRootElement() {
  const root = document.getElementById(ROOT_SELECTOR)
  if (!root) throw new Error('[PodoSys] Root element #app ausente no index.html')
  return root
}

function renderApplication(rootElement) {
  const parser = new DOMParser()

  const routerView = document.createElement('div')
  routerView.id = 'router-view'
  routerView.className = 'w-full h-full min-h-screen'
  
  const landingNodes = parser.parseFromString(renderLandingPage().trim(), 'text/html').body.childNodes
  routerView.append(...Array.from(landingNodes))

  const authNodes = parser.parseFromString(renderAuthDrawer().trim(), 'text/html').body.childNodes

  rootElement.replaceChildren(routerView, ...Array.from(authNodes))
}

function hydrateApplication() {
  initLandingEvents()
  initAuthEvents()

  createIcons({
    icons: LUCIDE_ICONS,
    nameAttr: 'data-lucide',
    attrs: { 'stroke-width': 1.5 },
  })
}

// -----------------------------------------------------------------------------
// Bootstrap
// -----------------------------------------------------------------------------

async function bootstrap() {
  const rootElement = getRootElement()
  renderApplication(rootElement)
  requestAnimationFrame(hydrateApplication)

  AuthManager.initialize().catch((err) => {
    console.error('[PodoSys] Auth initialization non-fatal error:', err)
  })

  AuthManager.subscribe((property, value) => {
    if (property === 'isAuthenticated' && value === true) {
      // TODO: Transição de rota para a agenda
    }

    if (property === 'isRecoveringPassword' && value === true) {
      eventBus.emit('auth:open', 'update_password')
    }
  })
}

document.addEventListener('DOMContentLoaded', bootstrap)

