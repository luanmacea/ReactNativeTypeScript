import api from '~/services/api'

import { ISignInProps } from '../features/auth/types'

export const signInApi = (data: ISignInProps) =>
  api.post('/auth/login', {
    cpf: data.cpf,
    senha: data.password,
    rememberMe: true,
    isMobile: true,
  })

export const signOutApi = () => api.post('/auth/logout')
