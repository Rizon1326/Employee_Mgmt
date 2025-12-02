import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

// Query provider wrapper for the entire app
export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*To Do: DevTools can be added later when @tanstack/react-query-devtools is installed */}
    </QueryClientProvider>
  );
};
