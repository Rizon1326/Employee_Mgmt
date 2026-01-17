import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDepartment, deleteDepartment, fetchDepartment, updateDepartment } from "../services/departmentSettings.service";
import type { CreateDepartment } from "../types/departmentSettings";

export const useDepartment=()=>{
    return useQuery({
        queryKey:['departments'],
        queryFn:fetchDepartment,
    })
}

export const useCreateCountry=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(departmentData:Partial<CreateDepartment>)=>createDepartment(departmentData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['departments']});
        },
        onError:(error)=>{
            console.error('Error has been created:',error);
        }
    })
}

export const useUpdateDepartment=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({id,departmentData}: {id : number; departmentData: Partial<CreateDepartment>})=>
            updateDepartment(id,departmentData),
        onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
        onError: (error) => {
        console.error('Error updating department:', error);
        },
    })
}

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: (error) => {
      console.error('Error deleting department:', error);
    },
  });
};