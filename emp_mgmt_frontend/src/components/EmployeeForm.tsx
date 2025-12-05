import { FormWrapper } from './FormWrapper';
import { FormField } from './FormField';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { useCreateEmployee, useDepartments, useCountries } from '../hooks';
import { useUIStore, useNotificationStore } from '../stores';
import { EmploymentType, EmploymentTypeLabels } from '../types';

export const EmployeeForm = () => {
  const createMutation = useCreateEmployee();
  const { closeModal } = useUIStore();
  const { addNotification } = useNotificationStore();
  
  // Load dropdown data
  const { data: departments } = useDepartments();
  const { data: countries } = useCountries();

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      await createMutation.mutateAsync({
        full_name: data.full_name as string,
        email: data.email as string,
        phone: data.phone as string,
        date_of_birth: data.date_of_birth as string,
        department: data.department ? Number(data.department) : undefined,
        country: data.country ? Number(data.country) : undefined,
        employment_type: data.employment_type as EmploymentType,
        remote_work: Boolean(data.remote_work),
        office_work: Boolean(data.office_work),
        work_days: [],
        equipment_needed: [],
        can_view_projects: Boolean(data.can_view_projects),
        can_edit_projects: Boolean(data.can_edit_projects),
        can_delete_projects: Boolean(data.can_delete_projects),
        can_manage_employees: Boolean(data.can_manage_employees),
        can_approve_budget: Boolean(data.can_approve_budget),
      });
      addNotification('success', 'Employee created successfully!');
      closeModal();
    } catch {
      addNotification('error', 'Failed to create employee');
    }
  };

  // Prepare dropdown options
  const departmentOptions = departments?.results.map(dept => ({
    value: dept.id,
    label: dept.name
  })) || [];

  const countryOptions = countries?.results.map(country => ({
    value: country.id,
    label: country.name
  })) || [];

  const employmentOptions = Object.entries(EmploymentTypeLabels).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <FormWrapper onSubmit={handleSubmit} title="Create Employee">
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
      </div>

      {/* Work Settings */}
      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">Work Settings</h3>
        <FormCheckbox name="remote_work" label="Remote Work" />
        <FormCheckbox name="office_work" label="Office Work" />
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
