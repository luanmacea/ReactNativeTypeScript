import { ComponentProps, useState } from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { Feather, FontAwesome } from '@expo/vector-icons'

import { makeStyles, useTheme } from '@/theme/provider'

import { FeatherIcon, FontAwesomeIcon } from './Icon'
import Text from './Text'

export interface InputProps extends Omit<RNTextInputProps, 'editable'> {
  label?: string
  error?: string
  disabled?: boolean
  password?: boolean
  numeric?: boolean
  iconLeft?: ComponentProps<typeof Feather>['name']
  iconLeftFontAwesome?: ComponentProps<typeof FontAwesome>['name']
}

// Primitivo visual de input, sem vínculo com forms.
// Para campos de formulário (react-hook-form), use components/forms/FormInput.
export default function Input({
  label,
  error,
  disabled = false,
  password = false,
  numeric = false,
  iconLeft,
  iconLeftFontAwesome,
  style,
  ...inputProps
}: InputProps) {
  const theme = useTheme()
  const styles = useStyles()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          error != null && styles.inputWrapperError,
          disabled && styles.inputWrapperDisabled,
        ]}
      >
        {iconLeft && <FeatherIcon icon={iconLeft} style={styles.iconLeft} />}
        {iconLeftFontAwesome && (
          <FontAwesomeIcon icon={iconLeftFontAwesome} style={styles.iconLeft} />
        )}

        <RNTextInput
          style={[
            styles.textInput,
            disabled && styles.textInputDisabled,
            style,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={password && !isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          keyboardType={numeric ? 'numeric' : 'default'}
          inputMode={numeric ? 'numeric' : 'text'}
          {...inputProps}
        />
        {password && !disabled && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <FeatherIcon icon={isPasswordVisible ? 'eye-off' : 'eye'} />
          </TouchableOpacity>
        )}
        {disabled && <FeatherIcon icon="lock" style={styles.iconRight} />}
      </View>
      {error != null && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md - theme.spacing.xs,
    height: 48,
  },
  inputWrapperError: {
    borderColor: theme.colors.error,
  },
  inputWrapperDisabled: {
    backgroundColor: 'transparent',
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.text,
  },
  textInputDisabled: {
    color: theme.colors.textMuted,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs / 2,
  },
}))
