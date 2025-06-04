import { Text as RNEText, TextProps as RNETextProps } from '@rneui/themed'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'
import { StyleProp, TextStyle } from 'react-native'

type Variant = 'title' | 'subtitle' | 'body' | 'caption'

interface CustomTextProps extends RNETextProps {
  variant?: Variant
  style?: StyleProp<TextStyle>
}

export default function Text({
  variant = 'body',
  style,
  ...props
}: CustomTextProps) {
  const theme = useAppSelector(selectThemeState)

  const variantStyle: Record<Variant, TextStyle> = {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    body: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
      color: '#888',
    },
  }

  return (
    <RNEText
      {...props}
      style={[
        variantStyle[variant],
        theme.mode === 'dark' ? { color: theme.colors?.white } : {},
        style,
      ]}
    />
  )
}
