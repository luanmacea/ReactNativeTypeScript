import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { Loading } from '@/components/Loading'
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
    <View style={styles.container}>
      <Text style={styles.icon}>👍</Text>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.subtitle}>Carregando suas informações...</Text>
      <Loading />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
})
