import { FormWrapper, FormField, FormSelect, FormCheckbox, Breadcrumb } from '../components';
import { useSettings } from '../hooks/useSettings';
import { useNotificationStore } from '../stores';

export const SettingsPage = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { addNotification } = useNotificationStore();

  const handleSubmit = (data: Record<string, unknown>) => {
    updateSettings({
      appName: data.appName as string,
      itemsPerPage: Number(data.itemsPerPage),
      notificationDuration: Number(data.notificationDuration),
      autoRefresh: Boolean(data.autoRefresh),
    });
    addNotification('success', 'Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
      addNotification('success', 'Settings reset to defaults!');
    }
  };

  const itemsPerPageOptions = [
    { value: 5, label: '5 items' },
    { value: 10, label: '10 items' },
    { value: 25, label: '25 items' },
    { value: 50, label: '50 items' },
  ];

  const notificationDurationOptions = [
    { value: 2000, label: '2 seconds' },
    { value: 3000, label: '3 seconds' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
  ];

  return (
    <div className="p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded-md hover:bg-red-50"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="max-w-2xl">
        <FormWrapper 
          onSubmit={handleSubmit} 
          title="Application Settings"
          defaultValues={{
            appName: settings.appName,
            itemsPerPage: settings.itemsPerPage,
            notificationDuration: settings.notificationDuration,
            autoRefresh: settings.autoRefresh,
          }}
        >
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">General</h3>
            <FormField 
              name="appName" 
              label="Application Name" 
              required 
            />
            <FormSelect 
              name="itemsPerPage" 
              label="Items Per Page" 
              options={itemsPerPageOptions}
              required
            />
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <FormSelect 
              name="notificationDuration" 
              label="Notification Duration" 
              options={notificationDurationOptions}
              required
            />
          </div>

          {/* System Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">System</h3>
            <FormCheckbox 
              name="autoRefresh" 
              label="Auto-refresh data every 30 seconds" 
            />
          </div>
        </FormWrapper>

        {/* Current Settings Display */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Current Settings</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>App Name:</strong> {settings.appName}</p>
            <p><strong>Items Per Page:</strong> {settings.itemsPerPage}</p>
            <p><strong>Notification Duration:</strong> {settings.notificationDuration / 1000}s</p>
            <p><strong>Auto Refresh:</strong> {settings.autoRefresh ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
