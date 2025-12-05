import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Search, Loading, ErrorMessage, Breadcrumb } from '../components';
import { useEmployees, useDeleteEmployee } from '../hooks';
import { useNotificationStore } from '../stores';
import type { Employee } from '../types';

export const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const { addNotification } = useNotificationStore();
  const deleteMutation = useDeleteEmployee();

  // Helper function to safely render department/role names
  const renderRelationName = (value: unknown): string => {
    if (value && typeof value === 'object' && 'name' in value) {
      return String((value as { name: string }).name);
    }
    return String(value || '-');
  };

  // Fetch employees with search
  const { data, isLoading, error } = useEmployees({
    search,
    page: 1,
    page_size: 50
  });

  const employees = data?.results || [];

  const handleEdit = (employee: Employee) => {
    navigate(`/employees/edit/${employee.id}`);
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

  const handleCreateNew = () => {
    navigate('/employees/create');
  };

  const columns = [
    { 
      key: 'full_name' as keyof Employee, 
      label: 'Full Name',
      render: (value: unknown) => String(value || '-')
    },
    { 
      key: 'email' as keyof Employee, 
      label: 'Email',
      render: (value: unknown) => String(value || '-')
    },
    { 
      key: 'department' as keyof Employee, 
      label: 'Department',
      render: (_: unknown, employee: Employee) => {
        const dept = (employee as unknown as Record<string, unknown>).department;
        return renderRelationName(dept);
      }
    },
    { 
      key: 'role' as keyof Employee, 
      label: 'Role',
      render: (_: unknown, employee: Employee) => {
        const role = (employee as unknown as Record<string, unknown>).role;
        return renderRelationName(role);
      }
    },
    { 
      key: 'employment_type' as keyof Employee, 
      label: 'Employment Type',
      render: (value: unknown) => String(value || '-')
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
    </div>
  );
};
