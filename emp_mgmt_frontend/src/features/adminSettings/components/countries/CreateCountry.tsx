import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateCountry } from "../../hooks/countrySettings";
const CreateCountry = () => {
  const [countryName, setCountryName] = useState("");
  const createCountryMutation = useCreateCountry();

  const handleCreateCountry = async () => {
    if (!countryName.trim()) {
      alert("Please enter the country name");
      return;
    }
    try {
      await createCountryMutation.mutateAsync({
        name: countryName.trim(),
      });
      setCountryName("");
    } catch (error) {
      console.error("Failed to create country:", error);
      alert("Failed to create country . Please try again");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Country name"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateCountry}
          disabled={createCountryMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {createCountryMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}{" "}
        </button>
      </div>
    </div>
  );
};
export default CreateCountry;
