import axios from 'axios'

import { useSessionStore } from '@/features/auth/store'

// Configure a URL da API em .env (veja .env.example) — mecanismo oficial do
// Expo para variáveis públicas em runtime (EXPO_PUBLIC_*).
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

// Único papel do interceptor: injetar o token da sessão.
// Tratamento de erro global fica no QueryClient (lib/queryClient.ts).
api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
