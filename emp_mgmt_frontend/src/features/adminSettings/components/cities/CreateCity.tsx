import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useCountries, useCreateCity } from "../../hooks/useAdminSettings";
import type { Country } from "../../types/adminSettings";
import { Plus } from "lucide-react";
export const CreateCity = () => {
  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
  } = useCountries();
  
  const createCityMutation = useCreateCity();
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cityName, setCityName] = useState("");

  const handleCreateCity = async () => {
    if (!selectedCountry || !cityName.trim()) {
      alert("Please select a country and enter a city name");
      return;
    }

    try {
      await createCityMutation.mutateAsync({
        name: cityName.trim(),
        country_id: parseInt(selectedCountry)
      });
      
      setCityName("");
      setSelectedCountry("");
    } catch (error) {
      console.error("Failed to create city:", error);
      alert("Failed to create city. Please try again.");
    }
  };
  
  return (
    <div className="space-y-3">
      <select
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {!isCountryLoading &&
          !isCountryError &&
          countryData?.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
      </select>
      <div className="flex gap-2">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="City name"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateCity}
          disabled={createCityMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {createCityMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
