import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import GlobalAlert from '@/components/GlobalAlert'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'
import { Providers } from '@/redux/provider'

export default function RootLayout() {
  return (
    <Providers>
      <StatusBarComponente />
      <GlobalAlert />
      <Slot />
    </Providers>
  )
}

const StatusBarComponente = () => {
  const theme = useAppSelector(selectThemeState)

  return <StatusBar style={theme?.mode === 'dark' ? 'light' : 'dark'} />
}
