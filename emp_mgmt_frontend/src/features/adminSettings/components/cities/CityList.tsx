import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import ManagementCard from '../ManagementCard';
export const CityList = () => {
    //   const navigate = useNavigate();

    // Using local mock data and handlers instead of external context

    type CountryT = { id: string; name: string };
    type CityT = { id: string; name: string; countryId: string };




    const [countries] = useState<CountryT[]>([
        { id: 'c1', name: 'United States' },
        { id: 'c2', name: 'India' },
    ]);

    const [cities, setCities] = useState<CityT[]>([
        { id: 'ci1', name: 'New York', countryId: 'c1' },
        { id: 'ci2', name: 'Bengaluru', countryId: 'c2' },
    ]);

    // City handlers
    const updateCity = (id: string, name: string, countryId: string) =>
        setCities((s) => s.map((c) => (c.id === id ? { ...c, name, countryId } : c)));
    const deleteCity = (id: string) => setCities((s) => s.filter((c) => c.id !== id));



    // City state
    const [editingCity, setEditingCity] = useState<{ id: string; name: string; countryId: string } | null>(null);

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

    const isActiveSection = true;

    return (



        <>
            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isActiveSection && (
                    <>

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
            </div>
        </>

    );
};


