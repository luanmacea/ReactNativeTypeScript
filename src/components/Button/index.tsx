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
      backgroundColor: theme.colors?.secondary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      color: theme.colors?.grey0,
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
