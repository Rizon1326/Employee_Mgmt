// Simple route configuration
export const routes = {
  dashboard: '/',
  departments: '/departments',
  employees: '/employees', 
  settings: '/settings',
} as const;

// Route labels for navigation
export const routeLabels = {
  [routes.dashboard]: 'Dashboard',
  [routes.departments]: 'Departments',
  [routes.employees]: 'Employees',
  [routes.settings]: 'Settings',
} as const;

// Navigation items with icons
export const navigationItems = [
  { path: routes.dashboard, label: '📊 Dashboard', key: 'dashboard' },
  { path: routes.departments, label: '🏢 Departments', key: 'departments' },
  { path: routes.employees, label: '👥 Employees', key: 'employees' },
  { path: routes.settings, label: '⚙️ Settings', key: 'settings' },
] as const;
