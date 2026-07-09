import { AxiosError, AxiosHeaders } from 'axios'

import { showErrorAlert } from '@/lib/alerts'
import { queryClient } from '@/lib/queryClient'

jest.mock('@/lib/alerts', () => ({
  showErrorAlert: jest.fn(),
}))

const mockShowErrorAlert = showErrorAlert as jest.Mock

function axiosErrorWith(status: number, data?: unknown): AxiosError {
  return new AxiosError(
    'request failed',
    'ERR_BAD_RESPONSE',
    { headers: new AxiosHeaders() } as never,
    {},
    {
      status,
      data,
      statusText: '',
      headers: {},
      config: { headers: new AxiosHeaders() } as never,
    },
  )
}

async function runFailingQuery(error: unknown) {
  await queryClient
    .fetchQuery({
      queryKey: ['test', Math.random()],
      queryFn: () => Promise.reject(error),
      retry: false,
    })
    .catch(() => {})
}

describe('tratamento de erro global do queryClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('mostra mensagem genérica de servidor para status 500', async () => {
    await runFailingQuery(axiosErrorWith(500, { message: 'stack trace' }))
    expect(mockShowErrorAlert).toHaveBeenCalledWith(
      expect.stringContaining('erro interno no servidor'),
    )
  })

  it('usa a mensagem da API quando presente', async () => {
    await runFailingQuery(axiosErrorWith(400, { message: 'CPF já cadastrado' }))
    expect(mockShowErrorAlert).toHaveBeenCalledWith('CPF já cadastrado')
  })

  it('usa a mensagem de um Error comum', async () => {
    await runFailingQuery(new Error('Credenciais inválidas'))
    expect(mockShowErrorAlert).toHaveBeenCalledWith('Credenciais inválidas')
  })

  it('cai no fallback para erro desconhecido', async () => {
    await runFailingQuery('boom')
    expect(mockShowErrorAlert).toHaveBeenCalledWith(
      'Algo deu errado. Tente novamente.',
    )
  })

  it('respeita meta.skipGlobalError', async () => {
    await queryClient
      .fetchQuery({
        queryKey: ['skip', Math.random()],
        queryFn: () => Promise.reject(new Error('silencioso')),
        retry: false,
        meta: { skipGlobalError: true },
      })
      .catch(() => {})
    expect(mockShowErrorAlert).not.toHaveBeenCalled()
  })
})
