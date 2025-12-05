interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export const StatCard = ({ title, value, subtitle, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]}`}>
      <h3 className="text-sm font-medium opacity-75">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {subtitle && (
        <p className="text-sm mt-1 opacity-75">{subtitle}</p>
      )}
    </div>
  );
};
