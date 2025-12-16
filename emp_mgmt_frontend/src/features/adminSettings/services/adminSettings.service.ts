import { fetchList, updateItem, deleteItem,createItem } from "../../../api/apiClient";
import type { City, Country} from "../types/adminSettings";

export const fetchCities = async (): Promise<City[]> => {
  return fetchList<City>("cities");
};

export const fetchCountries = async (): Promise<Country[]> => {
  return fetchList<Country>("countries");
};

export const updateCity = async (id: number, cityData: Partial<City>): Promise<City> => {
  return updateItem<City>("cities", id, cityData);
};

export const deleteCity = async (id: number): Promise<void> => {
  return deleteItem("cities", id);
};
export const createCity = async (cityData: Partial<City>): Promise<City> => {
  return createItem<City>("cities", cityData);
}