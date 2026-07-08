import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { makeStyles, useTheme } from '@/theme/provider'

import Loading from './Loading'

type Variant = 'primary' | 'secondary' | 'outline' | 'gradient'

interface ButtonProps {
  title: string
  onPress: () => void
  isLoading?: boolean
  style?: StyleProp<ViewStyle>
  variant?: Variant
  small?: boolean
}

// Botão flat por padrão. O variant "gradient" é opt-in e usa
// theme.colors.gradients.primary (defina em src/theme/colors.ts para ativar).
export default function Button({
  title,
  onPress,
  isLoading = false,
  style,
  variant = 'primary',
  small = false,
}: ButtonProps) {
  const theme = useTheme()
  const styles = useStyles()

  const containerByVariant: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: theme.colors.primary },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    gradient: {},
  }

  const textColorByVariant: Record<Variant, string> = {
    primary: theme.colors.onPrimary,
    secondary: theme.colors.text,
    outline: theme.colors.primary,
    gradient: theme.colors.onPrimary,
  }

  const content = (
    <View style={[styles.content, small && styles.contentSmall]}>
      <Text style={[styles.text, { color: textColorByVariant[variant] }]}>
        {title}
      </Text>
      {isLoading && <Loading color={textColorByVariant[variant]} />}
    </View>
  )

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerByVariant[variant],
        isLoading && styles.loading,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      {variant === 'gradient' ? (
        <LinearGradient
          colors={
            theme.colors.gradients?.primary ?? [
              theme.colors.primary,
              theme.colors.primary,
            ]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md + theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  contentSmall: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  text: theme.typography.button,
  loading: {
    opacity: 0.6,
  },
}))

export type { ButtonProps }
