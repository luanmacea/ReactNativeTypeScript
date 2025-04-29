import { StyleSheet, View, ViewStyle } from 'react-native'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

interface IContainerProps {
  children: React.ReactNode
  style?: ViewStyle
}

export default function Container({ children, style }: IContainerProps) {
  const theme = useAppSelector(selectThemeState)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors?.background,
      ...style,
    },
  })
  return <View style={styles.container}>{children}</View>
}
