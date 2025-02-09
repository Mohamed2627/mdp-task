import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ThemedDatePicker, { ThemedDatePickerProps } from './ThemedDatePicker';

interface IControlledDateInputProps extends ThemedDatePickerProps {
  name: string
}

const ControlledDateInput = ({
  name,
  ...props
}: IControlledDateInputProps) => {
  // Hooks--------------------------------
  const { control, formState: { errors } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <ThemedDatePicker
          value={value}
          onSelect={onChange}
          error={errors?.[name]?.message as string}
          {...props}
        />
      )}
    />
  )
}

export default ControlledDateInput