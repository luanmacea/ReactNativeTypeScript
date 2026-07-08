import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import { useTheme } from '@/theme/provider'

type Variant = 'title' | 'subtitle' | 'body' | 'caption'

interface TextProps extends RNTextProps {
  variant?: Variant
}

export default function Text({ variant = 'body', style, ...props }: TextProps) {
  const theme = useTheme()

  const base = {
    ...theme.typography[variant],
    color: variant === 'caption' ? theme.colors.textMuted : theme.colors.text,
  }

  return <RNText {...props} style={[base, style]} />
}
