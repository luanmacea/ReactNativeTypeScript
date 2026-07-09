import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { makeStyles, useTheme } from '@/theme/provider'

interface ContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  // Aplica o inset do topo (status bar / notch). Use em telas SEM header nativo
  // — que agora é o padrão do template. Telas com header nativo deixam `false`.
  safeTop?: boolean
}

export default function Container({
  children,
  style,
  safeTop = false,
}: ContainerProps) {
  const styles = useStyles()
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        safeTop && { paddingTop: insets.top + theme.spacing.xl },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
}))
