import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import FormInput from '@/components/forms/FormInput'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Text from '@/components/ui/Text'
import { useSignUp } from '@/features/auth/hooks'
import { makeStyles } from '@/theme/provider'
import {
  cpfSchema,
  emailSchema,
  requiredPasswordSchema,
} from '@/utils/validators'

const SignUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Campo de nome é obrigatório' }),
    cpf: cpfSchema,
    email: emailSchema,
    password: requiredPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Campo de confirmação de senha é obrigatório' }),
    avatarUrl: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^https?:\/\//.test(value), {
        message: 'Informe uma URL válida',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type SignUpInput = z.infer<typeof SignUpSchema>

export default function SignUpPage() {
  const styles = useStyles()
  const signUp = useSignUp()

  const methods = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatarUrl: '',
    },
  })

  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    signUp.mutate({
      name: data.name.trim(),
      cpf: data.cpf.trim(),
      email: data.email.trim(),
      password: data.password,
      avatarUrl:
        data.avatarUrl && data.avatarUrl.length > 0
          ? data.avatarUrl
          : undefined,
    })
  }

  return (
    <Container style={styles.centered}>
      <FormProvider {...methods}>
        <View style={styles.header}>
          <Text variant="title" style={styles.title}>
            Crie sua conta
          </Text>
          <Text variant="subtitle">Digite suas informações</Text>
        </View>

        <View style={styles.form}>
          <FormInput name="name" label="Digite seu nome" placeholder="Nome" />
          <FormInput
            name="cpf"
            label="Digite seu CPF"
            placeholder="CPF"
            numeric
          />
          <FormInput
            name="email"
            label="Digite seu e-mail"
            placeholder="E-mail"
          />
          <FormInput
            name="avatarUrl"
            label="URL da imagem (opcional)"
            placeholder="https://"
          />
          <FormInput
            name="password"
            label="Digite sua senha"
            placeholder="Senha"
            password
          />
          <FormInput
            name="confirmPassword"
            label="Confirme sua senha"
            placeholder="Confirmar senha"
            password
          />
          <Button
            title="Cadastrar"
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={signUp.isPending}
          />
        </View>
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
  title: {
    marginBottom: theme.spacing.sm,
  },
  form: {
    gap: theme.spacing.sm,
  },
}))
