import { useController, useFormContext } from 'react-hook-form'

import Input, { InputProps } from '@/components/ui/Input'

interface FormInputProps extends Omit<InputProps, 'value' | 'error'> {
  name: string
}

// Casca fina de react-hook-form sobre ui/Input.
// Requer um <FormProvider> ancestral (useForm + FormProvider na tela).
export default function FormInput({ name, ...inputProps }: FormInputProps) {
  const { control } = useFormContext()
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue: '' })

  return (
    <Input
      {...inputProps}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={error?.message}
    />
  )
}
