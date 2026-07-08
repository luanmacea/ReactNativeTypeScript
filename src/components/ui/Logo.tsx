import { Image, type ImageProps } from 'react-native'

import logoClaro from '@/assets/logos/logoClaro.png'
import logoEscuro from '@/assets/logos/logoEscuro.png'
import { useThemeMode } from '@/theme/provider'

type LogoProps = Omit<ImageProps, 'source'>

export default function Logo(props: LogoProps) {
  const { mode } = useThemeMode()
  return <Image {...props} source={mode === 'dark' ? logoClaro : logoEscuro} />
}
