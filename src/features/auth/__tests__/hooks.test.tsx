import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react-native'

import type { IUser } from '@/types/types'

import * as authApi from '../api'
import { useProfile, useSignIn, useSignOut } from '../hooks'
import { useSessionStore } from '../store'

jest.mock('../api')
jest.mock('@/lib/storage', () => ({
  saveTokens: jest.fn().mockResolvedValue(undefined),
  clearTokens: jest.fn().mockResolvedValue(undefined),
  loadTokens: jest.fn(),
}))

const mockedApi = authApi as jest.Mocked<typeof authApi>

const user: IUser = {
  id: '1',
  name: 'Fulano',
  cpf: '529.982.247-25',
  email: 'f@e.com',
}
const tokens = { accessToken: 'acc', refreshToken: 'ref' }

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}

describe('hooks de auth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSessionStore.setState({
      status: 'loading',
      user: null,
      accessToken: null,
    })
  })

  it('useSignIn autentica a sessão no sucesso', async () => {
    mockedApi.signIn.mockResolvedValue({ user, tokens })
    const { result } = await renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    })

    await result.current.mutateAsync({ cpf: 'admin', password: '123' })

    await waitFor(() => {
      expect(useSessionStore.getState().status).toBe('authenticated')
    })
    expect(useSessionStore.getState().user).toEqual(user)
  })

  it('useSignIn não autentica quando a API falha', async () => {
    mockedApi.signIn.mockRejectedValue(new Error('Credenciais inválidas'))
    const { result } = await renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    })

    await expect(
      result.current.mutateAsync({ cpf: 'x', password: 'y' }),
    ).rejects.toThrow('Credenciais inválidas')
    expect(useSessionStore.getState().status).not.toBe('authenticated')
  })

  it('useProfile fica desabilitado enquanto não autenticado', async () => {
    useSessionStore.setState({ status: 'unauthenticated' })
    const { result } = await renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    })
    expect(result.current.fetchStatus).toBe('idle')
    expect(mockedApi.getProfile).not.toHaveBeenCalled()
  })

  it('useProfile busca o perfil quando autenticado', async () => {
    useSessionStore.setState({ status: 'authenticated' })
    mockedApi.getProfile.mockResolvedValue(user)
    const { result } = await renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.data).toEqual(user))
    expect(mockedApi.getProfile).toHaveBeenCalled()
  })

  it('useSignOut limpa a sessão', async () => {
    useSessionStore.setState({ status: 'authenticated', accessToken: 'acc' })
    const { result } = await renderHook(() => useSignOut(), {
      wrapper: createWrapper(),
    })

    result.current()

    expect(useSessionStore.getState().status).toBe('unauthenticated')
    expect(useSessionStore.getState().accessToken).toBeNull()
  })
})
