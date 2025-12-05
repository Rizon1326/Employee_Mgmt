import { QueryProvider } from './hooks';
import { DepartmentListPage } from './pages';
import { Toast } from './components';

function App() {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <DepartmentListPage />
        <Toast />
      </div>
    </QueryProvider>
  );
}

export default App
