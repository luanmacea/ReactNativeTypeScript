import { Stack } from 'expo-router'
import { Providers } from '~/redux/provider'

export default function RootLayout() {
  return (
    <Providers>
      <LayoutContent />
    </Providers>
  )
}

// esse componente agora tem acesso ao Redux
import { ThemeProvider } from '@rneui/themed'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

function LayoutContent() {
  const theme = useAppSelector(selectThemeState)

  return (
    <ThemeProvider theme={theme}>
      <Stack />
    </ThemeProvider>
  )
}
