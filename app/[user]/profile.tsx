import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function ProfileScreen() {
  const { user } = useLocalSearchParams() // Pega o parâmetro da URL

  return (
    <View>
      {' '}
      <Text>Perfil do usuário: {user}</Text>
    </View>
  )
}
