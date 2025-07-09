import React from 'react';
import { Layout, useNotification } from '../components/UI';
import { Dashboard } from '../components/Dashboard';
import { useTruckData } from '../hooks';
import { Button } from '../components/UI';
import { UI_LABELS, ERROR_MESSAGES } from '../constants';

const DashboardPage: React.FC = () => {
  const { totalStats, isLoading, clearAllData, trucks } = useTruckData();
  const { showNotification } = useNotification();

  // Handler untuk menghapus semua data
  const handleClearAllData = React.useCallback(async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await clearAllData();
        showNotification('success', 'Semua data berhasil dihapus');
      } catch (error) {
        showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      }
    }
  }, [clearAllData, showNotification]);

  return (
    <Layout activePage="/">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📊 Dashboard
            </h1>
            <p className="text-gray-600">
              {UI_LABELS.APP_SUBTITLE}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearAllData}
              disabled={trucks.length === 0}
            >
              🗑️ Hapus Semua
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard dengan Statistik */}
      <Dashboard totalStats={totalStats} isLoading={isLoading} />
    </Layout>
  );
};

export default DashboardPage;