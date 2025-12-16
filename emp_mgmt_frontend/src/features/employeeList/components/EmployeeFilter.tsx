import { useState } from 'react';
import { useDepartments,useCountries } from '../hooks/useEmployeeList';
import { Search } from 'lucide-react';
import type { Country, Department } from '../types/employeeList';

const EmployeeList = () => {
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [countryFilter,setCountryFilter]=useState('')
  const [workingTypeFilter,setWorkingTypeFilter]=useState('')
  const workingTypes = [{id:1,name:'Office'},{id:2,name:'Remote'}];

  const {data:deptData,isLoading:isDeptLoading,isError:isDeptError}=useDepartments();
  const {data:countryData,isLoading:isCountryLoading,isError:isCountryError}=useCountries();

  return (
    <>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={isDeptLoading}
            >
              <option value="">
                {isDeptLoading ? 'Loading departments...' : 'All Departments'}
              </option>
              {isDeptError && (
                <option value="" disabled>
                  Error loading departments
                </option>
              )}
              {deptData?.map((dept: Department) => (
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
              <option value="">{isCountryLoading?'Country Data is loading ':'All Country'}</option>
              {isCountryError && (
                <option value="" disabled>
                  Error loading departments
                </option>
              )}

              {countryData?.map((country: Country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

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
    </>
  );
};

export default EmployeeList;