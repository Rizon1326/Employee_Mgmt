export type Department ={
    id: number;
    name: string;
}
export type Role={
    id: number;
    name: string;
    department: Department;
}

export type Country = {
    id: number;
    name: string;
}
export type City = {
    id: number;
    name: string;
    country: Country;
}
export type Equipment = {
    id: number;
    name: string;
}
export type WorkDay = {
    id: number;
    name: string;
}

export type Employee = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    date_joined: string;

    department: Department;
    role: Role;
    country: Country;
    city: City;
    equipment_needed: Equipment[];
    work_days: WorkDay[];

    remote_work: boolean;
    office_work: boolean;
    employment_type: 'part_time' | 'full_time' | 'contract';
    can_view_projects: boolean;
    can_edit_projects: boolean;
    can_delete_projects: boolean;
    can_manage_employees: boolean;
    can_approve_budget: boolean;
}