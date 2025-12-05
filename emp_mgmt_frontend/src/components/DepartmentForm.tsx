import { FormWrapper } from './FormWrapper';
import { FormField } from './FormField';
import { useCreateDepartment, useUpdateDepartment } from '../hooks';
import { useUIStore, useNotificationStore } from '../stores';

interface DepartmentFormProps {
  defaultValues?: { name: string };
  departmentId?: number;
  onClose?: () => void;
}

export const DepartmentForm = ({ defaultValues, departmentId, onClose }: DepartmentFormProps) => {
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const { closeModal } = useUIStore();
  const { addNotification } = useNotificationStore();

  const isEditing = Boolean(departmentId);
  
  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isEditing && departmentId) {
        await updateMutation.mutateAsync({
          id: departmentId,
          data: { name: data.name as string }
        });
        addNotification('success', 'Department updated successfully!');
      } else {
        await createMutation.mutateAsync({
          name: data.name as string,
        });
        addNotification('success', 'Department created successfully!');
      }
      
      if (onClose) {
        onClose();
      } else {
        closeModal();
      }
    } catch {
      addNotification('error', isEditing ? 'Failed to update department' : 'Failed to create department');
    }
  };

  return (
    <FormWrapper 
      onSubmit={handleSubmit} 
      title={isEditing ? 'Edit Department' : 'Create Department'}
      defaultValues={defaultValues}
    >
      <FormField
        name="name"
        label="Department Name"
        placeholder="Enter department name"
        required
      />
    </FormWrapper>
  );
};
