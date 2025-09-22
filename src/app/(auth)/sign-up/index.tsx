import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Text from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { signUp } from '@/redux/features/auth/authThunk'
import { useAppDispatch } from '@/redux/hook'
import { ValidCPF } from '@/utils/validValues'

const SignUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Campo de nome e obrigatorio' }),
    cpf: z
      .string()
      .trim()
      .min(1, { message: 'Campo de CPF e obrigatorio' })
      .refine(ValidCPF, { message: 'CPF invalido' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Campo de email e obrigatorio' })
      .email('Informe um email valido'),
    password: z.string().min(1, { message: 'Campo de senha e obrigatorio' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Campo de confirmacao de senha e obrigatorio' }),
    avatarUrl: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || value.length === 0 || /^https?:\/\//.test(value),
        { message: 'Informe uma URL valida' },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type SignUpInput = z.infer<typeof SignUpSchema>

type SignUpPayload = Omit<SignUpInput, 'confirmPassword'>

export default function SignUpPage() {
  const dispatch = useAppDispatch()

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

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    const avatar =
      data.avatarUrl && data.avatarUrl.length > 0
        ? data.avatarUrl
        : `https://i.pravatar.cc/100?u=${encodeURIComponent(data.email)}`

    const payload: SignUpPayload = {
      name: data.name.trim(),
      cpf: data.cpf.trim(),
      email: data.email.trim(),
      password: data.password,
      avatarUrl: avatar,
    }

    dispatch(signUp(payload))
  }

  return (
    <Container style={{ justifyContent: 'center' }}>
      <FormProvider {...methods}>
        <View style={styles.logoContainer}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Crie sua conta
          </Text>
          <Text variant="subtitle">Digite suas informacoes</Text>
        </View>

        <View style={styles.form}>
          <TextInput name="name" label="Digite seu nome" placeholder="Nome" />
          <TextInput
            name="cpf"
            label="Digite seu CPF"
            placeholder="CPF"
            numeric
          />
          <TextInput
            name="email"
            label="Digite seu email"
            placeholder="Email"
          />
          <TextInput
            name="avatarUrl"
            label="URL da imagem (opcional)"
            placeholder="https://"
          />
          <TextInput
            name="password"
            label="Digite sua senha"
            placeholder="Senha"
            password
          />
          <TextInput
            name="confirmPassword"
            label="Confirme sua senha"
            placeholder="Confirmar senha"
            password
          />
          <Button title="Cadastrar" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </FormProvider>
    </Container>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 8,
  },
})
