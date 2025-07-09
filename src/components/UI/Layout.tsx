import React from 'react';
import { Sidebar } from './Sidebar';
import { CheckIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

type LayoutProps = {
  children: React.ReactNode;
  activePage: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, activePage }) => {
  // State untuk notifikasi (akan dipindahkan dari App.tsx)
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Fungsi untuk menampilkan notifikasi (akan digunakan oleh halaman-halaman)
  const _showNotification = React.useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar activePage={activePage} />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'success' ? '✓' :
                notification.type === 'error' ? '✗' : 'ℹ'}
              </span>
              {notification.message}
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

// Context untuk notifikasi
export const NotificationContext = React.createContext<{
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}>({ 
  showNotification: () => {} 
});

// Provider untuk notifikasi
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showNotification = React.useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? 
                <CheckIcon className="w-5 h-5" /> :
              notification.type === 'error' ? 
                <XMarkIcon className="w-5 h-5" /> : 
                <InformationCircleIcon className="w-5 h-5" />}
            </span>
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Hook untuk menggunakan notifikasi
export const useNotification = () => {
  return React.useContext(NotificationContext);
};

export default Layout;