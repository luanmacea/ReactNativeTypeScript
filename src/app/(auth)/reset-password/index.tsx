import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

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
import { changePassword } from '@/redux/features/auth/authThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ValidCPF } from '@/utils/validValues'

const ResetPasswordSchema = z
  .object({
    cpf: z
      .string()
      .min(1, { message: 'Campo de cpf é obrigatório' })
      .refine(ValidCPF, { message: 'CPF inválido' }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  })

type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuthState)

  const [cpfVerified, setCpfVerified] = useState(false)

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const handleCpfSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
    // if (!cpfVerified) {
    //   dispatch(checkCpfExists({ cpf: data.cpf }))
    //   return
    // }
    if (!data.password) {
      methods.setError('password', {
        message: 'Campo de senha é obrigatório',
      })
      return
    }
    console.log(data)
    dispatch(changePassword({ cpf: data.cpf, newPassword: data.password }))
  }

  useEffect(() => {
    // if (!auth.cpfExists) return
    setCpfVerified(true)
    dispatch(clearAuth())
  }, [])

  useEffect(() => {
    if (auth.isAuthenticated) router.replace('loading')
  }, [auth.isAuthenticated])

  return (
    <Container style={{ justifyContent: 'center' }}>
      <View style={styles.logoContainer}>
        <Text variant="title" style={{ marginBottom: 8 }}>
          Recuperar Senha
        </Text>
        <Text variant="subtitle">
          {!cpfVerified ? 'Entre com seu CPF' : 'Digite sua nova senha'}
        </Text>
      </View>
      <FormProvider {...methods}>
        {!cpfVerified ? (
          <TextInput
            name="cpf"
            label="Digite seu CPF"
            placeholder="CPF"
            numeric
          />
        ) : (
          <>
            <TextInput
              name="password"
              label="Nova senha"
              placeholder="Digite a nova senha"
              password
            />
            <TextInput
              name="confirmPassword"
              label="Confirmar senha"
              placeholder="Confirme a nova senha"
              password
            />
          </>
        )}
        <Button
          style={{ marginTop: 16 }}
          title={!cpfVerified ? 'Enviar' : 'Alterar'}
          onPress={methods.handleSubmit(handleCpfSubmit)}
        />
      </FormProvider>
      <Alert
        title="Erro recuperar senha"
        message={'CPF não encontrado'}
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
})
