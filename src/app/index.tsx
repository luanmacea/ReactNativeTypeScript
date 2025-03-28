import { Redirect } from 'expo-router'
// import { Text, View } from 'react-native'

export default function Index() {
  return <Redirect href="/(auth)/sign-in" />
  // return (
  //   <View>
  //     <Text>Teste</Text>
  //   </View>
  // )
}
