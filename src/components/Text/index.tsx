import { Text as RNEText, TextProps } from '@rneui/themed'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

export default function Text(props: TextProps) {
  const theme = useAppSelector(selectThemeState)
  return (
    <RNEText
      {...props}
      style={[
        { color: theme.mode === 'dark' ? theme.colors?.white : '' },
        props.style,
      ]}
    />
  )
}
