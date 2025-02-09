import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ThemedTextInput, { IThemedTextInputProps } from './ThemedTextInput'

interface IControlledTextInputProps extends IThemedTextInputProps {
  name: string
}

const ControlledTextInput = ({
  name,
  ...props
}: IControlledTextInputProps) => {
  // Hooks--------------------------------
  const { control, formState: { errors } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <ThemedTextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={errors?.[name]?.message as string}
          {...props}
        />
      )}
    />
  )
}

export default ControlledTextInput