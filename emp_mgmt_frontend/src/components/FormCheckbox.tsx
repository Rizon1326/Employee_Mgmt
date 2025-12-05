import { Controller, useFormContext } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
  name: string;
  label: string;
}

export const FormCheckbox = ({ name, label, ...props }: FormCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center mb-4">
          <input
            {...field}
            {...props}
            type="checkbox"
            id={name}
            checked={field.value || false}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={name} className="ml-2 text-sm text-gray-700">
            {label}
          </label>
        </div>
      )}
    />
  );
};
