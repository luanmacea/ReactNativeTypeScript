import * as SecureStore from 'expo-secure-store'

import { clearTokens, loadTokens, saveTokens } from '@/lib/storage'

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

const mockSecureStore = SecureStore as jest.Mocked<typeof SecureStore>

describe('storage de tokens', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('saveTokens', () => {
    it('grava access e refresh token', async () => {
      await saveTokens({ accessToken: 'a', refreshToken: 'r' })
      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
        'access_token',
        'a',
      )
      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
        'refresh_token',
        'r',
      )
    })

    it('não grava refresh token quando ausente', async () => {
      await saveTokens({ accessToken: 'a' })
      expect(mockSecureStore.setItemAsync).toHaveBeenCalledTimes(1)
      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
        'access_token',
        'a',
      )
    })
  })

  describe('loadTokens', () => {
    it('retorna null quando não há access token', async () => {
      mockSecureStore.getItemAsync.mockResolvedValue(null)
      expect(await loadTokens()).toBeNull()
    })

    it('retorna access + refresh quando existem', async () => {
      mockSecureStore.getItemAsync
        .mockResolvedValueOnce('a')
        .mockResolvedValueOnce('r')
      expect(await loadTokens()).toEqual({
        accessToken: 'a',
        refreshToken: 'r',
      })
    })

    it('normaliza refresh ausente para undefined', async () => {
      mockSecureStore.getItemAsync
        .mockResolvedValueOnce('a')
        .mockResolvedValueOnce(null)
      expect(await loadTokens()).toEqual({
        accessToken: 'a',
        refreshToken: undefined,
      })
    })
  })

  describe('clearTokens', () => {
    it('remove ambos os tokens', async () => {
      await clearTokens()
      expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith(
        'access_token',
      )
      expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith(
        'refresh_token',
      )
    })
  })
})
