export interface ScreenOption {
  title: string
  headerShown: boolean
  headerBackVisible: boolean
  showInFooter?: boolean
  icon?: React.ReactNode
}

export interface AuthRouteParams {
  screen: string
}
