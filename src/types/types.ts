export interface ScreenOption {
  title: string
  headerShown: boolean
  headerBackVisible: boolean
  showInFooter?: boolean
  isApp?: boolean
  icon?: React.ReactNode
}

export interface AuthRouteParams {
  screen: string
}

export interface IUser {
  id: string
  name: string
  cpf: string
  email: string
}
