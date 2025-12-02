import { create } from 'zustand';

// Simple notification type
interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface NotificationState {
  notifications: Notification[];
  
  // Actions
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// Create notification store
export const useNotificationStore = create<NotificationState>((set, get) => ({
  // Initial state
  notifications: [],
  
  // Actions
  addNotification: (type, message) => {
    const id = Date.now().toString();
    const notification: Notification = { id, type, message };
    
    set((state) => ({
      notifications: [...state.notifications, notification]
    }));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearAll: () => set({ notifications: [] }),
}));
