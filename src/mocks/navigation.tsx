import { Feather } from '@expo/vector-icons'

import { ScreenOption } from '@/types/types'

export const navigationScreensOptions: Record<string, ScreenOption> = {
  'sign-in/index': {
    title: 'Login',
    headerShown: true,
    headerBackVisible: false,
    icon: <Feather name="log-in" size={24} color="grey" />,
  },
  'sign-up/index': {
    title: 'Criar Conta',
    headerShown: true,
    headerBackVisible: true,
    icon: <Feather name="user-plus" size={24} color="grey" />,
  },
  'home/index': {
    title: 'Home',
    headerShown: true,
    headerBackVisible: false,
    showInFooter: true,
    icon: <Feather name="home" size={24} color="grey" />,
    isApp: true,
  },
  'menu/index': {
    title: 'Menu',
    headerShown: false,
    headerBackVisible: true,
    showInFooter: true,
    icon: <Feather name="menu" size={24} color="grey" />,
  },
}
