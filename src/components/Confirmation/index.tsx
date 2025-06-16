import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

import Text from '../Text'

interface ConfirmationProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string | null
  message: string | null
  isLoading?: boolean
}

export default function Confirmation({
  open,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmationProps) {
  const theme = useAppSelector(selectThemeState)

  const styles = createStyles(theme)
  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialIcons
              name="help-outline"
              size={30}
              color="orange"
              style={{ marginRight: 5 }}
            />
            <Text variant="title">{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmText}>Confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      width: 300,
      padding: 20,
      backgroundColor: theme.colors?.grey3,
      borderRadius: 10,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    message: {
      marginVertical: 10,
      fontSize: 16,
      textAlign: 'left',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: theme.colors?.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    confirmButton: {
      backgroundColor: theme.colors?.secondary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cancelText: {
      color: '#333',
      fontWeight: 'bold',
    },
    confirmText: {
      color: '#505050',
      fontWeight: 'bold',
    },
  })
