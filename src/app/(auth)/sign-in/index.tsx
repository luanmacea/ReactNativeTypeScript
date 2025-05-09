import { useRouter } from 'expo-router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { View } from 'react-native'
import { z } from 'zod'
import Button from '~/components/Button'
import Container from '~/components/Container'
import { TextInput } from '~/components/TextInput'

const SignInSchema = z.object({
  email: z.string().min(1, { message: 'Campo de email é obrigatório' }),
  password: z.string().min(1, { message: 'Campo de senha é obrigatório' }),
})

type signInInput = z.infer<typeof SignInSchema>

export default function SignInPage() {
  const router = useRouter()

  const methods = useForm<signInInput>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<signInInput> = (data) => {
    console.log(data)
    router.replace('home')
  }

  return (
    <Container>
      <FormProvider {...methods}>
        <View>
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
          <Button title="submit" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </FormProvider>
    </Container>
  )
}
