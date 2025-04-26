import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { useFormContext, useController } from 'react-hook-form'
import { useAppSelector } from '~/redux/hook'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'

interface FormTextInputProps {
  name: string
  label?: string
  iconLeft?: string
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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <PaperTextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={password && !isPasswordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        textColor={theme.darkColors?.white}
        placeholderTextColor={theme.darkColors?.white}
        outlineColor="#B6B6B6FF"
        error={!!error}
        left={iconLeft ? <PaperTextInput.Icon icon={iconLeft} /> : undefined}
        right={
          password ? (
            <PaperTextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          ) : undefined
        }
        theme={{
          colors: {
            primary: theme.darkColors?.primary || '#FF9F1C',
            error: theme.darkColors?.error || '#F44336',
          },
        }}
        style={{
          backgroundColor: theme.darkColors?.background,
          color: theme.darkColors?.white,
        }}
      />
      {error && (
        <View style={{ marginTop: 4 }}>
          <Text
            style={{ color: theme.darkColors?.error || 'red', fontSize: 12 }}
          >
            {error.message}
          </Text>
        </View>
      )}
    </View>
  )
}
