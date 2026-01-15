import { useState } from "react";
import {
  Edit2,
  Trash2,
} from "lucide-react";
import { 
  useCountries, 
  useUpdateCountry, 
  useDeleteCountry 
} from "../../hooks/countrySettings";

export const CountryList = () => {
  const {
    data: countryData,
    isError: isCountryError,
    isLoading: isCountryLoading
  } = useCountries();

  const updateCountryMutation = useUpdateCountry();
  const deleteCountryMutation = useDeleteCountry();

  const countries = countryData || [];

  const [editingCountry, setEditingCountry] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleUpdateCountry = async () => {
    if (editingCountry && editingCountry.name.trim()) {
      try {
        await updateCountryMutation.mutateAsync({
          id: editingCountry.id,
          countryData: {
            name: editingCountry.name,
          },
        });
        setEditingCountry(null);
      } catch (error) {
        console.error("Failed to update country:", error);
      }
    }
  };

  const handleDeleteCountry = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCountryMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete country:", error);
      }
    }
  };

  if (isCountryLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isCountryError) {
    return <div className="p-4 text-red-600">Error loading data</div>;
  }

  return (
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
                disabled={updateCountryMutation.isPending}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateCountryMutation.isPending ? "Saving..." : "Save"}
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
                  onClick={() =>
                    setEditingCountry({
                      id: country.id,
                      name: country.name,
                    })
                  }
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCountry(country.id, country.name)}
                  disabled={deleteCountryMutation.isPending}
                  className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
