import { StyleSheet, View } from 'react-native'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

export default function Container({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector(selectThemeState)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.darkColors?.background,
    },
  })
  return <View style={styles.container}>{children}</View>
}
