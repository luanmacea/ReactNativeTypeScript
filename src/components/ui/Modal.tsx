import { ReactNode } from 'react'
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'

import { makeStyles, useTheme } from '@/theme/provider'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  showCloseIcon?: boolean
}

export default function Modal({
  open,
  children,
  onClose,
  showCloseIcon = true,
}: ModalProps) {
  const theme = useTheme()
  const styles = useStyles()

  return (
    <RNModal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={[StyleSheet.absoluteFill, styles.backdrop]}
        />
        <View style={styles.content}>
          {showCloseIcon ? (
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <AntDesign name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ) : null}
          {children}
        </View>
      </View>
    </RNModal>
  )
}

const useStyles = makeStyles((theme) => ({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  backdrop: {
    backgroundColor: theme.colors.overlay,
    zIndex: 1,
  },
  content: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    width: '100%',
    backgroundColor: theme.colors.background,
    zIndex: 2,
    ...theme.elevation.modal,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md - theme.spacing.xs,
    right: theme.spacing.md - theme.spacing.xs,
    zIndex: 3,
  },
}))
