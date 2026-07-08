import { ActivityIndicator } from 'react-native'

import { useTheme } from '@/theme/provider'

interface LoadingProps {
  size?: number | 'small' | 'large'
  color?: string
}

export default function Loading({ size = 20, color }: LoadingProps) {
  const theme = useTheme()
  return <ActivityIndicator size={size} color={color ?? theme.colors.text} />
}
