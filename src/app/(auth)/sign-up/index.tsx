import { useRouter } from 'expo-router'
import Button from '~/components/Button'
import Container from '~/components/Container'
import Text from '~/components/Text'

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
