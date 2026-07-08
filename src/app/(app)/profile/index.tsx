import { Image, View } from 'react-native'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { useProfile } from '@/features/auth/hooks'
import { makeStyles } from '@/theme/provider'

export default function ProfilePage() {
  const styles = useStyles()
  const { data: user } = useProfile()

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : '?'
  const hasAvatar = Boolean(user?.avatarUrl && user.avatarUrl.trim().length > 0)

  const info = [
    { label: 'Nome completo', value: user?.name || 'Não informado' },
    { label: 'CPF', value: user?.cpf || 'Não informado' },
    { label: 'E-mail', value: user?.email || 'Não informado' },
  ]

  return (
    <Container>
      <View style={styles.header}>
        {hasAvatar ? (
          <Image
            source={{ uri: user?.avatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text variant="title" style={styles.avatarText}>
              {avatarLetter}
            </Text>
          </View>
        )}
        <View>
          <Text variant="title">{user?.name || 'Usuário'}</Text>
          <Text variant="caption">Conta ativa</Text>
        </View>
      </View>

      <Card contentStyle={styles.card}>
        <Text variant="subtitle" style={styles.sectionTitle}>
          Dados pessoais
        </Text>
        {info.map(({ label, value }) => (
          <View key={label} style={styles.row}>
            <Text variant="caption" style={styles.label}>
              {label}
            </Text>
            <Text variant="subtitle">{value}</Text>
          </View>
        ))}
      </Card>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  avatarText: {
    color: theme.colors.onPrimary,
  },
  card: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  row: {
    gap: theme.spacing.xs,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}))
