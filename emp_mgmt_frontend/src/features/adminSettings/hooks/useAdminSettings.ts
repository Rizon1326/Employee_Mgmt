import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {fetchCities, fetchCountries, updateCity, deleteCity} from '../services/adminSettings.service';
import type { City } from '../types/adminSettings';

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};

export const useUpdateCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, cityData }: { id: number; cityData: Partial<City> }) =>
      updateCity(id, cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error updating city:', error);
    },
  });
};

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error deleting city:', error);
    },
  });
};
