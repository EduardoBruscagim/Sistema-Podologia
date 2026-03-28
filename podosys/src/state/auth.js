// ============================================================
//  PodoSys — Auth State Manager
//  Store reativo usando ES2024 Proxy para gerenciar sessão.
// ============================================================

import { supabase } from '../api/supabase.js'

// ── Estado Inicial ──────────────────────────────────────────

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  isRecoveringPassword: false,
}

// ── Reatividade (Proxy) ─────────────────────────────────────

const listeners = new Set()

/**
 * Proxy ES2024: intercepta mutações e notifica inscritos.
 * Permite reatividade e atualização parcial do DOM sem Virtual DOM.
 */
export const authStore = new Proxy(initialState, {
  set(target, property, value) {
    target[property] = value
    listeners.forEach((fn) => fn(property, value, target))
    return true
  },
})

// ── Auth Manager ────────────────────────────────────────────

export const AuthManager = {

  /** Registra um callback reativo. Retorna função para desinscrição. */
  subscribe(callback) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },

  // ── Controle de concorrência ────────────────────────────────

  /** ID incremental para cancelar processamentos obsoletos. */
  _sessionVersion: 0,

  /** Recupera sessão ativa e escuta mudanças de autenticação. */
  async initialize() {
    authStore.isLoading = true

    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      await this._handleSession(session)
    } else {
      authStore.isLoading = false
    }

    supabase.auth.onAuthStateChange((event, session) => {
      // INITIAL_SESSION já foi processado acima via getSession()
      if (event === 'INITIAL_SESSION') return

      if (event === 'PASSWORD_RECOVERY') {
        authStore.isRecoveringPassword = true
      }

      if (session) {
        // Não usar await aqui — Supabase v2 bloqueia signUp/signIn
        // até callbacks async do onAuthStateChange resolverem.
        // _handleSession roda em background sem travar o fluxo.
        this._handleSession(session)
      } else {
        this._clearState()
      }
    })
  },

  // ── Sessão ──────────────────────────────────────────────────

  /** Popula o estado global fundindo Auth com a tabela profiles. */
  async _handleSession(session) {
    // Incrementa versão — chamadas simultâneas anteriores são descartadas
    const currentVersion = ++this._sessionVersion

    authStore.user = session.user

    try {
      // Tenta buscar o profile com retries (trigger pode demorar a criar)
      let profile = null
      let attempts = 0
      const MAX_ATTEMPTS = 3
      const RETRY_DELAY = 800

      while (attempts < MAX_ATTEMPTS) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, phone, street, neighborhood, address_number, role')
          .eq('id', session.user.id)
          .maybeSingle()

        // Se outra chamada mais recente já está em andamento, aborta esta
        if (this._sessionVersion !== currentVersion) return

        if (!error && data) {
          profile = data
          break
        }

        attempts++
        if (attempts < MAX_ATTEMPTS) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
          if (this._sessionVersion !== currentVersion) return
        }
      }

      // Garante que ainda somos a chamada mais recente
      if (this._sessionVersion !== currentVersion) return

      if (profile) {
        authStore.profile = profile
      }
    } catch (err) {
      console.warn('[PodoSys] Erro ao buscar profile:', err.message)
    }

    // Sempre finaliza o loading, mesmo sem profile
    if (this._sessionVersion === currentVersion) {
      authStore.isAuthenticated = true
      authStore.isLoading = false
    }
  },

  _clearState() {
    this._sessionVersion++
    authStore.user = null
    authStore.profile = null
    authStore.isAuthenticated = false
    authStore.isLoading = false
  },

  // ── Ações Públicas ────────────────────────────────────────

  async signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  async signUp(email, password, fullName, phone, street, neighborhood, addressNumber) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone, street, neighborhood, address_number: addressNumber } },
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPasswordForEmail(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    })
    if (error) throw error
  },

  async updatePassword(password) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    authStore.isRecoveringPassword = false
  },
}
