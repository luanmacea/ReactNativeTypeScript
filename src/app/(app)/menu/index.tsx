import { ComponentProps } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter, type Href } from 'expo-router'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import ScreenHeader from '@/components/ui/ScreenHeader'
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
  { title: 'Feed', icon: 'rss', route: '/feed' },
  { title: 'Itens', icon: 'list', route: '/items' },
  { title: 'Meus dados', icon: 'user', route: '/profile' },
]

export default function MenuPage() {
  const router = useRouter()
  const theme = useTheme()
  const styles = useStyles()
  const signOut = useSignOut()
  const { mode, toggleMode } = useThemeMode()

  const isDark = mode === 'dark'

  return (
    <Container safeTop>
      <ScreenHeader title="Menu" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Cartão do usuário → abre "Meus dados". */}
        <Pressable onPress={() => router.push('/profile')}>
          <Card contentStyle={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>U</Text>
            </View>
            <View style={styles.profileText}>
              <Text variant="subtitle">Usuário de Teste</Text>
              <Text variant="caption">Conta ativa</Text>
            </View>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.colors.textMuted}
            />
          </Card>
        </Pressable>

        {/* Grupo de navegação. */}
        <Card contentStyle={styles.group}>
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={() => router.push(item.route)}
              style={[styles.row, index > 0 && styles.rowDivider]}
            >
              <View style={styles.iconBadge}>
                <Feather
                  name={item.icon}
                  size={18}
                  color={theme.colors.primary}
                />
              </View>
              <Text variant="body" style={styles.rowLabel}>
                {item.title}
              </Text>
              <Feather
                name="chevron-right"
                size={16}
                color={theme.colors.textMuted}
              />
            </Pressable>
          ))}
        </Card>

        {/* Toggle de tema. */}
        <Pressable style={styles.settingRow} onPress={toggleMode}>
          <View style={styles.iconBadgeMuted}>
            <Feather name="moon" size={18} color={theme.colors.text} />
          </View>
          <Text variant="body" style={styles.rowLabel}>
            Modo escuro
          </Text>
          <View style={[styles.switch, isDark && styles.switchOn]}>
            <View
              style={[styles.switchThumb, isDark && styles.switchThumbOn]}
            />
          </View>
        </Pressable>

        {/* Sair. */}
        <Pressable style={styles.settingRow} onPress={signOut}>
          <View style={styles.iconBadgeDanger}>
            <Feather name="log-out" size={18} color={theme.colors.error} />
          </View>
          <Text variant="body" style={[styles.rowLabel, styles.danger]}>
            Sair
          </Text>
        </Pressable>
      </ScrollView>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  scroll: {
    gap: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  profileAvatar: {
    width: 46,
    height: 46,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
    fontSize: 18,
  },
  profileText: {
    flex: 1,
    gap: 1,
  },
  group: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
    padding: theme.spacing.md - theme.spacing.xs,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  rowLabel: {
    flex: 1,
    fontWeight: '600',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary + '1F',
  },
  iconBadgeMuted: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceAlt,
  },
  iconBadgeDanger: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.error + '1F',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
    padding: theme.spacing.md - theme.spacing.xs,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  danger: {
    color: theme.colors.error,
  },
  switch: {
    width: 46,
    height: 26,
    borderRadius: theme.radius.full,
    padding: 3,
    justifyContent: 'center',
    backgroundColor: theme.colors.border,
  },
  switchOn: {
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
