import { Image, TouchableOpacity, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { ThemeProvider } from '@rneui/themed'
import { usePathname } from 'expo-router'
import { Stack, useNavigation, useRouter } from 'expo-router'

import logo from '@/assets/logoEscuro.png'
import Text from '@/components/Text'
import { navigationScreensOptions } from '@/mocks/navigation'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

export default function AppLayout() {
  const theme = useAppSelector(selectThemeState)
  const pathname = usePathname()
  const screenName = pathname.replace(/^\//, '') + '/index'
  const options = navigationScreensOptions[screenName] || {}

  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerBackVisible: false, // desativa o botão padrão
          headerTitle: () => {
            const router = useRouter()
            useNavigation() // necessário para acessar o estado de navegação
            const canGoBack = options.headerBackVisible

            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: canGoBack ? 1 : 0,
                  }}
                >
                  <TouchableOpacity
                    disabled={!canGoBack}
                    onPress={() => router.back()}
                    style={{ paddingHorizontal: 12 }}
                  >
                    <Feather
                      name="arrow-left"
                      size={24}
                      color={theme.colors?.grey1 || 'white'}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {options.icon}
                  <Text style={{ marginLeft: 12, fontWeight: 'bold' }}>
                    {options.title}
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 12,
                  }}
                >
                  <Image
                    source={logo}
                    style={{
                      width: 100,
                      height: 30,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            )
          },
          headerShown: options.headerShown ?? true,
          headerStyle: {
            backgroundColor: theme.colors?.grey0,
          },
        }}
      />
    </ThemeProvider>
  )
}
