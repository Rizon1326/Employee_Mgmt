import { useState } from 'react';

interface AppSettings {
  appName: string;
  itemsPerPage: number;
  notificationDuration: number;
  autoRefresh: boolean;
}

const defaultSettings: AppSettings = {
  appName: 'Employee Management System',
  itemsPerPage: 10,
  notificationDuration: 3000,
  autoRefresh: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Initialize from localStorage on mount
    const saved = localStorage.getItem('app-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed };
      } catch (error) {
        console.warn('Failed to parse saved settings:', error);
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('app-settings', JSON.stringify(updated));
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('app-settings');
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};
