import { create } from 'zustand'

import { clearTokens, loadTokens, saveTokens } from '@/lib/storage'
import type { AuthTokens, IUser } from '@/types/types'

// Estado de CLIENTE da sessão (token + usuário em memória).
// Estado de SERVIDOR (perfil, dados de negócio) fica em hooks.ts (TanStack Query).

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface SessionState {
  status: SessionStatus
  user: IUser | null
  accessToken: string | null
  setSession: (user: IUser, tokens: AuthTokens) => void
  clearSession: () => void
  hydrate: () => Promise<void>
}

export const useSessionStore = create<SessionState>()((set) => ({
  status: 'loading',
  user: null,
  accessToken: null,

  setSession: (user, tokens) => {
    set({ status: 'authenticated', user, accessToken: tokens.accessToken })
    saveTokens(tokens).catch(() => {})
  },

  clearSession: () => {
    set({ status: 'unauthenticated', user: null, accessToken: null })
    clearTokens().catch(() => {})
  },

  // Chamado uma vez no bootstrap do root layout, segurando a splash screen.
  hydrate: async () => {
    try {
      const tokens = await loadTokens()
      if (tokens) {
        set({ status: 'authenticated', accessToken: tokens.accessToken })
      } else {
        set({ status: 'unauthenticated' })
      }
    } catch {
      set({ status: 'unauthenticated' })
    }
  },
}))
