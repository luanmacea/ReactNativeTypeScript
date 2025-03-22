import { useRouter } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'
import Button from '~/components/Button'
import { TextInput } from '~/components/TextInput'

export default function SignInPage() {
  const router = useRouter()

  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <View>
        <TextInput
          name="email"
          label="Email"
          placeholder="Digite seu email"
          // iconLeft="email"
        />
        <TextInput
          name="password"
          label="Password"
          placeholder="Digite sua senha"
          // password
        />
        <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  )
}
