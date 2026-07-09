import { ComponentProps } from 'react'
import { ScrollView, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'

type FeatherName = ComponentProps<typeof Feather>['name']

interface Activity {
  icon: FeatherName
  tint: 'primary' | 'success'
  title: string
  desc: string
  time: string
}

// Conteúdo de exemplo — troque pelos seus dados reais.
const ACTIVITIES: Activity[] = [
  {
    icon: 'trending-up',
    tint: 'primary',
    title: 'Item de exemplo',
    desc: 'Isso seria uma descrição',
    time: 'agora',
  },
  {
    icon: 'check',
    tint: 'success',
    title: 'Outro item aqui',
    desc: 'Isso seria uma descrição',
    time: '2h',
  },
]

export default function HomePage() {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()

  const gradient = theme.colors.gradients?.primary ?? [
    theme.colors.primary,
    theme.colors.primary,
  ]

  return (
    <Container safeTop>
      <View style={styles.topBar}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <View>
          <Text variant="caption">Bom dia,</Text>
          <Text variant="subtitle">Usuário</Text>
        </View>
        <View style={styles.bell}>
          <Feather name="bell" size={20} color={theme.colors.text} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroLabel}>Título aqui</Text>
          <Text style={styles.heroValue}>1.248</Text>
          <View style={styles.heroBadge}>
            <Feather
              name="trending-up"
              size={13}
              color={theme.colors.onPrimary}
            />
            <Text style={styles.heroBadgeText}>+12,5% este mês</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <Card style={styles.stat}>
            <Text variant="caption">Estatística</Text>
            <Text variant="title" style={styles.statValue}>
              86%
            </Text>
          </Card>
          <Card style={styles.stat}>
            <Text variant="caption">Estatística</Text>
            <Text variant="title" style={styles.statValue}>
              R$ 4,2k
            </Text>
          </Card>
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="subtitle">Atividade recente</Text>
          <Text
            variant="caption"
            style={styles.link}
            onPress={() => router.push('/feed')}
          >
            Ver tudo
          </Text>
        </View>

        <View style={styles.activityList}>
          {ACTIVITIES.map((item) => {
            const color =
              item.tint === 'success'
                ? theme.colors.success
                : theme.colors.primary
            return (
              <View key={item.title} style={styles.activityRow}>
                <View
                  style={[
                    styles.activityBadge,
                    { backgroundColor: color + '24' },
                  ]}
                >
                  <Feather name={item.icon} size={16} color={color} />
                </View>
                <View style={styles.activityText}>
                  <Text variant="body" style={styles.activityTitle}>
                    {item.title}
                  </Text>
                  <Text variant="caption">{item.desc}</Text>
                </View>
                <Text variant="caption">{item.time}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  bell: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  hero: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md + 2,
    overflow: 'hidden',
  },
  heroLabel: {
    color: theme.colors.onPrimary,
    opacity: 0.75,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: theme.spacing.xs,
  },
  heroValue: {
    color: theme.colors.onPrimary,
    fontSize: 30,
    fontWeight: '700',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs + 1,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm + 2,
    paddingVertical: 3,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.imageBadge,
  },
  heroBadgeText: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 19,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  activityList: {
    gap: theme.spacing.md - theme.spacing.xs,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  activityBadge: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontWeight: '600',
  },
}))
