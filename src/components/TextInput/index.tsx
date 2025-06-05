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
import { Feather, FontAwesome } from '@expo/vector-icons'
import FeatherIcon from '../FeatherIcon'
import FontAwesomeIcon from '../FontAwesomeIcon'

interface FormTextInputProps {
  name: string
  label?: string
  iconLeft?: ComponentProps<typeof Feather>['name']
  iconLeftFontAwesome?: ComponentProps<typeof FontAwesome>['name']
  password?: boolean
  placeholder?: string
  disabled?: boolean
  numeric?: boolean
}

export const TextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  iconLeft,
  iconLeftFontAwesome,
  password = false,
  placeholder,
  disabled = false,
  numeric = false,
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
  const showLeftIcon = iconLeft || iconLeftFontAwesome
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          error && { borderColor: theme.colors?.error },
          disabled && { backgroundColor: 'transparent' },
        ]}
      >
        {showLeftIcon && (
          <>
            {iconLeft && (
              <FeatherIcon icon={iconLeft} style={{ marginRight: 8 }} />
            )}
            {iconLeftFontAwesome && (
              <FontAwesomeIcon
                icon={iconLeftFontAwesome}
                style={{ marginRight: 8 }}
              />
            )}
          </>
        )}

        <RNTextInput
          style={[
            styles.textInput,
            { flex: 1 },
            disabled && { color: theme.colors?.grey2 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors?.grey2}
          secureTextEntry={password && !isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={!disabled}
          keyboardType={numeric ? 'numeric' : 'default'}
          inputMode={numeric ? 'numeric' : 'text'}
        />
        {password && !disabled && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <FeatherIcon icon={isPasswordVisible ? 'eye-off' : 'eye'} />
          </TouchableOpacity>
        )}
        {disabled && <FeatherIcon icon="lock" style={{ marginLeft: 8 }} />}
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
      borderRadius: 6,
      borderWidth: 1,
      backgroundColor: theme.colors?.grey3,
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
