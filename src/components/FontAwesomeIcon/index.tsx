import { FontAwesome } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { ViewStyle } from 'react-native'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

interface FontAwesomeIconProps {
  icon: ComponentProps<typeof FontAwesome>['name']
  size?: number
  style?: ViewStyle
}

export default function FontAwesomeIcon({
  icon,
  size = 20,
  style,
}: FontAwesomeIconProps) {
  const theme = useAppSelector(selectThemeState)
  return (
    <FontAwesome
      name={icon}
      size={size}
      color={theme.colors?.grey2}
      style={style}
    />
  )
}
