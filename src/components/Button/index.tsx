import { LinearGradient } from 'expo-linear-gradient'
import { Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
}

export default function Button({ title, onPress, style }: ButtonProps) {
  const theme = useAppSelector(selectThemeState)

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    gradient: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.colors?.grey0,
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[
          theme.colors?.primary ?? '#F7CA02',
          theme.colors?.black ?? '#000000',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.4, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
