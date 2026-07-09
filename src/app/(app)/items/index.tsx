import { ComponentProps } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Input from '@/components/ui/Input'
import ScreenHeader from '@/components/ui/ScreenHeader'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'

type FeatherName = ComponentProps<typeof Feather>['name']

interface Item {
  title: string
  desc: string
  icon: FeatherName | null
  tint: 'primary' | 'success' | 'warning'
}

// Lista de exemplo — troque pelos seus dados reais.
const ITEMS: Item[] = [
  {
    title: 'Título do item',
    desc: 'Isso seria uma descrição',
    icon: null,
    tint: 'primary',
  },
  {
    title: 'Outro título aqui',
    desc: 'Isso seria uma descrição',
    icon: 'minus-square',
    tint: 'primary',
  },
  {
    title: 'Item concluído',
    desc: 'Isso seria uma descrição',
    icon: 'check-circle',
    tint: 'success',
  },
  {
    title: 'Item em destaque',
    desc: 'Isso seria uma descrição',
    icon: 'star',
    tint: 'warning',
  },
]

export default function ItemsPage() {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()

  const tintColor = (tint: Item['tint']) =>
    tint === 'success'
      ? theme.colors.success
      : tint === 'warning'
        ? theme.colors.warning
        : theme.colors.primary

  return (
    <Container safeTop>
      <ScreenHeader title="Itens" />
      <Input iconLeft="search" placeholder="Buscar item" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {ITEMS.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => router.push('/item-detail')}
          >
            <Card contentStyle={styles.itemContent}>
              <View
                style={[
                  styles.thumb,
                  item.icon
                    ? { backgroundColor: theme.colors.surfaceAlt }
                    : { backgroundColor: theme.colors.primary },
                ]}
              >
                {item.icon && (
                  <Feather
                    name={item.icon}
                    size={20}
                    color={tintColor(item.tint)}
                  />
                )}
              </View>
              <View style={styles.itemText}>
                <Text variant="subtitle">{item.title}</Text>
                <Text variant="caption">{item.desc}</Text>
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={theme.colors.textMuted}
              />
            </Card>
          </Pressable>
        ))}
      </ScrollView>

      <Button
        title="Novo item"
        onPress={() => router.push('/item-form')}
        style={styles.newButton}
      />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  list: {
    gap: theme.spacing.sm + theme.spacing.xs,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + theme.spacing.xs,
    padding: theme.spacing.md - 3,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  newButton: {
    marginTop: theme.spacing.sm,
  },
}))
