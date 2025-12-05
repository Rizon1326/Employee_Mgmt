import { StatCard, Loading, ErrorMessage, Breadcrumb } from '../components';
import { useEmployees, useDepartments } from '../hooks';

export const DashboardPage = () => {
  // Fetch all data for statistics
  const { data: employeesData, isLoading: employeesLoading, error: employeesError } = useEmployees({ 
    page_size: 1000 
  });
  const { data: departmentsData, isLoading: departmentsLoading } = useDepartments();

  const employees = employeesData?.results || [];
  const departments = departmentsData?.results || [];

  if (employeesLoading || departmentsLoading) return <Loading />;
  if (employeesError) return <ErrorMessage message="Failed to load dashboard data" />;

  // Calculate simple statistics
  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  
  const remoteEmployees = employees.filter(emp => emp.remote_work).length;
  const fullTimeEmployees = employees.filter(emp => emp.employment_type === 'full_time').length;
  
  // Recent employees (joined in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentEmployees = employees.filter(emp => 
    new Date(emp.date_joined) >= thirtyDaysAgo
  );

  // Department with most employees
  const departmentCounts = departments.map(dept => ({
    name: dept.name,
    count: employees.filter(emp => emp.department === dept.id).length
  }));
  const largestDept = departmentCounts.reduce((prev, curr) => 
    prev.count > curr.count ? prev : curr, { name: 'None', count: 0 }
  );

  return (
    <div className="p-6">
      <Breadcrumb />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Employees" 
          value={totalEmployees}
          color="blue"
        />
        <StatCard 
          title="Departments" 
          value={totalDepartments}
          color="green"
        />
        <StatCard 
          title="Remote Workers" 
          value={remoteEmployees}
          subtitle={`${totalEmployees > 0 ? Math.round((remoteEmployees / totalEmployees) * 100) : 0}% of total`}
          color="purple"
        />
        <StatCard 
          title="Full-time" 
          value={fullTimeEmployees}
          subtitle={`${totalEmployees > 0 ? Math.round((fullTimeEmployees / totalEmployees) * 100) : 0}% of total`}
          color="orange"
        />
      </div>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Department Breakdown</h2>
          <div className="space-y-3">
            {departmentCounts.map(dept => (
              <div key={dept.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{dept.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: totalEmployees > 0 ? `${(dept.count / totalEmployees) * 100}%` : '0%' 
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{dept.count}</span>
                </div>
              </div>
            ))}
          </div>
          {largestDept.name !== 'None' && (
            <p className="mt-4 text-sm text-gray-600">
              Largest: <strong>{largestDept.name}</strong> ({largestDept.count} employees)
            </p>
          )}
        </div>

        {/* Recent Employees */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Hires (Last 30 Days)</h2>
          {recentEmployees.length === 0 ? (
            <p className="text-gray-500">No recent hires</p>
          ) : (
            <div className="space-y-3">
              {recentEmployees.slice(0, 5).map(emp => (
                <div key={emp.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{emp.full_name}</p>
                    <p className="text-xs text-gray-600">{emp.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(emp.date_joined).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {recentEmployees.length > 5 && (
                <p className="text-sm text-gray-500 text-center pt-2">
                  +{recentEmployees.length - 5} more recent hires
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
