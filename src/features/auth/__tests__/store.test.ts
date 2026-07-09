import { clearTokens, loadTokens, saveTokens } from '@/lib/storage'
import type { AuthTokens, IUser } from '@/types/types'

import { useSessionStore } from '../store'

jest.mock('@/lib/storage', () => ({
  saveTokens: jest.fn().mockResolvedValue(undefined),
  clearTokens: jest.fn().mockResolvedValue(undefined),
  loadTokens: jest.fn(),
}))

const mockLoadTokens = loadTokens as jest.Mock

const user: IUser = {
  id: '1',
  name: 'Fulano',
  cpf: '529.982.247-25',
  email: 'f@e.com',
}
const tokens: AuthTokens = { accessToken: 'acc', refreshToken: 'ref' }

describe('useSessionStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSessionStore.setState({
      status: 'loading',
      user: null,
      accessToken: null,
    })
  })

  describe('setSession', () => {
    it('autentica e persiste os tokens', () => {
      useSessionStore.getState().setSession(user, tokens)
      const state = useSessionStore.getState()
      expect(state.status).toBe('authenticated')
      expect(state.user).toEqual(user)
      expect(state.accessToken).toBe('acc')
      expect(saveTokens).toHaveBeenCalledWith(tokens)
    })
  })

  describe('clearSession', () => {
    it('limpa a sessão e os tokens do storage', () => {
      useSessionStore.getState().setSession(user, tokens)
      useSessionStore.getState().clearSession()
      const state = useSessionStore.getState()
      expect(state.status).toBe('unauthenticated')
      expect(state.user).toBeNull()
      expect(state.accessToken).toBeNull()
      expect(clearTokens).toHaveBeenCalled()
    })
  })

  describe('hydrate', () => {
    it('autentica quando há tokens no storage', async () => {
      mockLoadTokens.mockResolvedValue({ accessToken: 'acc' })
      await useSessionStore.getState().hydrate()
      const state = useSessionStore.getState()
      expect(state.status).toBe('authenticated')
      expect(state.accessToken).toBe('acc')
    })

    it('fica não autenticado quando não há tokens', async () => {
      mockLoadTokens.mockResolvedValue(null)
      await useSessionStore.getState().hydrate()
      expect(useSessionStore.getState().status).toBe('unauthenticated')
    })

    it('fica não autenticado quando o storage falha', async () => {
      mockLoadTokens.mockRejectedValue(new Error('boom'))
      await useSessionStore.getState().hydrate()
      expect(useSessionStore.getState().status).toBe('unauthenticated')
    })
  })
})
