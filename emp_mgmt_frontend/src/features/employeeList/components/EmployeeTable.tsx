
import { Edit2, Trash2 } from 'lucide-react';
import { useEmployees} from '../hooks/useEmployeeList';
import type { Employee } from '../types/employeeList';

const EmployeeTable = () => {
  const { data: employeeData, isLoading: isEmployeeLoading, isError: isEmployeeError } = useEmployees();

  // Show loading state
  if (isEmployeeLoading ) {
    return (
      <div className="min-h-screen bg-linear-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-12 text-center text-slate-500">
            Loading employees...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isEmployeeError) {
    return (
      <div className="min-h-screen bg-linear-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-12 text-center text-red-500">
            Error loading employees
          </div>
        </div>
      </div>
    );
  }

  const employees = Array.isArray(employeeData) ? employeeData : [];

  const getWorkingDaysNames = (workingDays: Array<{id: number; name: string}>) => {
    return workingDays.map(day => day.name).join(', ');
  };

  const getWorkingTypeDisplay = (employee: Employee) => {
    if (employee.remote_work && employee.office_work) {
      return 'Hybrid';
    } else if (employee.remote_work) {
      return 'Remote';
    } else if (employee.office_work) {
      return 'Office';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-slate-50 to-blue-50">
      
        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-slate-700">Employee Name</th>
                  <th className="text-left px-6 py-4 text-slate-700">Department</th>
                  <th className="text-left px-6 py-4 text-slate-700">Role</th>
                  <th className="text-left px-6 py-4 text-slate-700">Country</th>
                  <th className="text-left px-6 py-4 text-slate-700">City</th>
                  <th className="text-left px-6 py-4 text-slate-700">Working Days</th>
                  <th className="text-left px-6 py-4 text-slate-700">Working Type</th>
                  <th className="text-left px-6 py-4 text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  employees.map((employee: Employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-900">{employee.full_name}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {employee.department?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {employee.role?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {employee.country?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {employee.city?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {getWorkingDaysNames(employee.work_days || [])}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${
                            getWorkingTypeDisplay(employee) === 'Remote'
                              ? 'bg-teal-100 text-teal-700'
                              : getWorkingTypeDisplay(employee) === 'Hybrid'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {getWorkingTypeDisplay(employee)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            // onClick={() => navigate(`/employees/edit/${employee.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            // onClick={() => handleDelete(employee.id, employee.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default EmployeeTable;