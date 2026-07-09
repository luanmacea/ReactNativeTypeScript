import { Redirect } from 'expo-router'

import { useSessionStore } from '@/features/auth/store'

// "/" não é uma tela: manda para a home ou para o login conforme a sessão.
export default function Index() {
  const isAuthenticated = useSessionStore(
    (state) => state.status === 'authenticated',
  )
  return <Redirect href={isAuthenticated ? '/home' : '/sign-in'} />
}
