import { Fragment } from 'react'
import { Image, View } from 'react-native'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import ScreenHeader from '@/components/ui/ScreenHeader'
import Text from '@/components/ui/Text'
import { useProfile } from '@/features/auth/hooks'
import { makeStyles } from '@/theme/provider'

export default function ProfilePage() {
  const styles = useStyles()
  const { data: user } = useProfile()

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U'
  const hasAvatar = Boolean(user?.avatarUrl && user.avatarUrl.trim().length > 0)

  const info = [
    { label: 'NOME COMPLETO', value: user?.name || 'Usuário de Teste' },
    { label: 'CPF', value: user?.cpf || '529.982.247-25' },
    { label: 'E-MAIL', value: user?.email || 'teste@exemplo.com' },
  ]

  return (
    <Container safeTop>
      <ScreenHeader title="Meus dados" showBack />

      <View style={styles.identity}>
        {hasAvatar ? (
          <Image
            source={{ uri: user?.avatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
        )}
        <Text variant="title">{user?.name || 'Usuário de Teste'}</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text variant="caption" style={styles.statusText}>
            Conta ativa
          </Text>
        </View>
      </View>

      <Card contentStyle={styles.card}>
        <Text variant="subtitle" style={styles.cardTitle}>
          Dados pessoais
        </Text>
        {info.map(({ label, value }, index) => (
          <Fragment key={label}>
            {index > 0 && <View style={styles.divider} />}
            <View style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text variant="body" style={styles.value}>
                {value}
              </Text>
            </View>
          </Fragment>
        ))}
      </Card>

      <View style={styles.footer}>
        <Button title="Editar dados" variant="secondary" onPress={() => {}} />
      </View>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  identity: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.xs,
  },
  avatarFallback: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  avatarText: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
    fontSize: 28,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs + 1,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success,
  },
  statusText: {
    color: theme.colors.success,
    fontWeight: '600',
  },
  card: {
    gap: theme.spacing.md - theme.spacing.xs,
  },
  cardTitle: {
    marginBottom: theme.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  row: {
    gap: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: theme.colors.textMuted,
  },
  value: {
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
  },
}))
