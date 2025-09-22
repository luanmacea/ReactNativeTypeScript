import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import Container from '@/components/Container'
import { Loading } from '@/components/Loading'
import Text from '@/components/Text'
import { LocalStore } from '@/constants/environment-variables'
import { clearAuth, setUser } from '@/redux/features/auth/authSlice'
import { setThemeMode, THEME_KEY } from '@/redux/features/theme/themeSlice'
import { useAppDispatch } from '@/redux/hook'

export default function LoadingPage() {
  const dispatch = useAppDispatch()
  const [initialRoute, setInitialRoute] = useState<string | null>(null)
  const [redirectReady, setRedirectReady] = useState(false)

  const handleGetTheme = async () => {
    const savedMode = await AsyncStorage.getItem(THEME_KEY)
    if (savedMode === 'light' || savedMode === 'dark') {
      dispatch(setThemeMode(savedMode))
    }
  }

  const checkUserAuthentication = async () => {
    try {
      const userData = await SecureStore.getItemAsync(LocalStore.USER_DATA)
      if (userData) {
        dispatch(setUser(JSON.parse(userData)))
        setInitialRoute('/(app)/home')
      } else {
        setInitialRoute('/(auth)/sign-in')
      }
      dispatch(clearAuth())
    } catch (error) {
      console.log(error)
      setInitialRoute('/(auth)/sign-in')
    }
  }

  useEffect(() => {
    handleGetTheme()
    checkUserAuthentication()
  }, [])

  useEffect(() => {
    if (initialRoute) {
      const timer = setTimeout(() => {
        setRedirectReady(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [initialRoute])

  if (redirectReady && initialRoute) {
    return <Redirect href={initialRoute} />
  }

  return (
    <Container style={styles.container}>
      <Text variant="title">Espere um momento!</Text>
      <Text variant="subtitle">Carregando suas informações...</Text>
      <Loading />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
})
