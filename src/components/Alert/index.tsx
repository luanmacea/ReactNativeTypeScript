import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import Modal from '@/components/Modal'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

import Text from '../Text'

type AlertType = 'success' | 'error' | 'warning'

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
  const theme = useAppSelector(selectThemeState)

  const ICONS: Record<
    AlertType,
    { name: keyof typeof MaterialIcons.glyphMap; color: string }
  > = {
    success: { name: 'check-circle', color: theme?.colors?.success || 'green' },
    error: { name: 'error', color: theme?.colors?.error || 'red' },
    warning: { name: 'warning', color: theme?.colors?.warning || 'yellow' },
  }

  const icon = ICONS[type]

  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
      <View style={styles.header}>
        <MaterialIcons
          name={icon.name}
          size={30}
          color={icon.color}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color={theme.colors?.grey1} />
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  message: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'left',
  },
})
