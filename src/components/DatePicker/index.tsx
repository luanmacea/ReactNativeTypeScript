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
import { AntDesign } from '@expo/vector-icons'
import { useController, useFormContext } from 'react-hook-form'
import { selectThemeState } from '~/redux/features/theme/themeSelectors'
import { useAppSelector } from '~/redux/hook'

interface DatePickerInputProps {
  name: string
  label?: string
  marginBottom?: number
  minimumDate?: Date
  maximumDate?: Date
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  marginBottom = 32,
  minimumDate,
  maximumDate,
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
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={[styles.inputDate, error && styles.inputError]}>
          <Text style={styles.textInput}>{displayDate}</Text>
          <AntDesign
            name="calendar"
            size={24}
            color={theme.colors?.black || '#000'}
          />
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
  }>({
    container: {
      width: '100%',
    },
    label: {
      fontSize: 14,
      color: theme.colors?.grey2,
      marginTop: 10,
      marginBottom: 5,
    },
    inputDate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors?.grey3,
      alignItems: 'center',
      paddingRight: 16,
      height: 48,
      paddingLeft: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors?.greyOutline,
    },
    textInput: {
      fontFamily: 'Roboto',
      fontSize: 16,
      letterSpacing: 0,
      lineHeight: 19,
      color: theme.colors?.grey1,
    },
    inputError: {
      borderColor: theme.colors?.error,
    },
    errorText: {
      color: theme.colors?.error,
      fontSize: 12,
      marginTop: 4,
    },
  })

export default DatePickerInput
