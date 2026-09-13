export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'patient' | 'podologist' | 'admin'
}

export type AuthModalTab = 'login' | 'register'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAuthModalOpen: boolean
  authModalTab: AuthModalTab
  setAuthModalTab: (tab: AuthModalTab) => void
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  openAuthModal: (tab?: AuthModalTab) => void
  closeAuthModal: () => void
}
