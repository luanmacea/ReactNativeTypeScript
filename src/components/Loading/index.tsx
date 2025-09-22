import { View, ActivityIndicator } from 'react-native'

import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

interface LoadingProps {
  size?: number | 'small' | 'large'
}

export function Loading({ size = 20 }: LoadingProps) {
  const theme = useAppSelector(selectThemeState)
  return (
    <View>
      <ActivityIndicator size={size} color={theme.colors?.grey1} />
    </View>
  )
}
