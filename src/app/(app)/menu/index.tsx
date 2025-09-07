import { View, Pressable, StyleSheet, FlatList } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import Container from '@/components/Container'
import Text from '@/components/Text'
import { navigationScreensOptions } from '@/mocks/navigation'
import { logOut } from '@/redux/features/auth/authThunk'
import { useAppDispatch } from '@/redux/hook'

export default function MenuPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const appScreens = Object.entries(navigationScreensOptions).filter(
    ([_, options]) => options.isApp, // eslint-disable-line
  )

  const handleNavigate = (route: string) => {
    const removeIndex = route.lastIndexOf('/')
    router.push(route.slice(0, removeIndex))
  }

  const handleLogout = () => {
    dispatch(logOut())
    router.replace('loading')
  }

  return (
    <Container>
      <FlatList
        data={appScreens}
        keyExtractor={([route]) => route}
        contentContainerStyle={styles.list}
        renderItem={({ item: [route, options] }) => (
          <Pressable
            style={styles.menuItem}
            onPress={() => handleNavigate(route)}
          >
            <View style={styles.icon}>{options.icon}</View>
            <View>
              <Text>{options.title}</Text>
            </View>
          </Pressable>
        )}
        ListFooterComponent={
          <Pressable style={styles.menuItem} onPress={() => handleLogout()}>
            <View style={styles.icon}>
              <Feather name="log-out" size={24} color="grey" />
            </View>
            <View>
              <Text>Sair</Text>
            </View>
          </Pressable>
        }
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
})
