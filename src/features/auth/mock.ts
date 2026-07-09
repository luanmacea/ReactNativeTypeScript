import type { AuthTokens, IUser } from '@/types/types'

import type {
  ChangePasswordPayload,
  SessionResponse,
  SignInPayload,
  SignUpPayload,
} from './api'

// Mocks do modo de teste (EXPO_PUBLIC_MOCK_API=true — yarn dev:test).
// Permitem navegar pelo app sem backend: login "admin", senha "123".
// api.ts delega para cá quando o modo está ativo; nada aqui vai para produção
// desde que a variável fique desligada.

export const MOCK_CREDENTIALS = {
  login: 'admin',
  password: '123',
}

const mockUser: IUser = {
  id: '1',
  name: 'Usuário de Teste',
  cpf: '529.982.247-25',
  email: 'teste@exemplo.com',
}

const mockTokens: AuthTokens = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
}

// Pequeno atraso para simular rede e exercitar os estados de loading
function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function signIn({
  cpf,
  password,
}: SignInPayload): Promise<SessionResponse> {
  await delay()
  const isValid =
    cpf.trim().toLowerCase() === MOCK_CREDENTIALS.login &&
    password === MOCK_CREDENTIALS.password

  if (!isValid) {
    throw new Error(
      `Credenciais inválidas. No modo de teste use "${MOCK_CREDENTIALS.login}" e senha "${MOCK_CREDENTIALS.password}".`,
    )
  }
  return { user: mockUser, tokens: mockTokens }
}

export async function signUp(payload: SignUpPayload): Promise<SessionResponse> {
  await delay()
  return {
    user: {
      id: '2',
      name: payload.name,
      cpf: payload.cpf,
      email: payload.email,
      avatarUrl: payload.avatarUrl,
    },
    tokens: mockTokens,
  }
}

export async function verifyCpf(cpf: string): Promise<{ cpf: string }> {
  await delay()
  return { cpf }
}

export async function changePassword(
  payload: ChangePasswordPayload,
): Promise<SessionResponse> {
  await delay()
  return { user: { ...mockUser, cpf: payload.cpf }, tokens: mockTokens }
}

export async function getProfile(): Promise<IUser> {
  await delay(200)
  return mockUser
}
