import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      {/* Tabs como a tela principal do app */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Outras telas fora das tabs (empilháveis) */}
      <Stack.Screen name="profile" options={{ title: 'Meu Perfil' }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes' }} />
    </Stack>
  )
}
