import type { Equipment } from '../types/equipment.ts';

const BASE_URL = 'http://localhost:8000/api';

export const fetchEquipments = async (): Promise<Equipment[]> => {
  const res = await fetch(`${BASE_URL}/equipment/`);

  if (!res.ok) {
    throw new Error('Failed to fetch equipments');
  }

  return res.json();
};
