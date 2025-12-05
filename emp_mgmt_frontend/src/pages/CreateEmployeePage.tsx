import { useNavigate } from 'react-router-dom';
import { EmployeeForm, Breadcrumb } from '../components';

export const CreateEmployeePage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/employees');
  };

  return (
    <div className="p-6">
      <Breadcrumb />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Employee</h1>
        <p className="text-gray-600 mt-1">Add a new employee to the system</p>
      </div>

      <div className="max-w-4xl">
        <EmployeeForm onClose={handleClose} />
      </div>
    </div>
  );
};
