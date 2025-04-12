import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
}

export default function Button({ title, onPress, style }: ButtonProps) {
  const theme = useAppSelector(selectThemeState)

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.darkColors?.secondary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
