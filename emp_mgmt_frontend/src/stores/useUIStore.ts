import { create } from 'zustand';

// Simple UI state types
interface UIState {
  // Modal states
  isModalOpen: boolean;
  modalType: 'createEmployee' | 'createDepartment' | 'deleteConfirm' | null;
  modalData: unknown;
  
  // Sidebar state  
  isSidebarOpen: boolean;
  
  // Actions
  openModal: (type: 'createEmployee' | 'createDepartment' | 'deleteConfirm', data?: unknown) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
}

// Create UI store
export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isModalOpen: false,
  modalType: null,
  modalData: null,
  isSidebarOpen: false,
  
  // Actions
  openModal: (type, data) => set({
    isModalOpen: true,
    modalType: type,
    modalData: data
  }),
  
  closeModal: () => set({
    isModalOpen: false,
    modalType: null,
    modalData: null
  }),
  
  toggleSidebar: () => set((state) => ({
    isSidebarOpen: !state.isSidebarOpen
  })),
}));
