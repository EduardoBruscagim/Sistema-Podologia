// ============================================================
//  PodoSys — Auth State Manager
//  Store reativo usando ES2024 Proxy para gerenciar sessão e perfil.
// ============================================================

import { supabase } from '../api/supabase.js'

// ── Estado Inicial ──────────────────────────────────────────

const initialState = {
  user: null, // Dados do supabase.auth
  profile: null, // Dados da tabela 'profiles' (nome, role, telefone)
  isAuthenticated: false,
  isLoading: true, // Protege as rotas da SPA enquanto checa o banco
  isRecoveringPassword: false, // Dispara via URL de reset de senha
}

// ── Sistema de Reatividade (Proxy) ──────────────────────────

const listeners = new Set()

/**
 * Proxy ES2024: Intercepta mutações no objeto alvo e notifica inscritos.
 * Permite reatividade e atualização parcial do DOM sem Virtual DOM.
 */
export const authStore = new Proxy(initialState, {
  set(target, property, value) {
    target[property] = value
    listeners.forEach((listener) => listener(property, value, target))
    return true
  },
})

// ── Auth Manager API ────────────────────────────────────────

export const AuthManager = {
  subscribe(callback) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },

  /**
   * Inicializa o motor, recupera sessão ativa e escuta mudanças.
   */
  async initialize() {
    authStore.isLoading = true

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      await this._handleSession(session)
    } else {
      authStore.isLoading = false
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        authStore.isRecoveringPassword = true
      }
      if (session) {
        await this._handleSession(session)
      } else {
        this._clearState()
      }
    })
  },

  /**
   * Popula o estado global fundindo Auth com a tabela profiles (RLS ativo).
   */
  async _handleSession(session) {
    authStore.user = session.user

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('full_name, phone, role')
      .eq('id', session.user.id)
      .single()

    if (!error && profile) {
      authStore.profile = profile
    }

    authStore.isAuthenticated = true
    authStore.isLoading = false
  },

  _clearState() {
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

  async signUp(email, password, fullName, phone, address) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone, address } },
    })
    if (error) throw error
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPasswordForEmail(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    })
    if (error) throw error
  },

  async updatePassword(password) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    authStore.isRecoveringPassword = false
  },
}
