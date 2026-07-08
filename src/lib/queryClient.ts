import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { showErrorAlert } from './alerts'

function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.response?.status === 500) {
      return 'Desculpe, ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.'
    }
    const message = error.response?.data?.message
    if (typeof message === 'string' && message.length > 0) {
      return message
    }
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'Algo deu errado. Tente novamente.'
}

// Tratamento de erro global: qualquer query/mutation rejeitada abre o alerta
// global, a menos que o chamador trate o erro localmente (meta.skipGlobalError).
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.skipGlobalError) return
      showErrorAlert(extractErrorMessage(error))
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalError) return
      showErrorAlert(extractErrorMessage(error))
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000,
    },
  },
})
