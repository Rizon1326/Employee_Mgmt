import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from "lucide-react";
import {
  useCities,
  useCountries,
  useUpdateCity,
  useDeleteCity,
} from "../../hooks/useAdminSettings";

export const CityList = () => {
  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
  } = useCountries();
  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
  } = useCities();

  const updateCityMutation = useUpdateCity();
  const deleteCityMutation = useDeleteCity();

  const countries = countryData || [];
  const cities = cityData || [];

  const [editingCity, setEditingCity] = useState<{
    id: number;
    name: string;
    country: number | null;
  } | null>(null);

  const handleUpdateCity = async () => {
    if (editingCity && editingCity.name.trim() && editingCity.country) {
      try {
        await updateCityMutation.mutateAsync({
          id: editingCity.id,
          cityData: {
            name: editingCity.name,
            country: {
              id: editingCity.country,
              name:
                countries.find((c) => c.id === editingCity.country)?.name || "",
            },
          },
        });
        setEditingCity(null);
      } catch (error) {
        console.error("Failed to update city:", error);
      }
    }
  };

  const handleDeleteCity = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCityMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete city:", error);
      }
    }
  };

  if (isCountryLoading || isCityLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isCountryError || isCityError) {
    return <div className="p-4 text-red-600">Error loading data</div>;
  }

  return (
    <>
      <div className="space-y-2">
        {cities.map((city) => {
          return (
            <div key={city.id}>
              {editingCity?.id === city.id ? (
                <div className="space-y-2">
                  <div className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <span className="text-slate-500">
                      {
                        countries.find(
                          (country) => country.id === editingCity.country
                        )?.name
                      }
                    </span>
                  </div>

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
                      disabled={updateCityMutation.isPending}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateCityMutation.isPending ? "Saving..." : "Save"}
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
                    <p className="text-sm text-slate-500">
                      {city.country?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditingCity({
                          id: city.id,
                          name: city.name,
                          country: city.country?.id || 0,
                        })
                      }
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCity(city.id, city.name)}
                      disabled={deleteCityMutation.isPending}
                      className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
    </>
  );
};
