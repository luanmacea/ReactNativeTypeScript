import { useEffect, useState } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import Alert from '@/components/ui/Alert'
import { useSessionStore } from '@/features/auth/store'
import { useAlertStore } from '@/lib/alerts'
import { queryClient } from '@/lib/queryClient'
import {
  loadStoredThemeMode,
  ThemeMode,
  ThemeProvider,
  useThemeMode,
} from '@/theme/provider'

// Bootstrap acontece aqui segurando a splash screen — não existe tela de loading.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [themeMode, setThemeMode] = useState<ThemeMode | null>(null)
  const sessionStatus = useSessionStore((state) => state.status)
  const hydrateSession = useSessionStore((state) => state.hydrate)

  useEffect(() => {
    Promise.all([loadStoredThemeMode(), hydrateSession()]).then(([mode]) => {
      setThemeMode(mode ?? 'dark')
    })
  }, [hydrateSession])

  const isReady = themeMode !== null && sessionStatus !== 'loading'

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <ThemeProvider initialMode={themeMode}>
      <QueryClientProvider client={queryClient}>
        <ThemedStatusBar />
        <GlobalAlert />
        <RootNavigator />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

function RootNavigator() {
  const sessionStatus = useSessionStore((state) => state.status)
  const isAuthenticated = sessionStatus === 'authenticated'

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}

function ThemedStatusBar() {
  const { mode } = useThemeMode()
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
}

function GlobalAlert() {
  const { open, title, message, type, hide } = useAlertStore()

  if (!open || !message) {
    return null
  }

  return (
    <Alert
      open={open}
      title={title}
      message={message}
      type={type}
      onClose={hide}
    />
  )
}
