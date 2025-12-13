import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { EquipmentModal } from '../../equipmentModal/components/EquipmentModal';


type Department = { id: number; name: string };
type Role = { id: number; name: string; departmentId: number };
type Country = { id: number; name: string };
type City = { id: number; countryId: number; name: string };
type Day = { id: number; name: string };

type FormState = {
  name: string;
  departmentId: string;
  roleId: string;
  countryId: string;
  cityId: string;
  workingDays: number[];
  workingType: 'Office' | 'Remote';
  equipment: number[];
};

const EmployeeFormPage = () => {
  // Hard-coded demo mode
  const [isEditMode] = useState(false);

  // Hard-coded lists
  const departments: Department[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Finance' },
  ];
  const allRoles: Role[] = [
    { id: 1, name: 'Developer', departmentId: 1 },
    { id: 2, name: 'Team Lead', departmentId: 1 },
    { id: 3, name: 'Recruiter', departmentId: 2 },
    { id: 4, name: 'Accountant', departmentId: 3 },
  ];
  const countries: Country[] = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'UK' },
  ];
  const allCities: City[] = [
    { id: 1, countryId: 1, name: 'New York' },
    { id: 2, countryId: 2, name: 'Toronto' },
    { id: 3, countryId: 1, name: 'San Francisco' },
  ];
  const workingDays: Day[] = [
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thu' },
    { id: 5, name: 'Fri' },
  ];

  // Form state with sensible defaults
  const [formData, setFormData] = useState<FormState>({
    name: '',
    departmentId: '',
    roleId: '',
    countryId: '',
    cityId: '',
    workingDays: [],
    workingType: 'Office',
    equipment: [],
  });

  // Modal state
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  // Derived lists (computed from state to avoid extra effects)
  const availableRoles = formData.departmentId
    ? allRoles.filter((r) => String(r.departmentId) === String(formData.departmentId))
    : allRoles;

  const availableCities = formData.countryId
    ? allCities.filter((c) => String(c.countryId) === String(formData.countryId))
    : allCities;

  // Handlers
  const handleInputChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value } as FormState));
  };

  const handleWorkingDayToggle = (id: number) => {
    setFormData((prev) => {
      const exists = prev.workingDays.includes(id);
      return { ...prev, workingDays: exists ? prev.workingDays.filter((d) => d !== id) : [...prev.workingDays, id] };
    });
  };

  const handleWorkingTypeChange = (type: 'Office' | 'Remote') => {
    setFormData((prev) => ({ ...prev, workingType: type }));
    if (type === 'Remote' && formData.equipment.length === 0) {
      // show modal so user can pick equipment (demo behavior)
      setShowEquipmentModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes just log the hard-coded form data
    // In a real app you'd call an API here
    // Convert some string ids to numbers for clarity
    const payload = {
      ...formData,
      departmentId: formData.departmentId ? Number(formData.departmentId) : null,
      roleId: formData.roleId ? Number(formData.roleId) : null,
      countryId: formData.countryId ? Number(formData.countryId) : null,
      cityId: formData.cityId ? Number(formData.cityId) : null,
    };
    console.log('Submitting (demo):', payload);
    alert('Form submitted (demo) — check console');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            // onClick={() => navigate('/employees')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Employees
          </button>
          <h1 className="text-slate-800">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="space-y-6">
            {/* Employee Name */}
            <div>
              <label className="block text-slate-700 mb-2">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter employee name"
                required
              />
            </div>

            {/* Department & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => handleInputChange('departmentId', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.roleId}
                  onChange={(e) => handleInputChange('roleId', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                  required
                  disabled={!formData.departmentId}
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {!formData.departmentId && <p className="text-sm text-slate-500 mt-1">Select a department first</p>}
              </div>
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.countryId}
                  onChange={(e) => handleInputChange('countryId', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cityId}
                  onChange={(e) => handleInputChange('cityId', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                  required
                  disabled={!formData.countryId}
                >
                  <option value="">Select City</option>
                  {availableCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {!formData.countryId && <p className="text-sm text-slate-500 mt-1">Select a country first</p>}
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-slate-700 mb-3">
                Working Days <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {workingDays.map((day) => (
                  <label
                    key={day.id}
                    className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.workingDays.includes(day.id)}
                      onChange={() => handleWorkingDayToggle(day.id)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">{day.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Working Type */}
            <div>
              <label className="block text-slate-700 mb-3">
                Working Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 p-4 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors flex-1">
                  <input
                    type="radio"
                    name="workingType"
                    value="Office"
                    checked={formData.workingType === 'Office'}
                    onChange={() => handleWorkingTypeChange('Office')}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-slate-700">Office</span>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors flex-1">
                  <input
                    type="radio"
                    name="workingType"
                    value="Remote"
                    checked={formData.workingType === 'Remote'}
                    onChange={() => handleWorkingTypeChange('Remote')}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-slate-700">Remote</span>
                </label>
              </div>
              {formData.workingType === 'Remote' && formData.equipment.length > 0 && (
                <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <p className="text-sm text-teal-800">Equipment selected: {formData.equipment.length} item(s)</p>
                  <button type="button" onClick={() => setShowEquipmentModal(true)} className="text-sm text-teal-600 hover:text-teal-800 mt-1">
                    Edit equipment
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button type="submit" className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
                {isEditMode ? 'Update Employee' : 'Save Employee'}
              </button>
              <button type="button" // onClick={() => navigate('/employees')}
                className="flex-1 md:flex-none px-8 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Equipment Modal */}
      {showEquipmentModal && <EquipmentModal />}
    </div>
  );
};

export default EmployeeFormPage;