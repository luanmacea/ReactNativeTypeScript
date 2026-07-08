import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'

import * as authApi from './api'
import { useSessionStore } from './store'

// Hooks de TanStack Query da feature. Padrão a copiar em features novas:
// mutations para escrita, queries para leitura, side-effects de sessão no onSuccess.

export function useSignIn() {
  const setSession = useSessionStore((state) => state.setSession)
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: ({ user, tokens }) => setSession(user, tokens),
  })
}

export function useSignUp() {
  const setSession = useSessionStore((state) => state.setSession)
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: ({ user, tokens }) => setSession(user, tokens),
  })
}

export function useVerifyCpf() {
  return useMutation({
    mutationFn: authApi.verifyCpf,
  })
}

export function useChangePassword() {
  const setSession = useSessionStore((state) => state.setSession)
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: ({ user, tokens }) => setSession(user, tokens),
  })
}

export function useProfile() {
  const status = useSessionStore((state) => state.status)
  const cachedUser = useSessionStore((state) => state.user)
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authApi.getProfile,
    enabled: status === 'authenticated',
    placeholderData: cachedUser ?? undefined,
  })
}

export function useSignOut() {
  const clearSession = useSessionStore((state) => state.clearSession)
  return () => {
    clearSession()
    queryClient.clear()
  }
}
