import { ComponentProps } from 'react'
import { StyleProp, TextStyle } from 'react-native'

import { Feather, FontAwesome } from '@expo/vector-icons'

import { useTheme } from '@/theme/provider'

interface IconBaseProps {
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

interface FeatherIconProps extends IconBaseProps {
  icon: ComponentProps<typeof Feather>['name']
}

interface FontAwesomeIconProps extends IconBaseProps {
  icon: ComponentProps<typeof FontAwesome>['name']
}

export function FeatherIcon({
  icon,
  size = 20,
  color,
  style,
}: FeatherIconProps) {
  const theme = useTheme()
  return (
    <Feather
      name={icon}
      size={size}
      color={color ?? theme.colors.textMuted}
      style={style}
    />
  )
}

export function FontAwesomeIcon({
  icon,
  size = 20,
  color,
  style,
}: FontAwesomeIconProps) {
  const theme = useTheme()
  return (
    <FontAwesome
      name={icon}
      size={size}
      color={color ?? theme.colors.textMuted}
      style={style}
    />
  )
}
