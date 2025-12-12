import { useState } from 'react';

import { Edit2, Trash2, Plus, Search, Settings } from 'lucide-react';

const EmployeeList = () => {
  const [departmentFilter, setDepartmentFilter] = useState('');
  const departments = [{ id: 1, name: 'Development' },{id:2,name:'HR'},{id:3,name:'Finance'}];
  const [countryFilter,setCountryFilter]=useState('')
  const countries = [{id:1,name:'USA'},{id:2,name:'Canada'},{id:3,name:'UK'},{id:4,name:'Bangladesh'}];
  const [workingTypeFilter,setWorkingTypeFilter]=useState('')
  const workingTypes = [{id:1,name:'Office'},{id:2,name:'Remote'}];

  const totalEmployees = [
    {
      id: 1,
      name: 'Alice Johnson',
      departmentId: 1,
      roleId: 1,
      countryId: 1,
      cityId: 1,
      workingDays: [1, 2, 3, 4, 5],
      workingType: 'Office',
    },
    {
      id: 2,
      name: 'Bob Smith',
      departmentId: 2,
      roleId: 2,
      countryId: 2,
      cityId: 2,
      workingDays: [1, 3, 5],
      workingType: 'Remote',
    },
  ];
   const roles = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Manager' },
  ];

  const cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Toronto' },
  ];

  const getDepartmentName = (id: number | string) =>
    departments.find((d) => d.id === Number(id))?.name ?? 'Unknown';
  const getRoleName = (id: number | string) => roles.find((r) => r.id === Number(id))?.name ?? 'Unknown';
  const getCountryName = (id: number | string) =>
    countries.find((c) => c.id === Number(id))?.name ?? 'Unknown';
  const getCityName = (id: number | string) => cities.find((c) => c.id === Number(id))?.name ?? 'Unknown';
  const getWorkingDaysNames = (days: number[]) =>
    (days || []).map((d) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][d - 1]).filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* Working Type Filter */}
            <select
              value={workingTypeFilter}
              onChange={(e) => setWorkingTypeFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Working Types</option>
              {workingTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
                {totalEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  totalEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-900">{employee.name}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {getDepartmentName(employee.departmentId)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {getRoleName(employee.roleId)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {getCountryName(employee.countryId)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {getCityName(employee.cityId)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {getWorkingDaysNames(employee.workingDays)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${
                            employee.workingType === 'Remote'
                              ? 'bg-teal-100 text-teal-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {employee.workingType}
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
    </div>
  );
};

export default EmployeeList;