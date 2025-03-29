import { StyleSheet, View } from 'react-native'

export default function Container({ children }: { children: React.ReactNode }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  })
  return <View style={styles.container}>{children}</View>
}
