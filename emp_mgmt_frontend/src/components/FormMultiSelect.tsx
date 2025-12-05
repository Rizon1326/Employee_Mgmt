import { useController } from 'react-hook-form';

interface Option {
  value: number;
  label: string;
}

interface FormMultiSelectProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
}

export const FormMultiSelect = ({ name, label, options, required }: FormMultiSelectProps) => {
  const { field, fieldState } = useController({ name });

  const handleChange = (value: number, checked: boolean) => {
    const currentValues = field.value || [];
    if (checked) {
      field.onChange([...currentValues, value]);
    } else {
      field.onChange(currentValues.filter((v: number) => v !== value));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
        {options.length === 0 ? (
          <p className="text-gray-500 text-sm">No options available</p>
        ) : (
          options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                checked={field.value?.includes(option.value) || false}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))
        )}
      </div>
      {fieldState.error && (
        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
      )}
    </div>
  );
};
