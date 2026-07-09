import { ReactNode } from 'react'
import { Pressable, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import { makeStyles, useTheme } from '@/theme/provider'

import Text from './Text'

interface ScreenHeaderProps {
  title: string
  // Mostra a seta de voltar à esquerda (navega para trás).
  showBack?: boolean
  // Slot opcional à direita (ex.: botão de busca).
  right?: ReactNode
}

// Cabeçalho DENTRO da tela — o header nativo do expo-router fica desligado
// (headerShown: false em (app)/_layout.tsx). Coloque como primeiro filho de
// um <Container safeTop>. O inset do topo é do Container.
export default function ScreenHeader({
  title,
  showBack = false,
  right,
}: ScreenHeaderProps) {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()

  return (
    <View style={styles.header}>
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Feather name="chevron-left" size={24} color={theme.colors.text} />
        </Pressable>
      )}
      <Text variant="title" style={styles.title}>
        {title}
      </Text>
      <View style={styles.right}>{right}</View>
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  back: {
    marginLeft: -theme.spacing.xs,
  },
  title: {
    flex: 1,
  },
  right: {
    marginLeft: 'auto',
  },
}))
