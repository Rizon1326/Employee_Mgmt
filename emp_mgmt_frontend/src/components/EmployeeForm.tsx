import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { FormWrapper } from './FormWrapper';
import { FormField } from './FormField';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormMultiSelect } from './FormMultiSelect';
import { 
  useCreateEmployee, 
  useUpdateEmployee, 
  useDepartments, 
  useRolesByDepartment,
  useCountries, 
  useCitiesByCountry,
  useEquipment,
  useWorkDays 
} from '../hooks';
import { useUIStore, useNotificationStore } from '../stores';
import { EmploymentType, EmploymentTypeLabels } from '../types';
import type { Employee } from '../types';

interface EmployeeFormProps {
  defaultValues?: Partial<Employee>;
  employeeId?: number;
  onClose?: () => void;
}

export const EmployeeForm = ({ defaultValues, employeeId, onClose }: EmployeeFormProps) => {
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const { closeModal } = useUIStore();
  const { addNotification } = useNotificationStore();
  
  const isEdit = !!employeeId;

  // Load basic dropdown data
  const { data: departments } = useDepartments();
  const { data: countries } = useCountries();
  const { data: equipment } = useEquipment();
  const { data: workDays } = useWorkDays();

  // Use conditional hooks for dependent dropdowns
  const selectedDepartment = useWatch({ name: 'department' });
  const selectedCountry = useWatch({ name: 'country' });
  
  const { data: roles } = useRolesByDepartment(selectedDepartment);
  const { data: cities } = useCitiesByCountry(selectedCountry);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      const employeeData = {
        full_name: data.full_name as string,
        email: data.email as string,
        phone: data.phone as string,
        date_of_birth: data.date_of_birth as string,
        department: data.department ? Number(data.department) : undefined,
        role: data.role ? Number(data.role) : undefined,
        country: data.country ? Number(data.country) : undefined,
        city: data.city ? Number(data.city) : undefined,
        employment_type: data.employment_type as EmploymentType,
        remote_work: Boolean(data.remote_work),
        office_work: Boolean(data.office_work),
        work_days: (data.work_days as number[]) || [],
        equipment_needed: (data.equipment_needed as number[]) || [],
        can_view_projects: Boolean(data.can_view_projects),
        can_edit_projects: Boolean(data.can_edit_projects),
        can_delete_projects: Boolean(data.can_delete_projects),
        can_manage_employees: Boolean(data.can_manage_employees),
        can_approve_budget: Boolean(data.can_approve_budget),
      };

      if (isEdit) {
        await updateMutation.mutateAsync({ id: employeeId!, data: employeeData });
        addNotification('success', 'Employee updated successfully!');
      } else {
        await createMutation.mutateAsync(employeeData);
        addNotification('success', 'Employee created successfully!');
      }
      
      if (onClose) {
        onClose();
      } else {
        closeModal();
      }
    } catch {
      addNotification('error', `Failed to ${isEdit ? 'update' : 'create'} employee`);
    }
  };

  // Clear dependent fields when parent changes
  useEffect(() => {
    // Role depends on department - clear when department changes
    if (selectedDepartment) {
      // Clear role when department changes (handled by form reset if needed)
    }
  }, [selectedDepartment]);

  useEffect(() => {
    // City depends on country - clear when country changes  
    if (selectedCountry) {
      // Clear city when country changes (handled by form reset if needed)
    }
  }, [selectedCountry]);

  // Prepare dropdown options
  const departmentOptions = departments?.results.map(dept => ({
    value: dept.id,
    label: dept.name
  })) || [];

  const roleOptions = roles?.results.map(role => ({
    value: role.id,
    label: role.name
  })) || [];

  const countryOptions = countries?.results.map(country => ({
    value: country.id,
    label: country.name
  })) || [];

  const cityOptions = cities?.results.map(city => ({
    value: city.id,
    label: city.name
  })) || [];

  const equipmentOptions = equipment?.results.map(eq => ({
    value: eq.id,
    label: eq.name
  })) || [];

  const workDayOptions = workDays?.results.map(day => ({
    value: day.id,
    label: day.name
  })) || [];

  const employmentOptions = Object.entries(EmploymentTypeLabels).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <FormWrapper 
      onSubmit={handleSubmit} 
      title={isEdit ? "Edit Employee" : "Create Employee"}
      defaultValues={defaultValues}
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Personal Information</h3>
        <FormField name="full_name" label="Full Name" required />
        <FormField name="email" label="Email" type="email" required />
        <FormField name="phone" label="Phone" />
        <FormField name="date_of_birth" label="Date of Birth" type="date" required />
      </div>

      {/* Work Information */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Work Information</h3>
        <FormSelect 
          name="department" 
          label="Department" 
          options={departmentOptions}
        />
        <FormSelect 
          name="role" 
          label="Role" 
          options={roleOptions}
        />
        <FormSelect 
          name="employment_type" 
          label="Employment Type" 
          options={employmentOptions}
          required
        />
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Location</h3>
        <FormSelect 
          name="country" 
          label="Country" 
          options={countryOptions}
        />
        <FormSelect 
          name="city" 
          label="City" 
          options={cityOptions}
        />
      </div>

      {/* Work Settings */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Work Settings</h3>
        <FormCheckbox name="remote_work" label="Remote Work" />
        <FormCheckbox name="office_work" label="Office Work" />
        <FormMultiSelect 
          name="work_days" 
          label="Work Days" 
          options={workDayOptions}
        />
        <FormMultiSelect 
          name="equipment_needed" 
          label="Equipment Needed" 
          options={equipmentOptions}
        />
      </div>

      {/* Permissions */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Permissions</h3>
        <FormCheckbox name="can_view_projects" label="Can View Projects" />
        <FormCheckbox name="can_edit_projects" label="Can Edit Projects" />
        <FormCheckbox name="can_delete_projects" label="Can Delete Projects" />
        <FormCheckbox name="can_manage_employees" label="Can Manage Employees" />
        <FormCheckbox name="can_approve_budget" label="Can Approve Budget" />
      </div>
    </FormWrapper>
  );
};
