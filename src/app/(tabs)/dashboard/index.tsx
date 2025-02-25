import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard</Text>
      <Link href={'profile'}>profile</Link>
    </View>
  )
}
