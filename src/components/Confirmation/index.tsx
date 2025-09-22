import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import Modal from '@/components/Modal'
import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

import Button from '../Button'
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
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: '80%',
          }}
        >
          <MaterialIcons
            name="help-outline"
            size={30}
            color={theme.colors?.warning || 'orange'}
            style={styles.icon}
          />
          <Text variant="title">{title}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color={theme.colors?.grey1} />
        </TouchableOpacity>
      </View>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonRow}>
        <Button title="Cancelar" variant="secondary" onPress={onClose} small />
        <Button
          title="Confirmar"
          onPress={onConfirm}
          small
          isLoading={isLoading}
        />
      </View>
    </Modal>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: 'transparent',
    },
    container: {
      width: 300,
      padding: 24,
      backgroundColor: theme.colors?.grey3,
      borderRadius: 10,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    icon: {
      marginRight: 8,
    },
    message: {
      marginVertical: 10,
      fontSize: 16,
      textAlign: 'left',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 16,
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
      color: theme.colors?.white || '#fff',
      fontWeight: 'bold',
    },
  })
