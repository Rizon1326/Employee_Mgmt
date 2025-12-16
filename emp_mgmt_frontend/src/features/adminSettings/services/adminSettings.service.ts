import fetchList from "../../../api/apiClient";

import type { City, Country } from "../types/adminSettings";

export const fetchCities = async (): Promise<City[]> => {
  return fetchList<City>("cities");
};
export const fetchCountries = async (): Promise<Country[]> => {
  return fetchList<Country>("countries");
};