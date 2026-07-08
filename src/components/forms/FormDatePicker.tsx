import { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { TouchableWithoutFeedback, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

import { FeatherIcon } from '@/components/ui/Icon'
import Text from '@/components/ui/Text'
import { makeStyles, useTheme } from '@/theme/provider'
import { formatDateToBR } from '@/utils/format'

interface FormDatePickerProps {
  name: string
  label?: string
  minimumDate?: Date
  maximumDate?: Date
  disabled?: boolean
}

// Casca de react-hook-form para seleção de data.
// Requer um <FormProvider> ancestral (useForm + FormProvider na tela).
export default function FormDatePicker({
  name,
  label,
  minimumDate,
  maximumDate,
  disabled = false,
}: FormDatePickerProps) {
  const theme = useTheme()
  const styles = useStyles()
  const [show, setShow] = useState(false)

  const { control } = useFormContext()
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: '' })

  const selectedDate = value ? new Date(value) : null

  const handleDateChange = (_event: unknown, date?: Date) => {
    setShow(false)
    onChange(date ? date.toISOString() : null)
  }

  const displayDate = selectedDate
    ? formatDateToBR(selectedDate)
    : 'Selecione uma data'

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="caption" style={styles.label}>
          {label}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={() => !disabled && setShow(true)}>
        <View
          style={[
            styles.inputDate,
            error != null && styles.inputError,
            disabled && styles.inputDisabled,
          ]}
        >
          <Text
            style={
              !selectedDate || disabled ? styles.textMuted : styles.textValue
            }
          >
            {displayDate}
          </Text>
          <View style={styles.iconRow}>
            <AntDesign
              name="calendar"
              size={24}
              color={disabled ? theme.colors.textMuted : theme.colors.text}
            />
            {disabled && (
              <FeatherIcon icon="lock" size={20} style={styles.lockIcon} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {show && (
        <DateTimePicker
          value={selectedDate || new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          locale="pt-BR"
        />
      )}
      {error != null && <Text style={styles.errorText}>{error.message}</Text>}
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
  inputDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md - theme.spacing.xs,
    height: 48,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: 'transparent',
  },
  textValue: {
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.text,
  },
  textMuted: {
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.textMuted,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs,
  },
}))
