import { TouchableOpacity, View } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { makeStyles, useTheme } from '@/theme/provider'

import Modal from './Modal'
import Text from './Text'

export type AlertType = 'success' | 'error' | 'warning'

interface AlertProps {
  title: string
  message: string
  open: boolean
  onClose: () => void
  type?: AlertType
}

export default function Alert({
  title,
  message,
  open,
  onClose,
  type = 'success',
}: AlertProps) {
  const theme = useTheme()
  const styles = useStyles()

  const icons: Record<
    AlertType,
    { name: keyof typeof MaterialIcons.glyphMap; color: string }
  > = {
    success: { name: 'check-circle', color: theme.colors.success },
    error: { name: 'error', color: theme.colors.error },
    warning: { name: 'warning', color: theme.colors.warning },
  }

  const icon = icons[type]

  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
      <View style={styles.header}>
        <MaterialIcons
          name={icon.name}
          size={30}
          color={icon.color}
          style={styles.icon}
        />
        <Text variant="title" style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  title: {
    flex: 1,
  },
  message: {
    marginVertical: theme.spacing.sm,
    fontSize: theme.typography.subtitle.fontSize,
  },
}))
