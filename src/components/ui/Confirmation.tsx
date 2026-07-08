import { TouchableOpacity, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { makeStyles, useTheme } from '@/theme/provider'

import Button from './Button'
import Modal from './Modal'
import Text from './Text'

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
  const theme = useTheme()
  const styles = useStyles()

  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <MaterialIcons
            name="help-outline"
            size={30}
            color={theme.colors.warning}
            style={styles.icon}
          />
          <Text variant="title">{title}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={24} color={theme.colors.text} />
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

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  message: {
    marginVertical: theme.spacing.sm,
    fontSize: theme.typography.subtitle.fontSize,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
}))
