export interface IUser {
  id: string
  name: string
  cpf: string
  email: string
  avatarUrl?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}
