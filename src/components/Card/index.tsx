import React from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { cardAppearance } from '@/constants/theme'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  contentStyle?: StyleProp<ViewStyle>
  variant?: 'gradient' | 'flat'
  gradientColors?: [string, string]
}

export default function Card({
  children,
  style,
  contentStyle,
  variant = 'gradient',
  gradientColors,
}: CardProps) {
  const theme = useAppSelector(selectThemeState)
  const palette =
    theme.mode === 'dark' ? cardAppearance.dark : cardAppearance.light
  const colors = theme.colors || {}

  const computedGradient: [string, string] = gradientColors || palette.gradient
  const borderColor = palette.border
  const flatBackground = colors.grey4 || palette.gradient[0]

  const innerStyle = StyleSheet.flatten([
    styles.inner,
    contentStyle,
  ]) as ViewStyle

  const flatInnerStyle = StyleSheet.flatten([
    innerStyle,
    { backgroundColor: flatBackground },
  ]) as ViewStyle

  return (
    <View style={[styles.container, { borderColor }, style]}>
      {variant === 'flat' ? (
        <View style={flatInnerStyle}>{children}</View>
      ) : (
        <LinearGradient
          colors={computedGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={innerStyle}
        >
          {children}
        </LinearGradient>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: 'transparent',
  },
  inner: {
    padding: 16,
  },
})
