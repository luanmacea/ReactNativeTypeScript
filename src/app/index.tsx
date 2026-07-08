import { Redirect } from 'expo-router'

// "/" não é uma tela: manda para a home. Se não houver sessão, o
// Stack.Protected do root layout redireciona para (auth)/sign-in.
export default function Index() {
  return <Redirect href="/home" />
}
