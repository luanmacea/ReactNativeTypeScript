import { Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

import { Loading } from '../Loading'

interface ButtonProps {
  title: string
  onPress: () => void
  isLoading?: boolean
  style?: ViewStyle
  variant?: 'primary' | 'secondary' | 'outline'
  small?: boolean
}

export default function Button({
  title,
  onPress,
  isLoading = false,
  style,
  variant = 'primary',
  small = false,
}: ButtonProps) {
  const theme = useAppSelector(selectThemeState)

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    gradient: {
      paddingVertical: small ? 8 : 10,
      paddingHorizontal: small ? 15 : 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      opacity: isLoading ? 0.6 : 1,
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
      disabled={isLoading}
    >
      <LinearGradient
        colors={
          variant === 'primary'
            ? [
                theme.colors?.primary ?? '#F7CA02',
                theme.colors?.black ?? '#000000',
              ]
            : variant === 'secondary'
              ? [
                  theme.colors?.grey1 ?? '#FF6600',
                  theme.colors?.grey1 ?? '#FF6600',
                ]
              : ['transparent', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1.4, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
        {isLoading && <Loading />}
      </LinearGradient>
    </TouchableOpacity>
  )
}
