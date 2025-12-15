// import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import { Plus, Edit2, Trash2, ArrowLeft, Building2, Users, Globe, MapPin, Monitor, Calendar } from 'lucide-react';
// import ManagementCard from '../ManagementCard';
// export const CityList = () => {
// //   const navigate = useNavigate();

//   // Using local mock data and handlers instead of external context
//   type Dept = { id: string; name: string };
//   type RoleT = { id: string; name: string; departmentId: string };
//   type CountryT = { id: string; name: string };
//   type CityT = { id: string; name: string; countryId: string };
//   type EquipmentT = { id: string; name: string };
//   type WorkingDayT = { id: string; name: string };

//   const [departments, setDepartments] = useState<Dept[]>([
//     { id: 'd1', name: 'Engineering' },
//     { id: 'd2', name: 'Human Resources' },
//   ]);

//   const [roles, setRoles] = useState<RoleT[]>([
//     { id: 'r1', name: 'Frontend Developer', departmentId: 'd1' },
//     { id: 'r2', name: 'Recruiter', departmentId: 'd2' },
//   ]);

//   const [countries, setCountries] = useState<CountryT[]>([
//     { id: 'c1', name: 'United States' },
//     { id: 'c2', name: 'India' },
//   ]);

//   const [cities, setCities] = useState<CityT[]>([
//     { id: 'ci1', name: 'New York', countryId: 'c1' },
//     { id: 'ci2', name: 'Bengaluru', countryId: 'c2' },
//   ]);

//   const [equipment, setEquipment] = useState<EquipmentT[]>([
//     { id: 'e1', name: 'Laptop' },
//     { id: 'e2', name: 'Monitor' },
//   ]);

//   const [workingDays, setWorkingDays] = useState<WorkingDayT[]>([
//     { id: 'w1', name: 'Monday' },
//     { id: 'w2', name: 'Tuesday' },
//   ]);

//   // Utility to create simple unique ids
//   const uid = (prefix = '') => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

//   // Department handlers
//   const addDepartment = (name: string) => setDepartments((s) => [...s, { id: uid('d'), name }]);
//   const updateDepartment = (id: string, name: string) => setDepartments((s) => s.map((d) => (d.id === id ? { ...d, name } : d)));
//   const deleteDepartment = (id: string) => {
//     setDepartments((s) => s.filter((d) => d.id !== id));
//     // also remove roles tied to department
//     setRoles((r) => r.filter((role) => role.departmentId !== id));
//   };

//   // Role handlers
//   const addRole = (name: string, departmentId: string) => setRoles((s) => [...s, { id: uid('r'), name, departmentId }]);
//   const updateRole = (id: string, name: string, departmentId: string) =>
//     setRoles((s) => s.map((r) => (r.id === id ? { ...r, name, departmentId } : r)));
//   const deleteRole = (id: string) => setRoles((s) => s.filter((r) => r.id !== id));

//   // Country handlers
//   const addCountry = (name: string) => setCountries((s) => [...s, { id: uid('c'), name }]);
//   const updateCountry = (id: string, name: string) => setCountries((s) => s.map((c) => (c.id === id ? { ...c, name } : c)));
//   const deleteCountry = (id: string) => {
//     setCountries((s) => s.filter((c) => c.id !== id));
//     // remove cities in that country
//     setCities((cs) => cs.filter((city) => city.countryId !== id));
//   };

//   // City handlers
//   const addCity = (name: string, countryId: string) => setCities((s) => [...s, { id: uid('ci'), name, countryId }]);
//   const updateCity = (id: string, name: string, countryId: string) =>
//     setCities((s) => s.map((c) => (c.id === id ? { ...c, name, countryId } : c)));
//   const deleteCity = (id: string) => setCities((s) => s.filter((c) => c.id !== id));

//   // Equipment handlers
//   const addEquipment = (name: string) => setEquipment((s) => [...s, { id: uid('e'), name }]);
//   const updateEquipment = (id: string, name: string) => setEquipment((s) => s.map((e) => (e.id === id ? { ...e, name } : e)));
//   const deleteEquipment = (id: string) => setEquipment((s) => s.filter((e) => e.id !== id));

//   // Working day handlers
//   const addWorkingDay = (name: string) => setWorkingDays((s) => [...s, { id: uid('w'), name }]);
//   const updateWorkingDay = (id: string, name: string) => setWorkingDays((s) => s.map((w) => (w.id === id ? { ...w, name } : w)));
//   const deleteWorkingDay = (id: string) => setWorkingDays((s) => s.filter((w) => w.id !== id));

//   const [activeSection, setActiveSection] = useState('departments');

//   // Department state
//   const [newDepartment, setNewDepartment] = useState('');
//   const [editingDepartment, setEditingDepartment] = useState<{ id: string; name: string } | null>(null);

//   // Role state
//   const [newRole, setNewRole] = useState({ name: '', departmentId: '' });
//   const [editingRole, setEditingRole] = useState<{ id: string; name: string; departmentId: string } | null>(null);

//   // Country state
//   const [newCountry, setNewCountry] = useState('');
//   const [editingCountry, setEditingCountry] = useState<{ id: string; name: string } | null>(null);

//   // City state
//   const [newCity, setNewCity] = useState({ name: '', countryId: '' });
//   const [editingCity, setEditingCity] = useState<{ id: string; name: string; countryId: string } | null>(null);

//   // Equipment state
//   const [newEquipment, setNewEquipment] = useState('');
//   const [editingEquipment, setEditingEquipment] = useState<{ id: string; name: string } | null>(null);

//   // Working Day state
//   const [newWorkingDay, setNewWorkingDay] = useState('');
//   const [editingWorkingDay, setEditingWorkingDay] = useState<{ id: string; name: string } | null>(null);

//   // Department handlers
//   const handleAddDepartment = () => {
//     if (newDepartment.trim()) {
//       addDepartment(newDepartment);
//       setNewDepartment('');
//     }
//   };

//   const handleUpdateDepartment = () => {
//     if (editingDepartment && editingDepartment.name.trim()) {
//       updateDepartment(editingDepartment.id, editingDepartment.name);
//       setEditingDepartment(null);
//     }
//   };

//   const handleDeleteDepartment = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated roles.`)) {
//       deleteDepartment(id);
//     }
//   };

//   // Role handlers
//   const handleAddRole = () => {
//     if (newRole.name.trim() && newRole.departmentId) {
//       addRole(newRole.name, newRole.departmentId);
//       setNewRole({ name: '', departmentId: '' });
//     }
//   };

//   const handleUpdateRole = () => {
//     if (editingRole && editingRole.name.trim() && editingRole.departmentId) {
//       updateRole(editingRole.id, editingRole.name, editingRole.departmentId);
//       setEditingRole(null);
//     }
//   };

//   const handleDeleteRole = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       deleteRole(id);
//     }
//   };

//   // Country handlers
//   const handleAddCountry = () => {
//     if (newCountry.trim()) {
//       addCountry(newCountry);
//       setNewCountry('');
//     }
//   };

//   const handleUpdateCountry = () => {
//     if (editingCountry && editingCountry.name.trim()) {
//       updateCountry(editingCountry.id, editingCountry.name);
//       setEditingCountry(null);
//     }
//   };

//   const handleDeleteCountry = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated cities.`)) {
//       deleteCountry(id);
//     }
//   };

//   // City handlers
//   const handleAddCity = () => {
//     if (newCity.name.trim() && newCity.countryId) {
//       addCity(newCity.name, newCity.countryId);
//       setNewCity({ name: '', countryId: '' });
//     }
//   };

//   const handleUpdateCity = () => {
//     if (editingCity && editingCity.name.trim() && editingCity.countryId) {
//       updateCity(editingCity.id, editingCity.name, editingCity.countryId);
//       setEditingCity(null);
//     }
//   };

//   const handleDeleteCity = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       deleteCity(id);
//     }
//   };

//   // Equipment handlers
//   const handleAddEquipment = () => {
//     if (newEquipment.trim()) {
//       addEquipment(newEquipment);
//       setNewEquipment('');
//     }
//   };

//   const handleUpdateEquipment = () => {
//     if (editingEquipment && editingEquipment.name.trim()) {
//       updateEquipment(editingEquipment.id, editingEquipment.name);
//       setEditingEquipment(null);
//     }
//   };

//   const handleDeleteEquipment = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       deleteEquipment(id);
//     }
//   };

//   // Working Day handlers
//   const handleAddWorkingDay = () => {
//     if (newWorkingDay.trim()) {
//       addWorkingDay(newWorkingDay);
//       setNewWorkingDay('');
//     }
//   };

//   const handleUpdateWorkingDay = () => {
//     if (editingWorkingDay && editingWorkingDay.name.trim()) {
//       updateWorkingDay(editingWorkingDay.id, editingWorkingDay.name);
//       setEditingWorkingDay(null);
//     }
//   };

//   const handleDeleteWorkingDay = (id: string, name: string) => {
//     if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
//       deleteWorkingDay(id);
//     }
//   };

//   const sections = [
//     { id: 'departments', name: 'Departments', icon: Building2 },
//     { id: 'roles', name: 'Roles', icon: Users },
//     { id: 'countries', name: 'Countries', icon: Globe },
//     { id: 'cities', name: 'Cities', icon: MapPin },
//     { id: 'equipment', name: 'Equipment', icon: Monitor },
//     { id: 'workingDays', name: 'Working Days', icon: Calendar },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto p-6">
        
        

//         {/* Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Department Management */}
          

          

         

//           {/* City Management */}
//           {activeSection === 'cities' && (
//             <>
//               <ManagementCard
//                 title="Add City"
//                 icon={<MapPin className="w-5 h-5" />}
//               >
//                 <div className="space-y-3">
//                   <select
//                     value={newCity.countryId}
//                     onChange={(e) => setNewCity({ ...newCity, countryId: e.target.value })}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                   >
//                     <option value="">Select Country</option>
//                     {countries.map((country) => (
//                       <option key={country.id} value={country.id}>
//                         {country.name}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="City name"
//                       value={newCity.name}
//                       onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
//                       className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button
//                       onClick={handleAddCity}
//                       disabled={!newCity.countryId}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </ManagementCard>

//               <ManagementCard title="Cities List">
//                 <div className="space-y-2">
//                   {cities.map((city) => {
//                     const country = countries.find((c) => c.id === city.countryId);
//                     return (
//                       <div key={city.id}>
//                         {editingCity?.id === city.id ? (
//                           <div className="space-y-2">
//                             <select
//                               value={editingCity.countryId}
//                               onChange={(e) =>
//                                 setEditingCity({ ...editingCity, countryId: e.target.value })
//                               }
//                               className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                             >
//                               {countries.map((country) => (
//                                 <option key={country.id} value={country.id}>
//                                   {country.name}
//                                 </option>
//                               ))}
//                             </select>
//                             <div className="flex gap-2">
//                               <input
//                                 type="text"
//                                 value={editingCity.name}
//                                 onChange={(e) =>
//                                   setEditingCity({ ...editingCity, name: e.target.value })
//                                 }
//                                 className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                               <button
//                                 onClick={handleUpdateCity}
//                                 className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                               >
//                                 Save
//                               </button>
//                               <button
//                                 onClick={() => setEditingCity(null)}
//                                 className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
//                             <div>
//                               <span className="text-slate-700">{city.name}</span>
//                               <p className="text-sm text-slate-500">{country?.name}</p>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => setEditingCity(city)}
//                                 className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteCity(city.id, city.name)}
//                                 className="p-1 text-red-600 hover:bg-red-50 rounded"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </ManagementCard>
//             </>
//           )}

         

         
//         </div>
//       </div>
//     </div>
//   );
// };


