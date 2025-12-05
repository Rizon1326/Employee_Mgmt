import { useState } from 'react';
import { Button, Table, Search, Modal, DepartmentForm, Loading, ErrorMessage, Breadcrumb } from '../components';
import { useDepartments, useDeleteDepartment } from '../hooks';
import { useUIStore, useFilterStore, useNotificationStore } from '../stores';
import type { Department } from '../types';

export const DepartmentListPage = () => {
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);
  const [deleteDepartment, setDeleteDepartment] = useState<Department | null>(null);
  
  // Hooks
  const { departmentFilters, setDepartmentFilters } = useFilterStore();
  const { data, isLoading, error } = useDepartments(departmentFilters);
  const { openModal, closeModal, isModalOpen, modalType } = useUIStore();
  const { addNotification } = useNotificationStore();
  const deleteMutation = useDeleteDepartment();

  // Handlers
  const handleSearch = (query: string) => {
    setDepartmentFilters({ search: query, page: 1 });
  };

  const handleEdit = (department: Department) => {
    setEditDepartment(department);
    openModal('createDepartment'); // Reuse same modal
  };

  const handleDelete = (department: Department) => {
    setDeleteDepartment(department);
    openModal('deleteConfirm');
  };

  const confirmDelete = async () => {
    if (!deleteDepartment) return;
    
    try {
      await deleteMutation.mutateAsync(deleteDepartment.id);
      addNotification('success', 'Department deleted successfully!');
      closeModal();
      setDeleteDepartment(null);
    } catch {
      addNotification('error', 'Failed to delete department');
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setEditDepartment(null);
    setDeleteDepartment(null);
  };

  // Table columns
  const columns = [
    { key: 'name' as keyof Department, label: 'Department Name' },
    {
      key: 'id' as keyof Department,
      label: 'Actions',
      render: (_: unknown, department: Department) => (
        <div className="space-x-2">
          <Button 
            variant="secondary" 
            onClick={() => handleEdit(department)}
            className="text-sm px-3 py-1"
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(department)}
            className="text-sm px-3 py-1"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Loading state
  if (isLoading) return <Loading message="Loading departments..." />;
  
  // Error state
  if (error) return <ErrorMessage message="Failed to load departments" />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Breadcrumb />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Departments</h1>
        
        {/* Actions */}
        <div className="flex justify-between items-center mb-4">
          <Search 
            placeholder="Search departments..." 
            onSearch={handleSearch}
          />
          <Button onClick={() => openModal('createDepartment')}>
            Add Department
          </Button>
        </div>
      </div>

      {/* Department Table */}
      <Table 
        data={data?.results || []} 
        columns={columns}
        loading={isLoading}
      />

      {/* Create/Edit Department Modal */}
      {isModalOpen && modalType === 'createDepartment' && (
        <Modal title={editDepartment ? 'Edit Department' : 'Create Department'}>
          <DepartmentForm 
            defaultValues={editDepartment ? { name: editDepartment.name } : undefined}
            departmentId={editDepartment?.id}
            onClose={handleCloseModal}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && modalType === 'deleteConfirm' && deleteDepartment && (
        <Modal title="Delete Department">
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>{deleteDepartment.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={confirmDelete}
                loading={deleteMutation.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
