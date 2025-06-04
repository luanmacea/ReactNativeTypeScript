import React from 'react'
import { ViewStyle, StyleSheet, View } from 'react-native'
import { useAppSelector } from '~/redux/hook'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export default function Card({ children, style }: CardProps) {
  const theme = useAppSelector(selectThemeState)

  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors?.grey4 }, style]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 2, // para Android
    shadowColor: '#000', // para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
})
