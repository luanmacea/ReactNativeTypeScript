import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { makeStyles, useTheme } from '@/theme/provider'

interface CardProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  variant?: 'flat' | 'gradient'
}

// Card flat por padrão. O variant "gradient" é opt-in e usa
// theme.colors.gradients.card (defina em src/theme/colors.ts para ativar).
export default function Card({
  children,
  style,
  contentStyle,
  variant = 'flat',
}: CardProps) {
  const theme = useTheme()
  const styles = useStyles()

  if (variant === 'gradient') {
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={
            theme.colors.gradients?.card ?? [
              theme.colors.surface,
              theme.colors.surface,
            ]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.content, contentStyle]}
        >
          {children}
        </LinearGradient>
      </View>
    )
  }

  return (
    <View style={[styles.container, styles.flat, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    ...theme.elevation.card,
  },
  flat: {
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.md,
  },
}))
