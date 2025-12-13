import { X } from 'lucide-react';
import { useState } from 'react';

const EquipmentModal = () => {
  const equipment = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Monitor' },
    { id: 3, name: 'Keyboard' },
    { id: 4, name: 'Mouse' },
    { id: 5, name: 'Headset' },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-slate-800">Equipment Needed</h2>
          <button
            onClick={() => console.log('EquipmentModal closed')}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-600 mb-4">
            Select the equipment needed for remote work:
          </p>
          <div className="space-y-3">
            {equipment.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-slate-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={() => console.log('Equipment saved:', selected)}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => console.log('EquipmentModal closed')}
            className="flex-1 px-6 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { EquipmentModal };