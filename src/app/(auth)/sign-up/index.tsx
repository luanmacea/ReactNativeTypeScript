import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { z } from 'zod'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Text from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { selectAuthState } from '@/redux/features/auth/authSelectors'
import { signUp } from '@/redux/features/auth/authThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ValidCPF } from '@/utils/validValues'

const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Campo de nome é obrigatório' }),
    cpf: z
      .string()
      .min(1, { message: 'Campo de CPF é obrigatório' })
      .refine(ValidCPF, { message: 'CPF inválido' }),
    email: z.string().min(1, { message: 'Campo de email é obrigatório' }),
    password: z.string().min(1, { message: 'Campo de senha é obrigatório' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Campo de senha é obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type signUpInput = z.infer<typeof SignUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuthState)

  const methods = useForm<signUpInput>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit: SubmitHandler<signUpInput> = async (data) => {
    dispatch(signUp(data))
  }

  useEffect(() => {
    if (!auth.isAuthenticated) return
    router.replace('loading')
  }, [auth.isAuthenticated])

  return (
    <Container style={{ justifyContent: 'center' }}>
      <FormProvider {...methods}>
        <View style={styles.logoContainer}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Cadastrar
          </Text>
          <Text variant="subtitle">Digete suas informações</Text>
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
