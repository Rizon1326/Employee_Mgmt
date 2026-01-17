import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import {
  useDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from "../../hooks/departmentSettings";
export const DepartmentList = () => {
  const { data: departmentData } = useDepartment();
  const departments = departmentData || [];
  const [editingDepartment, setEditingDepartment] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const updateDepartmentMutation = useUpdateDepartment();
  const deleteDepartmentMutation = useDeleteDepartment();
  const handleUpdateDepartment = async () => {
    if (editingDepartment && editingDepartment.name.trim()) {
      try {
        await updateDepartmentMutation.mutateAsync({
          id: editingDepartment.id,
          departmentData: {
            name: editingDepartment.name,
          },
        });
        setEditingDepartment(null);
      } catch (error) {
        console.error("Failed to update department:", error);
      }
    }
  };

  const handleDeleteDepartment = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteDepartmentMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete department:", error);
      }
    }
  };

  return (
    <div className="space-y-2">
      {departments.map((department) => (
        <div key={department.id}>
          {editingDepartment?.id === department.id ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editingDepartment.name}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    name: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdateDepartment}
                disabled={updateDepartmentMutation.isPending}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateDepartmentMutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditingDepartment(null)}
                className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">{department.name}</span>
              <div className="flex gap-2">
                <button
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                  onClick={() =>
                    setEditingDepartment({
                      id: department.id,
                      name: department.name,
                    })
                  }
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  onClick={() => handleDeleteDepartment(department.id, department.name) }>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
