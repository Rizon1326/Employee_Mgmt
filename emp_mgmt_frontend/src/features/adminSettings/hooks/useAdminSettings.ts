import { useQuery } from '@tanstack/react-query';

import {fetchCities,fetchCountries} from '../services/adminSettings.service';

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });
}
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,});
}
