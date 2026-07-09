import { api } from '@/lib/api'
import { env } from '@/lib/env'
import type { AuthTokens, IUser } from '@/types/types'

import * as mock from './mock'

// Funções axios puras da feature. Este arquivo é o padrão de referência:
// credenciais SEMPRE via POST no corpo (nunca query param), e a resposta
// separa usuário de tokens — só os tokens vão para o SecureStore.
// Ajuste os endpoints para a API real do app derivado.
// No modo de teste (EXPO_PUBLIC_MOCK_API=true), delega para mock.ts.

export interface SignInPayload {
  cpf: string
  password: string
}

export interface SignUpPayload {
  name: string
  cpf: string
  email: string
  password: string
  avatarUrl?: string
}

export interface ChangePasswordPayload {
  cpf: string
  newPassword: string
}

export interface SessionResponse {
  user: IUser
  tokens: AuthTokens
}

export async function signIn(payload: SignInPayload): Promise<SessionResponse> {
  if (env.isMockApi) return mock.signIn(payload)
  const { data } = await api.post<SessionResponse>('/auth/sign-in', payload)
  return data
}

export async function signUp(payload: SignUpPayload): Promise<SessionResponse> {
  if (env.isMockApi) return mock.signUp(payload)
  const { data } = await api.post<SessionResponse>('/auth/sign-up', payload)
  return data
}

export async function verifyCpf(cpf: string): Promise<{ cpf: string }> {
  if (env.isMockApi) return mock.verifyCpf(cpf)
  const { data } = await api.post<{ cpf: string }>('/auth/verify-cpf', { cpf })
  return data
}

export async function changePassword(
  payload: ChangePasswordPayload,
): Promise<SessionResponse> {
  if (env.isMockApi) return mock.changePassword(payload)
  const { data } = await api.post<SessionResponse>(
    '/auth/change-password',
    payload,
  )
  return data
}

export async function getProfile(): Promise<IUser> {
  if (env.isMockApi) return mock.getProfile()
  const { data } = await api.get<IUser>('/me')
  return data
}
