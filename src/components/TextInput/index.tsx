import React, { useState } from 'react';
import { View, TextInput as TextInputReactNative, Text, TextInputProps } from 'react-native';
import { useFormContext, useController } from 'react-hook-form';

interface FormTextInputProps extends TextInputProps {
  name: string
  label?: string
  iconLeft?: string; // nome do ícone da esquerda
  password?: boolean
}

export const TextInput: React.FC<FormTextInputProps> = ({
  name,
  label,
  iconLeft,
  password = false,
  ...textInputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { control } = useFormContext(); // <- usa o contexto provido pelo FormProvider

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <TextInputReactNative
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        style={{
          borderColor: error ? 'red' : '#ccc',
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
        }}
        {...textInputProps}
      />
      {error && (
        <Text style={{ color: 'red', marginTop: 4 }}>{error.message}</Text>
      )}
    </View>
  );
};
