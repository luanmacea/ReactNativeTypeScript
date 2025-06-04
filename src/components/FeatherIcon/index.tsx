import { Feather } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { ViewStyle } from 'react-native'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

interface FeatherIconProps {
  icon: ComponentProps<typeof Feather>['name']
  size?: number
  style?: ViewStyle
}

export default function FeatherIcon({
  icon,
  size = 20,
  style,
}: FeatherIconProps) {
  const theme = useAppSelector(selectThemeState)
  return (
    <Feather
      name={icon}
      size={size}
      color={theme.colors?.grey2}
      style={style}
    />
  )
}
