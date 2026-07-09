import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Input from '@/components/ui/Input'
import ScreenHeader from '@/components/ui/ScreenHeader'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'

// Tela de formulário de exemplo (visual). Para validação real, use
// react-hook-form + components/forms/FormInput como no sign-in.
export default function ItemFormPage() {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const [notify, setNotify] = useState(true)

  return (
    <Container safeTop>
      <ScreenHeader title="Novo cadastro" showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Input label="Nome completo" placeholder="Usuário de Teste" />
        <Input
          label="E-mail"
          placeholder="exemplo@email.com"
          keyboardType="email-address"
        />

        <View style={styles.field}>
          <Text variant="caption" style={styles.label}>
            Categoria
          </Text>
          <Pressable style={styles.select}>
            <Text variant="body">Selecione uma opção</Text>
            <Feather
              name="chevron-down"
              size={18}
              color={theme.colors.textMuted}
            />
          </Pressable>
        </View>

        <Pressable
          style={styles.toggleRow}
          onPress={() => setNotify((v) => !v)}
        >
          <View style={styles.toggleText}>
            <Text variant="subtitle">Receber notificações</Text>
            <Text variant="caption">Isso seria uma opção</Text>
          </View>
          <View style={[styles.switch, notify && styles.switchOn]}>
            <View style={[styles.thumb, notify && styles.thumbOn]} />
          </View>
        </Pressable>
      </ScrollView>

      <View style={styles.actions}>
        <Button
          title="Cancelar"
          variant="secondary"
          onPress={() => router.back()}
          style={styles.cancel}
        />
        <Button
          title="Salvar"
          onPress={() => router.back()}
          style={styles.save}
        />
      </View>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  scroll: {
    paddingTop: theme.spacing.xs,
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  field: {
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: theme.spacing.md - theme.spacing.xs,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md - theme.spacing.xs,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  toggleText: {
    gap: 2,
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
    alignItems: 'flex-end',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceAlt,
  },
  thumbOn: {
    backgroundColor: theme.colors.onPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm + theme.spacing.xs,
    paddingTop: theme.spacing.sm,
  },
  cancel: {
    flex: 1,
  },
  save: {
    flex: 1.4,
  },
}))
