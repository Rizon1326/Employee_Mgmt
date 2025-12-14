import { useState } from 'react';
import { EquipmentModal } from '../features/equipmentModal/components/EquipmentModal';
const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Equipment Modal
      </button>

      {open && <EquipmentModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Home;
