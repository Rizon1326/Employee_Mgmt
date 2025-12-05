import { Controller, useFormContext } from 'react-hook-form';
import { Input } from './Input';
import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label?: string;
  required?: boolean;
}

export const FormField = ({ name, label, required, ...props }: FormFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label || name} is required` : false }}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          {...props}
          label={label}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
