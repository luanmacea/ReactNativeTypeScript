import { ThemeProvider } from '@rneui/themed'
import { Stack } from 'expo-router'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'
import { Providers } from '~/redux/provider'

export default function RootLayout() {
  const theme = useAppSelector(selectThemeState)

  return (
    <ThemeProvider theme={theme}>
      <Providers>
        <Stack />
      </Providers>
    </ThemeProvider>
  )
}
