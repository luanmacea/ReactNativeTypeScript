import { Pressable, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'

export default function ItemDetailPage() {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const gradient = theme.colors.gradients?.primary ?? [
    theme.colors.primary,
    theme.colors.primary,
  ]

  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Capa — troque por uma <Image> real. */}
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cover}
        >
          <View style={[styles.coverBar, { paddingTop: insets.top + 8 }]}>
            <Pressable
              style={styles.coverBtn}
              onPress={() => router.back()}
              hitSlop={8}
            >
              <Feather
                name="chevron-left"
                size={22}
                color={theme.colors.onImage}
              />
            </Pressable>
            <Pressable style={styles.coverBtn} hitSlop={8}>
              <Feather name="heart" size={18} color={theme.colors.onImage} />
            </Pressable>
          </View>
          <Text style={styles.coverHint}>imagem de capa</Text>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.chips}>
            <View style={[styles.chip, styles.chipAccent]}>
              <Text style={styles.chipAccentText}>Categoria</Text>
            </View>
            <View style={[styles.chip, styles.chipMuted]}>
              <Text variant="caption">Tag</Text>
            </View>
          </View>

          <Text variant="title">Título aqui</Text>
          <Text variant="body" style={styles.paragraph}>
            Isso seria o conteúdo do detalhe. Um parágrafo de exemplo que mostra
            como o texto longo aparece dentro desta tela, com boa leitura.
          </Text>

          <View style={styles.statsRow}>
            <Card style={styles.stat}>
              <Text variant="caption">Rótulo</Text>
              <Text variant="subtitle" style={styles.statValue}>
                Valor
              </Text>
            </Card>
            <Card style={styles.stat}>
              <Text variant="caption">Rótulo</Text>
              <Text variant="subtitle" style={styles.statValue}>
                Valor
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Ação principal" onPress={() => router.back()} />
      </View>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  scroll: {
    paddingBottom: theme.spacing.md,
  },
  cover: {
    height: 210,
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
  },
  coverBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coverBtn: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.imageScrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverHint: {
    color: theme.colors.onImage,
    opacity: 0.6,
    fontSize: 11,
  },
  body: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm + theme.spacing.xs,
    marginTop: -theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.lg + 6,
    borderTopRightRadius: theme.radius.lg + 6,
  },
  chips: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: theme.radius.full,
  },
  chipAccent: {
    backgroundColor: theme.colors.primary + '26',
  },
  chipAccentText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  chipMuted: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  paragraph: {
    color: theme.colors.textMuted,
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm + theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    marginTop: 2,
  },
  footer: {
    padding: theme.spacing.md,
  },
}))
