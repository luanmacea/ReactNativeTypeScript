import { Stack } from 'expo-router'

import { useTheme } from '@/theme/provider'

export const unstable_settings = {
  initialRouteName: 'sign-in/index',
}

export default function AuthLayout() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" />
      <Stack.Screen name="reset-password/index" />
    </Stack>
  )
}
