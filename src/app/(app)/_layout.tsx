import React, { isValidElement, ReactElement } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Feather } from '@expo/vector-icons'
import { ThemeProvider } from '@rneui/themed'
import { Slot, usePathname, useRouter } from 'expo-router'

import Text from '@/components/Text'
import { navigationScreensOptions } from '@/mocks/navigation'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

export default function AppLayout() {
  const theme = useAppSelector(selectThemeState)
  const pathname = usePathname()
  const screenName = pathname.replace(/^\//, '') + '/index'
  const options = navigationScreensOptions[screenName] || {}
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const routes = Object.entries(navigationScreensOptions).filter(
    ([_, config]) => config.showInFooter, // eslint-disable-line
  )

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        {options.headerShown !== false && (
          <View
            style={{
              paddingTop: insets.top + 8,
              paddingBottom: 8,
              paddingHorizontal: 16,
              backgroundColor: theme.colors?.grey0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: options.headerBackVisible ? 1 : 0,
              }}
            >
              <TouchableOpacity
                disabled={!options.headerBackVisible}
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
            <View />
          </View>
        )}

        <Slot />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: insets.bottom,
            paddingTop: 8,
            borderTopWidth: 1,
            borderColor: theme.colors?.grey2,
            backgroundColor: theme.colors?.grey0,
          }}
        >
          {routes.map(([route, { icon, title }]) => {
            const isActive = pathname.includes(route.replace('/index', ''))
            return (
              <TouchableOpacity
                key={route}
                onPress={() => router.push('/' + route.replace('/index', ''))}
                style={{ alignItems: 'center', gap: 4 }}
              >
                {isValidElement(icon) &&
                  React.cloneElement(icon as ReactElement, {
                    color: isActive
                      ? theme.colors?.primary
                      : theme.colors?.grey2,
                  })}
                <Text
                  style={{
                    fontSize: 12,
                    color: isActive
                      ? theme.colors?.primary
                      : theme.colors?.grey2,
                  }}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ThemeProvider>
  )
}
