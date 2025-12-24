import { fetchList, updateItem, deleteItem,createItem } from "../../../api/apiClient";
import type { City,CreateCity, Country} from "../types/citySettings";

export const fetchCities = async (): Promise<City[]> => {
  return fetchList<City>("cities");
};

export const fetchCountries = async (): Promise<Country[]> => {
  return fetchList<Country>("countries");
};

export const updateCity = async (id: number, cityData: Partial<CreateCity>): Promise<CreateCity> => {
  return updateItem<CreateCity>("cities", id, cityData);
};

export const deleteCity = async (id: number): Promise<void> => {
  return deleteItem("cities", id);
};
export const createCity = async (cityData: Partial<CreateCity>): Promise<CreateCity> => {
  return createItem<CreateCity>("cities", cityData);
}