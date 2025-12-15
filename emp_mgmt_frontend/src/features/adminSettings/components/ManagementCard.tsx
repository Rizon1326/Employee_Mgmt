import type { ManagementCardProps } from "../types/managementCard";

const ManagementCard = ({ title, icon, children }: ManagementCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h2 className="text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );
};
export default ManagementCard;