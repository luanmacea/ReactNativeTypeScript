import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { makeStyles } from '@/theme/provider'

interface ContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export default function Container({ children, style }: ContainerProps) {
  const styles = useStyles()
  return <View style={[styles.container, style]}>{children}</View>
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
}))
