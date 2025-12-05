import { Controller, useFormContext } from 'react-hook-form';
import { Select } from './Select';
import type { SelectHTMLAttributes } from 'react';

interface FormSelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  name: string;
  label?: string;
  options: FormSelectOption[];
  required?: boolean;
}

export const FormSelect = ({ name, label, options, required, ...props }: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label || name} is required` : false }}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          {...props}
          label={label}
          options={options}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
