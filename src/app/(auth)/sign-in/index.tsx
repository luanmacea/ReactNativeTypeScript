import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { z } from 'zod'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Text from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { selectAuthState } from '@/redux/features/auth/authSelectors'
import { clearAuth } from '@/redux/features/auth/authSlice'
import { signIn } from '@/redux/features/auth/authThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ValidCPF } from '@/utils/validValues'

const SignInSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: 'Campo de CPF é obrigatório' })
    .refine(ValidCPF, { message: 'CPF inválido' }),
  password: z.string().min(1, { message: 'Campo de senha é obrigatório' }),
})

type signInInput = z.infer<typeof SignInSchema>

export default function SignInPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuthState)

  const methods = useForm<signInInput>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<signInInput> = (data) => {
    dispatch(signIn(data))
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
            Login
          </Text>
          <Text variant="subtitle">Entre com seu CPF e sua senha</Text>
        </View>

        <View>
          <TextInput
            name="cpf"
            label="Digite seu CPF"
            placeholder="CPF"
            numeric
          />
          <TextInput
            name="password"
            label="Digite sua senha"
            placeholder="Senha"
            password
          />
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => router.push('reset-password')}
        >
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <Button title="Login" onPress={methods.handleSubmit(onSubmit)} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Possui uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('sign-up')}>
            <Text style={styles.footerLink}>Cadastre Se</Text>
          </TouchableOpacity>
        </View>
      </FormProvider>
      <Alert
        title="Erro login"
        message={'CPF ou senha incorretos'}
        open={!!auth.error}
        onClose={() => dispatch(clearAuth())}
        type="error"
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: '100%',
    height: 128,
    // backgroundColor: 'black',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotText: {
    fontSize: 12,
    color: '#B8860B', // Dourado discreto
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  footerLink: {
    fontSize: 14,
    color: '#DAA520',
    fontWeight: 'bold',
  },
})
