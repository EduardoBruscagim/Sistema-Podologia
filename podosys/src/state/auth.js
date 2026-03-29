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

  /** Timeout global para evitar loading infinito. */
  _SESSION_TIMEOUT: 10_000,

  /** Popula o estado global fundindo Auth com a tabela profiles. */
  async _handleSession(session) {
    const currentVersion = ++this._sessionVersion
    authStore.user = session.user

    try {
      const profile = await Promise.race([
        this._fetchProfileWithRetry(session.user.id, currentVersion),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Profile fetch timeout')), this._SESSION_TIMEOUT),
        ),
      ])

      if (this._sessionVersion !== currentVersion) return

      if (profile) {
        authStore.profile = profile
      }
    } catch (err) {
      if (this._sessionVersion !== currentVersion) return
      console.error('[PodoSys] Falha ao buscar profile:', {
        userId: session.user.id,
        error: err.message,
        stack: err.stack,
      })
    }

    // Sempre finaliza o loading, mesmo sem profile
    if (this._sessionVersion === currentVersion) {
      authStore.isAuthenticated = true
      authStore.isLoading = false
    }
  },

  /** Busca profile com retries e backoff exponencial. */
  async _fetchProfileWithRetry(userId, version) {
    const MAX_ATTEMPTS = 3
    const BASE_DELAY = 800

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, street, neighborhood, address_number, role')
        .eq('id', userId)
        .maybeSingle()

      if (this._sessionVersion !== version) return null

      if (error) {
        console.error('[PodoSys] Erro na query de profile (tentativa %d/%d):', attempt + 1, MAX_ATTEMPTS, {
          userId,
          error: error.message,
        })
      }

      if (data) return data

      // Backoff exponencial entre tentativas
      if (attempt < MAX_ATTEMPTS - 1) {
        const delay = BASE_DELAY * Math.pow(2, attempt)
        await new Promise((resolve) => setTimeout(resolve, delay))
        if (this._sessionVersion !== version) return null
      }
    }

    return null
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

  async signUp({ email, password, fullName, phone, street, neighborhood, addressNumber }) {
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
