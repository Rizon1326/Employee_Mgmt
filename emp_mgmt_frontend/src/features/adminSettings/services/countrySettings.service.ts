import { fetchList,updateItem,createItem,deleteItem } from "../../../api/apiClient";
import type { Country, CreateCountry } from "../types/countrySettings";

export const fetchCountries = async ():Promise<Country[]> =>{
   return fetchList<Country>("countries");
}

export const createCountry = async (countryData: Partial<CreateCountry>): Promise<CreateCountry> => {
  return createItem<CreateCountry>("countries", countryData);
}


export const updateCountry = async (id: number, countryData: Partial<CreateCountry>): Promise<CreateCountry> => {
  return updateItem<CreateCountry>("countries", id, countryData);
};

export const deleteCountry = async (id:number):Promise<void>=>{
    return deleteItem("countries",id);
}

