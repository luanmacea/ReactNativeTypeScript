import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { useTheme } from '@/theme/provider'

// Header e tab bar nativos do expo-router. Título/ícone de cada tela são
// declarados aqui, na própria navegação — não existe registro central.
export default function AppLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surfaceAlt },
        headerTintColor: theme.colors.text,
        headerTitleStyle: theme.typography.subtitle,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceAlt,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu/index"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Meus dados',
          // Não aparece na tab bar; acessível via menu (router.push('/profile'))
          href: null,
        }}
      />
    </Tabs>
  )
}
