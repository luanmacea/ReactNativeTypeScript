import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import Card from '@/components/Card'
import Container from '@/components/Container'
import Text from '@/components/Text'
import { selectUser } from '@/redux/features/auth/authSelectors'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

interface InfoItem {
  label: string
  value: string
}

export default function ProfilePage() {
  const user = useAppSelector(selectUser)
  const theme = useAppSelector(selectThemeState)

  const avatarLetter = useMemo(() => {
    if (!user?.name) {
      return '?'
    }
    return user.name.charAt(0).toUpperCase()
  }, [user?.name])

  const hasAvatar = Boolean(user?.avatarUrl && user.avatarUrl.trim().length > 0)

  const info: InfoItem[] = useMemo(
    () => [
      { label: 'Nome completo', value: user?.name || 'Nao informado' },
      { label: 'CPF', value: user?.cpf || 'Nao informado' },
      { label: 'E-mail', value: user?.email || 'Nao informado' },
    ],
    [user?.cpf, user?.email, user?.name],
  )

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
          <View
            style={[
              styles.avatarFallback,
              { backgroundColor: theme.colors?.primary || '#F7CA02' },
            ]}
          >
            <Text variant="title" style={styles.avatarText}>
              {avatarLetter}
            </Text>
          </View>
        )}
        <View>
          <Text variant="title">{user?.name || 'Usuario'}</Text>
          <Text variant="caption">Conta ativa</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Text variant="subtitle" style={styles.sectionTitle}>
          Dados pessoais
        </Text>
        {info.map(({ label, value }) => (
          <View key={label} style={styles.row}>
            <Text variant="caption" style={styles.label}>
              {label}
            </Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </Card>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
  },
  card: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  row: {
    gap: 4,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
})
