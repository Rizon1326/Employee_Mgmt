import { Link, useLocation } from 'react-router-dom';
import { routes, routeLabels } from '../routes';

export const Breadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Always show Dashboard as root
  const isDashboard = currentPath === routes.dashboard;
  const currentLabel = routeLabels[currentPath as keyof typeof routeLabels];

  if (isDashboard) {
    return (
      <div className="text-sm text-gray-600 mb-4">
        <span className="font-medium text-gray-900">Dashboard</span>
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-600 mb-4">
      <Link 
        to={routes.dashboard}
        className="hover:text-gray-900"
      >
        Dashboard
      </Link>
      <span className="mx-2">{'>'}</span>
      <span className="font-medium text-gray-900">{currentLabel}</span>
    </div>
  );
};
