import { api } from '@/lib/api'
import type { IUser } from '@/types/types'

import { changePassword, getProfile, signIn, signUp, verifyCpf } from '../api'

// Testa o caminho de API real (modo de teste desligado).
jest.mock('@/lib/env', () => ({ env: { isMockApi: false } }))
jest.mock('@/lib/api', () => ({
  api: { post: jest.fn(), get: jest.fn() },
}))

const mockedApi = api as unknown as {
  post: jest.Mock
  get: jest.Mock
}

const user: IUser = {
  id: '1',
  name: 'Fulano',
  cpf: '529.982.247-25',
  email: 'f@e.com',
}
const tokens = { accessToken: 'acc' }

describe('api de auth (modo real)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedApi.post.mockResolvedValue({ data: { user, tokens } })
    mockedApi.get.mockResolvedValue({ data: user })
  })

  it('signIn faz POST em /auth/sign-in com credenciais no corpo', async () => {
    const payload = { cpf: 'admin', password: '123' }
    const result = await signIn(payload)
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/sign-in', payload)
    expect(result).toEqual({ user, tokens })
  })

  it('signUp faz POST em /auth/sign-up', async () => {
    const payload = {
      name: 'Fulano',
      cpf: 'x',
      email: 'f@e.com',
      password: '123',
    }
    await signUp(payload)
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/sign-up', payload)
  })

  it('verifyCpf faz POST em /auth/verify-cpf', async () => {
    mockedApi.post.mockResolvedValue({ data: { cpf: '123' } })
    const result = await verifyCpf('123')
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/verify-cpf', {
      cpf: '123',
    })
    expect(result).toEqual({ cpf: '123' })
  })

  it('changePassword faz POST em /auth/change-password', async () => {
    const payload = { cpf: 'x', newPassword: 'nova' }
    await changePassword(payload)
    expect(mockedApi.post).toHaveBeenCalledWith(
      '/auth/change-password',
      payload,
    )
  })

  it('getProfile faz GET em /me', async () => {
    const result = await getProfile()
    expect(mockedApi.get).toHaveBeenCalledWith('/me')
    expect(result).toEqual(user)
  })
})
