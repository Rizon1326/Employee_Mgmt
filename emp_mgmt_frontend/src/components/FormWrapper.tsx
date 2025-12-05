import { useForm, FormProvider } from 'react-hook-form';
import type { ReactNode } from 'react';
import { Button } from './Button';

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
  title?: string;
}

export const FormWrapper = ({ 
  children, 
  onSubmit, 
  defaultValues = {},
  title 
}: FormWrapperProps) => {
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  return (
    <FormProvider {...methods}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {children}
        <Button type="submit" loading={isSubmitting} className="w-full">
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </FormProvider>
  );
};
