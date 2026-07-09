import * as mock from '@/features/auth/mock'

describe('mocks de auth (modo de teste)', () => {
  it('signIn aceita as credenciais de teste', async () => {
    const { user, tokens } = await mock.signIn({
      cpf: mock.MOCK_CREDENTIALS.login,
      password: mock.MOCK_CREDENTIALS.password,
    })
    expect(user.id).toBeTruthy()
    expect(tokens.accessToken).toBeTruthy()
  })

  it('signIn aceita login com espaços/maiúsculas', async () => {
    const { user } = await mock.signIn({
      cpf: ` ${mock.MOCK_CREDENTIALS.login.toUpperCase()} `,
      password: mock.MOCK_CREDENTIALS.password,
    })
    expect(user.id).toBeTruthy()
  })

  it('signIn rejeita credenciais erradas', async () => {
    await expect(
      mock.signIn({ cpf: 'admin', password: 'errada' }),
    ).rejects.toThrow('Credenciais inválidas')
  })

  it('getProfile retorna o usuário de teste', async () => {
    const user = await mock.getProfile()
    expect(user.name).toBe('Usuário de Teste')
  })
})
