import { Stack } from 'expo-router'
import { Providers } from '~/redux/provider'

export default function RootLayout() {
  return (
    <Providers>
      <LayoutContent />
    </Providers>
  )
}

import { ThemeProvider } from '@rneui/themed'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'
import { AuthRouteParams } from '~/types/types'
import { navigationScreensOptions } from '~/mocks/navigation'
import { Text, View } from 'react-native'

function LayoutContent() {
  const theme = useAppSelector(selectThemeState)

  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={({ route }) => {
          const screenName = (route.params as AuthRouteParams)?.screen || ''
          const options = navigationScreensOptions[screenName] || {}

          return {
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {options.icon}
                <Text style={{ marginLeft: 8 }}>{options.title}</Text>
              </View>
            ),
            headerShown: options.headerShown ?? true,
            headerBackVisible: options.headerBackVisible ?? true,
            headerStyle: {
              backgroundColor: theme.darkColors?.black,
            },
          }
        }}
      />
    </ThemeProvider>
  )
}
