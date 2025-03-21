
import { useRouter } from 'expo-router';
import { View, Button, Text } from 'react-native';

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.replace('(auth)/sign-in');
  };

  return (
    <View>
      <Text>Sign up Page</Text>
      <Button title="Sign up" onPress={handleSignUp} />
    </View>
  );
}
