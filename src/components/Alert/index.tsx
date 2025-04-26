import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface AlertProps {
  title: string
  message: string
  open: boolean
  onClose: () => void
}

export default function Alert({ title, message, open, onClose }: AlertProps) {
  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose} // Fecha ao pressionar "voltar" no Android
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
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
  },
  message: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'left',
  },
})
