import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import FormInput from '@/components/forms/FormInput'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { useChangePassword, useVerifyCpf } from '@/features/auth/hooks'
import { makeStyles } from '@/theme/provider'
import { cpfSchema } from '@/utils/validators'

const ResetPasswordSchema = z
  .object({
    cpf: cpfSchema,
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>

export default function ResetPasswordPage() {
  const styles = useStyles()
  const verifyCpf = useVerifyCpf()
  const changePassword = useChangePassword()
  const [verifiedCpf, setVerifiedCpf] = useState<string | null>(null)

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { cpf: '', password: '', confirmPassword: '' },
  })

  const onSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
    if (!verifiedCpf) {
      verifyCpf.mutate(data.cpf, {
        onSuccess: ({ cpf }) => setVerifiedCpf(cpf),
      })
      return
    }

    if (!data.password) {
      methods.setError('password', { message: 'Campo de senha é obrigatório' })
      return
    }

    changePassword.mutate({ cpf: verifiedCpf, newPassword: data.password })
  }

  return (
    <Container style={styles.centered}>
      <View style={styles.header}>
        <Text variant="title">Recuperar senha</Text>
      </View>
      <FormProvider {...methods}>
        {!verifiedCpf ? (
          <FormInput
            name="cpf"
            label="Digite seu CPF"
            placeholder="CPF"
            numeric
          />
        ) : (
          <>
            <FormInput
              name="password"
              label="Nova senha"
              placeholder="Digite a nova senha"
              password
            />
            <FormInput
              name="confirmPassword"
              label="Confirmar senha"
              placeholder="Confirme a nova senha"
              password
            />
          </>
        )}
        <Button
          style={styles.submit}
          title={!verifiedCpf ? 'Enviar' : 'Alterar'}
          onPress={methods.handleSubmit(onSubmit)}
          isLoading={verifyCpf.isPending || changePassword.isPending}
        />
      </FormProvider>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  centered: {
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  submit: {
    marginTop: theme.spacing.md,
  },
}))
