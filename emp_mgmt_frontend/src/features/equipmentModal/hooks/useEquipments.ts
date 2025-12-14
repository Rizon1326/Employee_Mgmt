import { useQuery } from '@tanstack/react-query';
import {fetchEquipments} from '../services/equipment.service';

export const useEquipments = () => {
  return useQuery({
    queryKey: ['equipments'],
    queryFn: fetchEquipments,
  });
};
