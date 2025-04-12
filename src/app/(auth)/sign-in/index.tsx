import { useRouter } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'
import Button from '~/components/Button'
import Container from '~/components/Container'
import { TextInput } from '~/components/TextInput'

export default function SignInPage() {
  const router = useRouter()

  const methods = useForm()

  const onSubmit = (data: any) => {
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
          <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </FormProvider>
    </Container>
  )
}
