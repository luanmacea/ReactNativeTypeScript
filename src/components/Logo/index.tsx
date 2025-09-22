import { Image, type ImageProps } from 'react-native'

import logoClaro from '@/assets/logos/logoClaro.png'
import logoEscuro from '@/assets/logos/logoEscuro.png'
import { selectThemeMode } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

type LogoProps = Omit<ImageProps, 'source'>

export default function Logo(props: LogoProps) {
  const mode = useAppSelector(selectThemeMode)
  return <Image {...props} source={mode === 'dark' ? logoClaro : logoEscuro} />
}
