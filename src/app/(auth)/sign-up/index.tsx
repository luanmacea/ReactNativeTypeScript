import { useRouter } from 'expo-router'
import { Button, Text } from 'react-native'
import Container from '~/components/Container'

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = () => {
    router.replace('(auth)/sign-in')
  }

  return (
    <Container>
      <Text>Sign up Page</Text>
      <Button title="Sign up" onPress={handleSignUp} />
    </Container>
  )
}
