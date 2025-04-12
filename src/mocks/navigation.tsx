import { ScreenOption } from '~/types/types'
import { Feather } from '@expo/vector-icons'

export const navigationScreensOptions: Record<string, ScreenOption> = {
    'sign-in/index': {
      title: 'Login',
      headerShown: true,
      headerBackVisible: false,
      icon: <Feather name="log-in" size={24} color="black" />,
    },
    'sign-up/index': {
      title: 'Criar Conta',
      headerShown: true,
      headerBackVisible: true,
      icon: <Feather name="user-plus" size={24} color="black" />,
    },
    'home/index': {
      title: 'Home',
      headerShown: true,
      headerBackVisible: false,
      icon: <Feather name="home" size={24} color="black" />,
    },
  };
