import { Link, useLocation } from 'react-router-dom';
import { navigationItems } from '../routes';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">EMS</h1>
        <p className="text-sm text-gray-600">Employee Management</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {navigationItems.map(item => (
            <Link
              key={item.key}
              to={item.path}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
