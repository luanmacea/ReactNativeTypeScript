import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Text from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { selectAuthState } from '@/redux/features/auth/authSelectors'
import { clearAuth } from '@/redux/features/auth/authSlice'
import { changePassword, verifyCpf } from '@/redux/features/auth/authThunk'
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
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuthState)

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  })

  const cpfVerified = auth.isCpfVerified

  useEffect(() => {
    dispatch(clearAuth())

    return () => {
      dispatch(clearAuth())
    }
  }, [dispatch])

  const handleSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    if (!cpfVerified) {
      await dispatch(verifyCpf({ cpf: data.cpf }))
      return
    }

    if (!data.password) {
      methods.setError('password', {
        message: 'Campo de senha é obrigatório',
      })
      return
    }

    dispatch(
      changePassword({
        cpf: auth.verifiedCpf ?? data.cpf,
        newPassword: data.password,
      }),
    )
  }

  return (
    <Container style={{ justifyContent: 'center' }}>
      <View style={styles.logoContainer}>
        <Text variant="title" style={{ marginBottom: 8 }}>
          Recuperar Senha
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
          onPress={methods.handleSubmit(handleSubmit)}
        />
      </FormProvider>
    </Container>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
})
