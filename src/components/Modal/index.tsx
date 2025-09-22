import { ReactNode } from 'react'
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'

import { selectThemeState } from '@/redux/features/theme/themeSelectors'
import { useAppSelector } from '@/redux/hook'

type AppModalProps = {
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
  ...modalProps
}: AppModalProps) {
  const theme = useAppSelector(selectThemeState)

  const overlayBackgroundColor =
    theme.mode === 'dark' ? 'rgba(80, 80, 80, 0.8)' : 'rgba(0, 0, 0, 0.5)'

  return (
    <RNModal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={[
            StyleSheet.absoluteFillObject,
            styles.backdrop,
            { backgroundColor: overlayBackgroundColor },
          ]}
        />
        <View
          style={[
            styles.content,
            { backgroundColor: theme.colors?.background },
          ]}
        >
          {showCloseIcon ? (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AntDesign name="close" size={24} color={theme.colors?.grey1} />
            </TouchableOpacity>
          ) : null}
          {children}
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backdrop: {
    zIndex: 1,
  },
  content: {
    borderRadius: 12,
    padding: 24,
    width: '100%',
    elevation: 5,
    zIndex: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 3,
  },
})
