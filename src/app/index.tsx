import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export default function Home() {
  return (
    <View>
      <Text>Página Inicial</Text>
      <Link href={'/(tabs)/dashboard'}>dashboard</Link>
    </View>
  )
}
