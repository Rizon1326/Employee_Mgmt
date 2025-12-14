import { X } from 'lucide-react';
import { useState } from 'react';
import { useEquipments } from '../hooks/useEquipments';

interface Props {
  onClose: () => void;
}

const EquipmentModal = ({ onClose }: Props) => {
  const { data, isLoading, isError } = useEquipments();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return <div className="fixed inset-0 bg-black/40 grid place-items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="fixed inset-0 bg-black/40 grid place-items-center">Error loading equipments</div>;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between p-5 border-b">
          <h2 className="font-semibold text-slate-800">Equipment Needed</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          {data?.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => {
                  toggle(item.id);
                  console.log("The selected item is: " + item.id);
                }}
              />
             
              <span>{item.name}</span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t">
          <button
            onClick={() => console.log(selected)}
            className="flex-1 bg-blue-400 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2 hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { EquipmentModal };
