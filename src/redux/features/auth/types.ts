export interface ISignInProps {
  cpf: string
  password: string
}

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}
