import React, { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useController, useFormContext } from 'react-hook-form'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

interface DatePickerInputProps {
  name: string
  label?: string
  marginBottom?: number
  minimumDate?: Date
  maximumDate?: Date
  disabled?: boolean
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  marginBottom = 0,
  minimumDate,
  maximumDate,
  disabled = false,
}) => {
  const theme = useAppSelector(selectThemeState)
  const styles = createStyles(theme)

  const [show, setShow] = useState(false)

  const { control } = useFormContext()

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  const selectedDate = value ? new Date(value) : null

  const handleDateChange = (_event: any, date?: Date) => {
    setShow(false)
    if (date) {
      onChange(date.toISOString())
    } else {
      onChange(null)
    }
  }

  const displayDate = selectedDate
    ? new Intl.DateTimeFormat('pt-BR').format(selectedDate)
    : 'Selecione uma data'

  return (
    <View style={[styles.container, { marginBottom }]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableWithoutFeedback onPress={() => !disabled && setShow(true)}>
        <View
          style={[
            styles.inputDate,

            error && styles.inputError,
            disabled && styles.disabledInputDate,
          ]}
        >
          <Text
            style={[
              styles.textInput,
              !selectedDate || disabled
                ? { color: theme.colors?.grey2 }
                : { color: theme.colors?.grey1 },
            ]}
          >
            {displayDate}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="calendar"
              size={24}
              color={
                disabled ? theme.colors?.grey2 : theme.colors?.black || '#000'
              }
            />
            {disabled && (
              <Feather
                name="lock"
                size={20}
                color={theme.colors?.grey2}
                style={{ marginLeft: 8 }}
              />
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
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  )
}

const createStyles = (theme: any) =>
  StyleSheet.create<{
    container: ViewStyle
    label: TextStyle
    inputDate: ViewStyle
    textInput: TextStyle
    inputError: ViewStyle
    errorText: TextStyle
    disabledInputDate: ViewStyle
  }>({
    container: {
      width: '100%',
    },
    label: {
      fontSize: 14,
      color: theme.colors?.grey2,
      marginBottom: 5,
    },
    inputDate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors?.grey3,
      alignItems: 'center',
      paddingRight: 12,
      height: 48,
      paddingLeft: 16,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors?.greyOutline,
    },
    textInput: {
      fontFamily: 'Roboto',
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 19,
    },
    inputError: {
      borderColor: theme.colors?.error,
    },
    errorText: {
      color: theme.colors?.error,
      fontSize: 12,
      marginTop: 4,
    },
    disabledInputDate: {
      backgroundColor: 'transparent',
    },
  })

export default DatePickerInput
