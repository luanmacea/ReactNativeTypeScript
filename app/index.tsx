import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View>
      <Text>Bem-vindo ao app!</Text>
      <Button
        title="Ir para Configurações"
        onPress={() => router.push('/settings')}
      />
    </View>
  )
}
