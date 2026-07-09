import { ScrollView, View } from 'react-native'

import { Feather } from '@expo/vector-icons'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import ScreenHeader from '@/components/ui/ScreenHeader'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'

interface Post {
  author: string
  initial: string
  time: string
  text: string
  hasImage: boolean
  likes?: number
  comments?: number
}

// Feed de exemplo — troque pelos seus dados reais.
const POSTS: Post[] = [
  {
    author: 'Autor de exemplo',
    initial: 'A',
    time: 'há 5 minutos',
    text: 'Isso seria uma postagem de exemplo. O template já vem com este card pronto pra você duplicar e preencher.',
    hasImage: true,
    likes: 128,
    comments: 24,
  },
  {
    author: 'Maria Exemplo',
    initial: 'M',
    time: 'há 1 hora',
    text: 'Outra postagem de exemplo, agora sem imagem — pra mostrar o card em formato compacto.',
    hasImage: false,
  },
]

export default function FeedPage() {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Container safeTop>
      <ScreenHeader
        title="Feed"
        showBack
        right={
          <View style={styles.searchBtn}>
            <Feather name="search" size={18} color={theme.colors.text} />
          </View>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {POSTS.map((post) => (
          <Card key={post.author} contentStyle={styles.postContent}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{post.initial}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text variant="body" style={styles.author}>
                  {post.author}
                </Text>
                <Text variant="caption">{post.time}</Text>
              </View>
              <Feather
                name="more-horizontal"
                size={18}
                color={theme.colors.textMuted}
              />
            </View>

            <Text variant="body" style={styles.postText}>
              {post.text}
            </Text>

            {post.hasImage && (
              <View style={styles.postImage}>
                <Text style={styles.imageHint}>imagem do post</Text>
              </View>
            )}

            {post.hasImage && (
              <View style={styles.actions}>
                <View style={styles.action}>
                  <Feather name="heart" size={16} color={theme.colors.error} />
                  <Text variant="caption">{post.likes}</Text>
                </View>
                <View style={styles.action}>
                  <Feather
                    name="message-circle"
                    size={16}
                    color={theme.colors.textMuted}
                  />
                  <Text variant="caption">{post.comments}</Text>
                </View>
              </View>
            )}
          </Card>
        ))}
      </ScrollView>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  postContent: {
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  postMeta: {
    flex: 1,
    gap: 1,
  },
  author: {
    fontWeight: '600',
  },
  postText: {
    color: theme.colors.text,
    lineHeight: 20,
  },
  postImage: {
    height: 150,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHint: {
    color: theme.colors.textMuted,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs + 2,
  },
}))
