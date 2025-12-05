import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './hooks';
import { DashboardPage, DepartmentListPage, EmployeeListPage, SettingsPage } from './pages';
import { Toast, Sidebar } from './components';

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/departments" element={<DepartmentListPage />} />
              <Route path="/employees" element={<EmployeeListPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Redirect unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          <Toast />
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App
