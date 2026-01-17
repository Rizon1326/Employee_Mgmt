import { fetchList,updateItem,deleteItem,createItem } from "../../../api/apiClient";
import type { Department,CreateDepartment } from "../types/departmentSettings";


export const fetchDepartment=async():Promise<Department[]> =>{
    return fetchList<Department>("departments");
}

export const updateDepartment =async(id:number,departmentData:Partial<CreateDepartment>)=>{
    return updateItem<Department>("departments",id,departmentData)
}
export const createDepartment=async(departmentData:Partial<CreateDepartment>)=>{
    return createItem("departments",departmentData)
    
}

export const deleteDepartment = async(id:number)=>{
    return deleteItem("departments",id)
}