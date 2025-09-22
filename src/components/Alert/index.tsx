import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

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
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[
          styles.overlay,
          {
            backgroundColor:
              theme.mode === 'dark'
                ? 'rgba(80, 80, 80, 0.8)'
                : 'rgba(0, 0, 0, 0.5)',
          },
        ]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors?.background },
          ]}
        >
          <View style={styles.header}>
            <MaterialIcons
              name={icon.name}
              size={30}
              color={icon.color}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color={theme.colors?.grey1} />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 9999,
  },
  container: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
