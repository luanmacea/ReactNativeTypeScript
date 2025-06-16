import { Slot } from 'expo-router'
import { Providers } from '@/redux/provider'

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
    </Providers>
  )
}
