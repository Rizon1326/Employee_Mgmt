export const EmploymentType ={
  FULL_TIME : 'full_time',
  PART_TIME : 'part_time', 
  CONTRACT : 'contract',
} as const;

export type EmploymentType = typeof EmploymentType[keyof typeof EmploymentType];

export const EmploymentTypeLabels = {
  [EmploymentType.FULL_TIME]: 'Full-time',
  [EmploymentType.PART_TIME]: 'Part-time',
  [EmploymentType.CONTRACT]: 'Contract',
} as const;
