import { FormWrapper } from './FormWrapper';
import { FormField } from './FormField';
import { useCreateDepartment } from '../hooks';
import { useUIStore, useNotificationStore } from '../stores';

export const DepartmentForm = () => {
  const createMutation = useCreateDepartment();
  const { closeModal } = useUIStore();
  const { addNotification } = useNotificationStore();

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      await createMutation.mutateAsync({
        name: data.name as string,
      });
      addNotification('success', 'Department created successfully!');
      closeModal();
    } catch {
      addNotification('error', 'Failed to create department');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} title="Create Department">
      <FormField
        name="name"
        label="Department Name"
        placeholder="Enter department name"
        required
      />
    </FormWrapper>
  );
};
