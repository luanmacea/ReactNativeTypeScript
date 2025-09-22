import { Feather } from '@expo/vector-icons'

import { ScreenOption } from '@/types/types'

export const navigationScreensOptions: Record<string, ScreenOption> = {
  'sign-in/index': {
    title: '',
    headerShown: true,
    headerBackVisible: false,
  },
  'sign-up/index': {
    title: '',
    headerShown: true,
    headerBackVisible: true,
  },
  'reset-password/index': {
    title: '',
    headerShown: true,
    headerBackVisible: true,
  },
  'home/index': {
    title: 'Home',
    headerShown: true,
    headerBackVisible: false,
    showInFooter: true,
    icon: <Feather name="home" size={24} color="grey" />,
    isApp: true,
  },
  'profile/index': {
    title: 'Meus dados',
    headerShown: true,
    headerBackVisible: true,
    showInFooter: false,
    isApp: true,
    icon: <Feather name="user" size={24} color="grey" />,
  },
  'menu/index': {
    title: 'Menu',
    headerShown: false,
    headerBackVisible: true,
    showInFooter: true,
    icon: <Feather name="menu" size={24} color="grey" />,
  },
}
