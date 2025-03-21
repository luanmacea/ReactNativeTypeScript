
import { useRouter } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from '~/components/TextInput';
import { Button } from '~/components/Button'

export default function SignInPage() {
  const router = useRouter();

  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <View>
        <TextInput
          name="email"
          textLabel="Email"
          placeholder="Digite seu email"
          iconLeft="email"
        />
        <TextInput
          name="password"
          textLabel="Password"
          placeholder="Digite sua senha"
          password
        />
        <Button title="Submit" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
}
