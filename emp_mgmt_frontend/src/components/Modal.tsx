import type { ReactNode } from 'react';
import { useUIStore } from '../stores';
import { Button } from './Button';

interface ModalProps {
  children: ReactNode;
  title?: string;
}

export const Modal = ({ children, title }: ModalProps) => {
  const { isModalOpen, closeModal } = useUIStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title || 'Modal'}</h2>
          <Button 
            variant="secondary" 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
