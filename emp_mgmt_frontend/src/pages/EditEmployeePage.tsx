import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeForm, Breadcrumb, Loading, ErrorMessage } from '../components';
import { useEmployee } from '../hooks';

export const EditEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const employeeId = id ? parseInt(id) : 0;

  const { data: employee, isLoading, error } = useEmployee(employeeId);

  const handleClose = () => {
    navigate('/employees');
  };

  // Helper function to extract ID from relation object
  const extractId = (value: unknown): number | undefined => {
    if (typeof value === 'number') return value;
    if (value && typeof value === 'object' && 'id' in value) {
      return (value as { id: number }).id;
    }
    return undefined;
  };

  // Helper function to extract IDs from array of relations
  const extractIds = (value: unknown): number[] => {
    if (Array.isArray(value)) {
      return value.map(item => {
        if (typeof item === 'number') return item;
        if (item && typeof item === 'object' && 'id' in item) {
          return (item as { id: number }).id;
        }
        return 0;
      }).filter(id => id > 0);
    }
    return [];
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load employee" />;
  if (!employee) return <ErrorMessage message="Employee not found" />;

  return (
    <div className="p-6">
      <Breadcrumb />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Employee</h1>
        <p className="text-gray-600 mt-1">Update employee information</p>
      </div>

      <div className="max-w-4xl">
        <EmployeeForm
          defaultValues={{
            full_name: employee.full_name,
            email: employee.email,
            phone: employee.phone,
            date_of_birth: employee.date_of_birth,
            department: extractId(employee.department),
            role: extractId(employee.role),
            country: extractId(employee.country),
            city: extractId(employee.city),
            employment_type: employee.employment_type,
            remote_work: employee.remote_work,
            office_work: employee.office_work,
            work_days: extractIds(employee.work_days),
            equipment_needed: extractIds(employee.equipment_needed),
            can_view_projects: employee.can_view_projects,
            can_edit_projects: employee.can_edit_projects,
            can_delete_projects: employee.can_delete_projects,
            can_manage_employees: employee.can_manage_employees,
            can_approve_budget: employee.can_approve_budget,
          }}
          employeeId={employee.id}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};
