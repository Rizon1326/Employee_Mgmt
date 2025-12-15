import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Building2, Users, Globe, MapPin, Monitor, Calendar } from 'lucide-react';
import ManagementCard from './ManagementCard';
export const AdminSettingsPage = () => {
//   const navigate = useNavigate();

  // Using local mock data and handlers instead of external context
  type Dept = { id: string; name: string };
  type RoleT = { id: string; name: string; departmentId: string };
  type CountryT = { id: string; name: string };
  type CityT = { id: string; name: string; countryId: string };
  type EquipmentT = { id: string; name: string };
  type WorkingDayT = { id: string; name: string };

  const [departments, setDepartments] = useState<Dept[]>([
    { id: 'd1', name: 'Engineering' },
    { id: 'd2', name: 'Human Resources' },
  ]);

  const [roles, setRoles] = useState<RoleT[]>([
    { id: 'r1', name: 'Frontend Developer', departmentId: 'd1' },
    { id: 'r2', name: 'Recruiter', departmentId: 'd2' },
  ]);

  const [countries, setCountries] = useState<CountryT[]>([
    { id: 'c1', name: 'United States' },
    { id: 'c2', name: 'India' },
  ]);

  const [cities, setCities] = useState<CityT[]>([
    { id: 'ci1', name: 'New York', countryId: 'c1' },
    { id: 'ci2', name: 'Bengaluru', countryId: 'c2' },
  ]);

  const [equipment, setEquipment] = useState<EquipmentT[]>([
    { id: 'e1', name: 'Laptop' },
    { id: 'e2', name: 'Monitor' },
  ]);

  const [workingDays, setWorkingDays] = useState<WorkingDayT[]>([
    { id: 'w1', name: 'Monday' },
    { id: 'w2', name: 'Tuesday' },
  ]);

  // Utility to create simple unique ids
  const uid = (prefix = '') => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

  // Department handlers
  const addDepartment = (name: string) => setDepartments((s) => [...s, { id: uid('d'), name }]);
  const updateDepartment = (id: string, name: string) => setDepartments((s) => s.map((d) => (d.id === id ? { ...d, name } : d)));
  const deleteDepartment = (id: string) => {
    setDepartments((s) => s.filter((d) => d.id !== id));
    // also remove roles tied to department
    setRoles((r) => r.filter((role) => role.departmentId !== id));
  };

  // Role handlers
  const addRole = (name: string, departmentId: string) => setRoles((s) => [...s, { id: uid('r'), name, departmentId }]);
  const updateRole = (id: string, name: string, departmentId: string) =>
    setRoles((s) => s.map((r) => (r.id === id ? { ...r, name, departmentId } : r)));
  const deleteRole = (id: string) => setRoles((s) => s.filter((r) => r.id !== id));

  // Country handlers
  const addCountry = (name: string) => setCountries((s) => [...s, { id: uid('c'), name }]);
  const updateCountry = (id: string, name: string) => setCountries((s) => s.map((c) => (c.id === id ? { ...c, name } : c)));
  const deleteCountry = (id: string) => {
    setCountries((s) => s.filter((c) => c.id !== id));
    // remove cities in that country
    setCities((cs) => cs.filter((city) => city.countryId !== id));
  };

  // City handlers
  const addCity = (name: string, countryId: string) => setCities((s) => [...s, { id: uid('ci'), name, countryId }]);
  const updateCity = (id: string, name: string, countryId: string) =>
    setCities((s) => s.map((c) => (c.id === id ? { ...c, name, countryId } : c)));
  const deleteCity = (id: string) => setCities((s) => s.filter((c) => c.id !== id));

  // Equipment handlers
  const addEquipment = (name: string) => setEquipment((s) => [...s, { id: uid('e'), name }]);
  const updateEquipment = (id: string, name: string) => setEquipment((s) => s.map((e) => (e.id === id ? { ...e, name } : e)));
  const deleteEquipment = (id: string) => setEquipment((s) => s.filter((e) => e.id !== id));

  // Working day handlers
  const addWorkingDay = (name: string) => setWorkingDays((s) => [...s, { id: uid('w'), name }]);
  const updateWorkingDay = (id: string, name: string) => setWorkingDays((s) => s.map((w) => (w.id === id ? { ...w, name } : w)));
  const deleteWorkingDay = (id: string) => setWorkingDays((s) => s.filter((w) => w.id !== id));

  const [activeSection, setActiveSection] = useState('departments');

  // Department state
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<{ id: string; name: string } | null>(null);

  // Role state
  const [newRole, setNewRole] = useState({ name: '', departmentId: '' });
  const [editingRole, setEditingRole] = useState<{ id: string; name: string; departmentId: string } | null>(null);

  // Country state
  const [newCountry, setNewCountry] = useState('');
  const [editingCountry, setEditingCountry] = useState<{ id: string; name: string } | null>(null);

  // City state
  const [newCity, setNewCity] = useState({ name: '', countryId: '' });
  const [editingCity, setEditingCity] = useState<{ id: string; name: string; countryId: string } | null>(null);

  // Equipment state
  const [newEquipment, setNewEquipment] = useState('');
  const [editingEquipment, setEditingEquipment] = useState<{ id: string; name: string } | null>(null);

  // Working Day state
  const [newWorkingDay, setNewWorkingDay] = useState('');
  const [editingWorkingDay, setEditingWorkingDay] = useState<{ id: string; name: string } | null>(null);

  // Department handlers
  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      addDepartment(newDepartment);
      setNewDepartment('');
    }
  };

  const handleUpdateDepartment = () => {
    if (editingDepartment && editingDepartment.name.trim()) {
      updateDepartment(editingDepartment.id, editingDepartment.name);
      setEditingDepartment(null);
    }
  };

  const handleDeleteDepartment = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated roles.`)) {
      deleteDepartment(id);
    }
  };

  // Role handlers
  const handleAddRole = () => {
    if (newRole.name.trim() && newRole.departmentId) {
      addRole(newRole.name, newRole.departmentId);
      setNewRole({ name: '', departmentId: '' });
    }
  };

  const handleUpdateRole = () => {
    if (editingRole && editingRole.name.trim() && editingRole.departmentId) {
      updateRole(editingRole.id, editingRole.name, editingRole.departmentId);
      setEditingRole(null);
    }
  };

  const handleDeleteRole = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteRole(id);
    }
  };

  // Country handlers
  const handleAddCountry = () => {
    if (newCountry.trim()) {
      addCountry(newCountry);
      setNewCountry('');
    }
  };

  const handleUpdateCountry = () => {
    if (editingCountry && editingCountry.name.trim()) {
      updateCountry(editingCountry.id, editingCountry.name);
      setEditingCountry(null);
    }
  };

  const handleDeleteCountry = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated cities.`)) {
      deleteCountry(id);
    }
  };

  // City handlers
  const handleAddCity = () => {
    if (newCity.name.trim() && newCity.countryId) {
      addCity(newCity.name, newCity.countryId);
      setNewCity({ name: '', countryId: '' });
    }
  };

  const handleUpdateCity = () => {
    if (editingCity && editingCity.name.trim() && editingCity.countryId) {
      updateCity(editingCity.id, editingCity.name, editingCity.countryId);
      setEditingCity(null);
    }
  };

  const handleDeleteCity = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCity(id);
    }
  };

  // Equipment handlers
  const handleAddEquipment = () => {
    if (newEquipment.trim()) {
      addEquipment(newEquipment);
      setNewEquipment('');
    }
  };

  const handleUpdateEquipment = () => {
    if (editingEquipment && editingEquipment.name.trim()) {
      updateEquipment(editingEquipment.id, editingEquipment.name);
      setEditingEquipment(null);
    }
  };

  const handleDeleteEquipment = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteEquipment(id);
    }
  };

  // Working Day handlers
  const handleAddWorkingDay = () => {
    if (newWorkingDay.trim()) {
      addWorkingDay(newWorkingDay);
      setNewWorkingDay('');
    }
  };

  const handleUpdateWorkingDay = () => {
    if (editingWorkingDay && editingWorkingDay.name.trim()) {
      updateWorkingDay(editingWorkingDay.id, editingWorkingDay.name);
      setEditingWorkingDay(null);
    }
  };

  const handleDeleteWorkingDay = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteWorkingDay(id);
    }
  };

  const sections = [
    { id: 'departments', name: 'Departments', icon: Building2 },
    { id: 'roles', name: 'Roles', icon: Users },
    { id: 'countries', name: 'Countries', icon: Globe },
    { id: 'cities', name: 'Cities', icon: MapPin },
    { id: 'equipment', name: 'Equipment', icon: Monitor },
    { id: 'workingDays', name: 'Working Days', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            // onClick={() => navigate('/employees')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Employees
          </button>
          <h1 className="text-slate-800">Admin Settings</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Management */}
          {activeSection === 'departments' && (
            <>
              <ManagementCard
                title="Add Department"
                icon={<Building2 className="w-5 h-5" />}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Department name"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddDepartment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </ManagementCard>

              <ManagementCard title="Departments List">
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <div key={dept.id}>
                      {editingDepartment?.id === dept.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingDepartment.name}
                            onChange={(e) =>
                              setEditingDepartment({ ...editingDepartment, name: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleUpdateDepartment}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingDepartment(null)}
                            className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-700">{dept.name}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingDepartment(dept)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDepartment(dept.id, dept.name)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ManagementCard>
            </>
          )}

          {/* Role Management */}
          {activeSection === 'roles' && (
            <>
              <ManagementCard
                title="Add Role"
                icon={<Users className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <select
                    value={newRole.departmentId}
                    onChange={(e) => setNewRole({ ...newRole, departmentId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Role name"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddRole}
                      disabled={!newRole.departmentId}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </ManagementCard>

              <ManagementCard title="Roles List">
                <div className="space-y-2">
                  {roles.map((role) => {
                    const dept = departments.find((d) => d.id === role.departmentId);
                    return (
                      <div key={role.id}>
                        {editingRole?.id === role.id ? (
                          <div className="space-y-2">
                            <select
                              value={editingRole.departmentId}
                              onChange={(e) =>
                                setEditingRole({ ...editingRole, departmentId: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                  {dept.name}
                                </option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingRole.name}
                                onChange={(e) =>
                                  setEditingRole({ ...editingRole, name: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={handleUpdateRole}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingRole(null)}
                                className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <span className="text-slate-700">{role.name}</span>
                              <p className="text-sm text-slate-500">{dept?.name}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingRole(role)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRole(role.id, role.name)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ManagementCard>
            </>
          )}

          {/* Country Management */}
          {activeSection === 'countries' && (
            <>
              <ManagementCard
                title="Add Country"
                icon={<Globe className="w-5 h-5" />}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Country name"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddCountry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </ManagementCard>

              <ManagementCard title="Countries List">
                <div className="space-y-2">
                  {countries.map((country) => (
                    <div key={country.id}>
                      {editingCountry?.id === country.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingCountry.name}
                            onChange={(e) =>
                              setEditingCountry({ ...editingCountry, name: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleUpdateCountry}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCountry(null)}
                            className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-700">{country.name}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingCountry(country)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCountry(country.id, country.name)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ManagementCard>
            </>
          )}

          {/* City Management */}
          {activeSection === 'cities' && (
            <>
              <ManagementCard
                title="Add City"
                icon={<MapPin className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <select
                    value={newCity.countryId}
                    onChange={(e) => setNewCity({ ...newCity, countryId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City name"
                      value={newCity.name}
                      onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddCity}
                      disabled={!newCity.countryId}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </ManagementCard>

              <ManagementCard title="Cities List">
                <div className="space-y-2">
                  {cities.map((city) => {
                    const country = countries.find((c) => c.id === city.countryId);
                    return (
                      <div key={city.id}>
                        {editingCity?.id === city.id ? (
                          <div className="space-y-2">
                            <select
                              value={editingCity.countryId}
                              onChange={(e) =>
                                setEditingCity({ ...editingCity, countryId: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingCity.name}
                                onChange={(e) =>
                                  setEditingCity({ ...editingCity, name: e.target.value })
                                }
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={handleUpdateCity}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingCity(null)}
                                className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <span className="text-slate-700">{city.name}</span>
                              <p className="text-sm text-slate-500">{country?.name}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingCity(city)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCity(city.id, city.name)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ManagementCard>
            </>
          )}

          {/* Equipment Management */}
          {activeSection === 'equipment' && (
            <>
              <ManagementCard
                title="Add Equipment"
                icon={<Monitor className="w-5 h-5" />}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Equipment name"
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddEquipment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </ManagementCard>

              <ManagementCard title="Equipment List">
                <div className="space-y-2">
                  {equipment.map((item) => (
                    <div key={item.id}>
                      {editingEquipment?.id === item.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingEquipment.name}
                            onChange={(e) =>
                              setEditingEquipment({ ...editingEquipment, name: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleUpdateEquipment}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingEquipment(null)}
                            className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-700">{item.name}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingEquipment(item)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEquipment(item.id, item.name)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ManagementCard>
            </>
          )}

          {/* Working Days Management */}
          {activeSection === 'workingDays' && (
            <>
              <ManagementCard
                title="Add Working Day"
                icon={<Calendar className="w-5 h-5" />}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Day name"
                    value={newWorkingDay}
                    onChange={(e) => setNewWorkingDay(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddWorkingDay}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </ManagementCard>

              <ManagementCard title="Working Days List">
                <div className="space-y-2">
                  {workingDays.map((day) => (
                    <div key={day.id}>
                      {editingWorkingDay?.id === day.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingWorkingDay.name}
                            onChange={(e) =>
                              setEditingWorkingDay({ ...editingWorkingDay, name: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleUpdateWorkingDay}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingWorkingDay(null)}
                            className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-700">{day.name}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingWorkingDay(day)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteWorkingDay(day.id, day.name)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ManagementCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


