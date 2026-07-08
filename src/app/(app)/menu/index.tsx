import { ComponentProps } from 'react'
import { FlatList, Pressable, View, type ListRenderItem } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter, type Href } from 'expo-router'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { useSignOut } from '@/features/auth/hooks'
import { makeStyles, useTheme, useThemeMode } from '@/theme/provider'

interface MenuItem {
  title: string
  icon: ComponentProps<typeof Feather>['name']
  route: Href
}

// Itens do menu declarados na própria tela — sem registro central de navegação.
const MENU_ITEMS: MenuItem[] = [
  { title: 'Home', icon: 'home', route: '/home' },
  { title: 'Meus dados', icon: 'user', route: '/profile' },
]

export default function MenuPage() {
  const router = useRouter()
  const theme = useTheme()
  const styles = useStyles()
  const signOut = useSignOut()
  const { mode, toggleMode } = useThemeMode()

  const isDark = mode === 'dark'

  const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
    <Pressable onPress={() => router.push(item.route)}>
      <Card contentStyle={styles.menuContent}>
        <View style={styles.iconBadge}>
          <Feather name={item.icon} size={22} color={theme.colors.primary} />
        </View>
        <Text variant="subtitle">{item.title}</Text>
      </Card>
    </Pressable>
  )

  return (
    <Container>
      <FlatList<MenuItem>
        data={MENU_ITEMS}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable onPress={signOut}>
              <Card contentStyle={styles.menuContent}>
                <View style={styles.iconBadge}>
                  <Feather
                    name="log-out"
                    size={22}
                    color={theme.colors.primary}
                  />
                </View>
                <Text variant="subtitle">Sair</Text>
              </Card>
            </Pressable>

            <View style={styles.themeRow}>
              <Text variant="subtitle">Modo escuro</Text>
              <Pressable
                onPress={toggleMode}
                style={[styles.themeSwitch, isDark && styles.themeSwitchOn]}
              >
                <View
                  style={[styles.switchThumb, isDark && styles.switchThumbOn]}
                />
              </Pressable>
            </View>
          </View>
        }
      />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  footer: {
    gap: theme.spacing.md,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  themeSwitch: {
    width: 48,
    height: 28,
    borderRadius: theme.radius.full,
    padding: theme.spacing.xs,
    justifyContent: 'center',
    backgroundColor: theme.colors.border,
  },
  themeSwitchOn: {
    backgroundColor: theme.colors.primary,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceAlt,
  },
  switchThumbOn: {
    transform: [{ translateX: 20 }],
    backgroundColor: theme.colors.onPrimary,
  },
}))
