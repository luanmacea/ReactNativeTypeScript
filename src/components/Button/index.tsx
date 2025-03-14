import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
}

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD191FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
