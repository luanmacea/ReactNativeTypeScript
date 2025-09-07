import { View, ActivityIndicator } from 'react-native'

import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

export function Loading() {
  const theme = useAppSelector(selectThemeState)
  return (
    <View>
      <ActivityIndicator size="large" color={theme.colors?.grey1} />
    </View>
  )
}
