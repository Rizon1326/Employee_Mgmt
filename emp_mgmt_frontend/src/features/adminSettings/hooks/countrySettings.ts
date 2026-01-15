
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchCountries,createCountry,updateCountry,deleteCountry } from '../services/countrySettings.service';
import type {CreateCountry} from '../types/countrySettings';

export const useCountries =()=>{
    return useQuery({
        queryKey:['countries'],
        queryFn:fetchCountries,
    })
}

export const useCreateCountry=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(countryData:Partial<CreateCountry>)=>createCountry(countryData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['countries']});
        },
        onError:(error)=>{
            console.error('Error has been created:',error);
        }
    })
}
export const useUpdateCountry=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({id,countryData}: {id : number; countryData: Partial<CreateCountry>})=>
            updateCountry(id,countryData),
        onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['countries'] });
        },
        onError: (error) => {
        console.error('Error updating country:', error);
        },
    })
}

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteCountry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
    onError: (error) => {
      console.error('Error deleting country:', error);
    },
  });
};

