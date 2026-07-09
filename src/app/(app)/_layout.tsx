import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { useTheme } from '@/theme/provider'

// Tab bar do expo-router. O header NATIVO fica DESLIGADO (headerShown: false):
// cada tela desenha seu próprio cabeçalho com <ScreenHeader> dentro de um
// <Container safeTop>. Título/ícone de cada aba são declarados aqui.
export default function AppLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
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
        name="items/index"
        options={{
          title: 'Itens',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu/index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />

      {/* Telas navegáveis que não aparecem na tab bar (href: null). */}
      <Tabs.Screen name="profile/index" options={{ href: null }} />
      <Tabs.Screen name="feed/index" options={{ href: null }} />
      <Tabs.Screen name="item-detail/index" options={{ href: null }} />
      <Tabs.Screen name="item-form/index" options={{ href: null }} />
    </Tabs>
  )
}
