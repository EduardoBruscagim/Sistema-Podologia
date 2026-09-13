import React, { useState, useEffect } from 'react'
import type { User, AuthModalTab, LoginCredentials, RegisterData } from '@/types/auth'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'podologia_auth_user'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('login')

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Ignora erro de storage restrito
    }
  }, [user])

  const openAuthModal = (tab: AuthModalTab = 'login') => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const login = async (
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulação assíncrona para feedback realista com DaisyUI loading
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!credentials.email || !credentials.password) {
      return { success: false, error: 'Preencha todos os campos obrigatórios.' }
    }

    if (!credentials.email.includes('@')) {
      return { success: false, error: 'Informe um e-mail válido.' }
    }

    if (credentials.password.length < 6) {
      return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' }
    }

    // Identifica nome amigável a partir do e-mail
    const generatedName = credentials.email
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

    // No frontend, todos os usuários autenticados recebem papel de 'patient'.
    // Permissões administrativas serão estritamente validadas no backend (Supabase RLS).
    const loggedUser: User = {
      id: 'usr_' + Date.now(),
      name: generatedName || 'Paciente',
      email: credentials.email.toLowerCase(),
      role: 'patient',
    }

    setUser(loggedUser)
    closeAuthModal()
    return { success: true }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 700))

    if (!data.name.trim() || !data.email.trim() || !data.password) {
      return { success: false, error: 'Preencha todos os campos obrigatórios.' }
    }

    if (!data.email.includes('@')) {
      return { success: false, error: 'Informe um e-mail válido.' }
    }

    if (data.password.length < 6) {
      return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' }
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      role: 'patient',
    }

    setUser(newUser)
    closeAuthModal()
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
