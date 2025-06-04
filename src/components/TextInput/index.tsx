import React, { useState, ComponentProps } from 'react'
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useFormContext, useController } from 'react-hook-form'
import { useAppSelector } from '~/redux/hook'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { Feather } from '@expo/vector-icons'

interface FormTextInputProps {
  name: string
  label?: string
  iconLeft?: ComponentProps<typeof Feather>['name']
  password?: boolean
  placeholder?: string
}

export const TextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  iconLeft,
  password = false,
  placeholder,
}) => {
  const theme = useAppSelector(selectThemeState)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { control } = useFormContext()

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  const styles = createStyles(theme)
  console.log('error', error)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          error && { borderColor: theme.colors?.error },
        ]}
      >
        {iconLeft && (
          <Feather
            name={iconLeft}
            size={20}
            color={theme.colors?.grey2}
            style={{ marginRight: 8 }}
          />
        )}
        <RNTextInput
          style={[styles.textInput, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors?.grey2}
          secureTextEntry={password && !isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors?.grey2}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
      width: '100%',
    },
    label: {
      fontSize: 14,
      color: theme.colors?.grey2,
      marginBottom: 6,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors?.grey3,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors?.greyOutline,
      paddingHorizontal: 12,
      height: 48,
    },
    textInput: {
      fontSize: 16,
      color: theme.colors?.grey1,
      fontFamily: 'Roboto',
    },
    errorText: {
      color: theme.colors?.error,
      fontSize: 12,
      marginTop: 4,
    },
  })
