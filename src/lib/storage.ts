import * as SecureStore from 'expo-secure-store'

import type { AuthTokens } from '@/types/types'

// Acesso tipado ao SecureStore. Somente tokens vão para storage seguro —
// nunca persistir o usuário inteiro (muito menos senha).

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken)
  if (tokens.refreshToken) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }
}

export async function loadTokens(): Promise<AuthTokens | null> {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
  if (!accessToken) return null

  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
  return { accessToken, refreshToken: refreshToken ?? undefined }
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}
