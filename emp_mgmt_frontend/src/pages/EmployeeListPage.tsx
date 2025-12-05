import { useState } from 'react';
import { Button, Modal, Table, Search, Loading, ErrorMessage, EmployeeForm, Breadcrumb } from '../components';
import { useEmployees, useDeleteEmployee } from '../hooks';
import { useUIStore, useNotificationStore } from '../stores';
import type { Employee } from '../types';

export const EmployeeListPage = () => {
  const [search, setSearch] = useState('');
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  
  const { openModal, closeModal } = useUIStore();
  const { addNotification } = useNotificationStore();
  const deleteMutation = useDeleteEmployee();

  // Fetch employees with search
  const { data, isLoading, error } = useEmployees({
    search,
    page: 1,
    page_size: 50
  });

  const employees = data?.results || [];

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
    openModal('createEmployee', employee);
  };

  const handleDelete = async (employee: Employee) => {
    if (confirm(`Are you sure you want to delete ${employee.full_name}?`)) {
      try {
        await deleteMutation.mutateAsync(employee.id);
        addNotification('success', 'Employee deleted successfully!');
      } catch {
        addNotification('error', 'Failed to delete employee');
      }
    }
  };

  const handleCloseModal = () => {
    setEditEmployee(null);
    closeModal();
  };

  const handleCreateNew = () => {
    setEditEmployee(null);
    openModal('createEmployee');
  };

  const columns = [
    { 
      key: 'full_name' as keyof Employee, 
      label: 'Full Name' 
    },
    { 
      key: 'email' as keyof Employee, 
      label: 'Email' 
    },
    { 
      key: 'department' as keyof Employee, 
      label: 'Department',
      render: (_: unknown, employee: Employee) => employee.department || '-'
    },
    { 
      key: 'role' as keyof Employee, 
      label: 'Role',
      render: (_: unknown, employee: Employee) => employee.role || '-'
    },
    { 
      key: 'employment_type' as keyof Employee, 
      label: 'Employment Type' 
    },
    {
      key: 'id' as keyof Employee,
      label: 'Actions',
      render: (_: unknown, employee: Employee) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => handleEdit(employee)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(employee)}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load employees" />;

  return (
    <div className="p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <Button onClick={handleCreateNew}>
          Create New Employee
        </Button>
      </div>

      <div className="mb-4">
        <Search
          onSearch={setSearch}
          placeholder="Search employees..."
        />
      </div>

      <Table
        data={employees}
        columns={columns}
      />

      <Modal title={editEmployee ? "Edit Employee" : "Create Employee"}>
        <EmployeeForm
          defaultValues={editEmployee ? {
            full_name: editEmployee.full_name,
            email: editEmployee.email,
            phone: editEmployee.phone,
            date_of_birth: editEmployee.date_of_birth,
            department: editEmployee.department,
            role: editEmployee.role,
            country: editEmployee.country,
            city: editEmployee.city,
            employment_type: editEmployee.employment_type,
            remote_work: editEmployee.remote_work,
            office_work: editEmployee.office_work,
            work_days: editEmployee.work_days,
            equipment_needed: editEmployee.equipment_needed,
            can_view_projects: editEmployee.can_view_projects,
            can_edit_projects: editEmployee.can_edit_projects,
            can_delete_projects: editEmployee.can_delete_projects,
            can_manage_employees: editEmployee.can_manage_employees,
            can_approve_budget: editEmployee.can_approve_budget,
          } : undefined}
          employeeId={editEmployee?.id}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
