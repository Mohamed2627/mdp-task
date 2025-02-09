import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ThemedSelectDropdown, { ThemedSelectDropdownProps } from './ThemedSelectDropdown';

interface IControlledSelectInputProps extends ThemedSelectDropdownProps {
  name: string
}

const ControlledSelectInput = ({
  name,
  ...props
}: IControlledSelectInputProps) => {
  // Hooks--------------------------------
  const { control, formState: { errors } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <ThemedSelectDropdown
          selectedValue={value}
          onSelect={onChange}
          error={errors?.[name]?.message as string}
          onBlur={onBlur}
          {...props}
        />
      )}
    />
  )
}

export default ControlledSelectInput