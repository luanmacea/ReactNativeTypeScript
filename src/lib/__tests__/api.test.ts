import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

import { useSessionStore } from '@/features/auth/store'
import { api } from '@/lib/api'

// Executa manualmente o interceptor de request registrado em lib/api.ts.
function runRequestInterceptor(config: InternalAxiosRequestConfig) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (api.interceptors.request as any).handlers[0]
  return handler.fulfilled(config)
}

function makeConfig(): InternalAxiosRequestConfig {
  return { headers: new AxiosHeaders() } as InternalAxiosRequestConfig
}

describe('interceptor de request da api', () => {
  afterEach(() => {
    useSessionStore.setState({ accessToken: null })
  })

  it('injeta o Bearer token quando há sessão', () => {
    useSessionStore.setState({ accessToken: 'tok-123' })
    const config = runRequestInterceptor(makeConfig())
    expect(config.headers.Authorization).toBe('Bearer tok-123')
  })

  it('não adiciona Authorization sem token', () => {
    useSessionStore.setState({ accessToken: null })
    const config = runRequestInterceptor(makeConfig())
    expect(config.headers.Authorization).toBeUndefined()
  })
})
