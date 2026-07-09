import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { z } from 'zod'

import FormInput from '@/components/forms/FormInput'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Logo from '@/components/ui/Logo'
import Text from '@/components/ui/Text'
import { useSignIn } from '@/features/auth/hooks'
import { MOCK_CREDENTIALS } from '@/features/auth/mock'
import { env } from '@/lib/env'
import { makeStyles } from '@/theme/provider'
import { cpfSchema, requiredPasswordSchema } from '@/utils/validators'

// No modo de teste o login é "admin" (não é um CPF) — validação relaxada.
const SignInSchema = z.object({
  cpf: env.isMockApi
    ? z.string().min(1, { message: 'Campo de login é obrigatório' })
    : cpfSchema,
  password: requiredPasswordSchema,
})

type SignInInput = z.infer<typeof SignInSchema>

export default function SignInPage() {
  const router = useRouter()
  const styles = useStyles()
  const signIn = useSignIn()

  const methods = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { cpf: '', password: '' },
  })

  const onSubmit: SubmitHandler<SignInInput> = (data) => {
    signIn.mutate(data)
  }

  return (
    <Container style={styles.centered}>
      <FormProvider {...methods}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} resizeMode="contain" />
        </View>

        <View>
          <FormInput
            name="cpf"
            label={env.isMockApi ? 'Digite seu login' : 'Digite seu CPF'}
            placeholder={env.isMockApi ? 'Login' : 'CPF'}
            numeric={!env.isMockApi}
          />
          <FormInput
            name="password"
            label="Digite sua senha"
            placeholder="Senha"
            password
          />
        </View>

        {env.isMockApi && (
          <Text variant="caption" style={styles.mockHint}>
            Modo de teste: login "{MOCK_CREDENTIALS.login}" · senha "
            {MOCK_CREDENTIALS.password}"
          </Text>
        )}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => router.push('/reset-password')}
        >
          <Text variant="caption" style={styles.link}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={methods.handleSubmit(onSubmit)}
          isLoading={signIn.isPending}
        />

        <View style={styles.footer}>
          <Text>Não possui uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text style={[styles.link, styles.bold]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </FormProvider>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  centered: {
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing.md,
    height: 150,
  },
  logo: {
    width: '100%',
    height: '50%',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.md - theme.spacing.xs,
  },
  mockHint: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.warning,
  },
  link: {
    color: theme.colors.primary,
  },
  bold: {
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
}))
