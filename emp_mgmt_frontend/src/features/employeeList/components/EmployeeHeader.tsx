
import { Plus, Settings } from 'lucide-react';

const EmployeeHeader = () => {
  

  return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-slate-800">Employee Management</h1>
          <div className="flex gap-3">
            <button
              
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200"
            >
              <Settings className="w-4 h-4" />
              Admin Settings
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Employee
            </button>
          </div>
        </div>
        
      </div>
  );
};

export default EmployeeHeader;