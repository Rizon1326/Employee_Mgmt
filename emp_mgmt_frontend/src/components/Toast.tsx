import { useNotificationStore } from '../stores';

export const Toast = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-lg max-w-sm ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : notification.type === 'error'
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-blue-100 border border-blue-400 text-blue-700'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
