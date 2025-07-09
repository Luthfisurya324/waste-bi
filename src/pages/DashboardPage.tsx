import React from 'react';
import { Layout, useNotification } from '../components/UI';
import { Dashboard } from '../components/Dashboard';
import { useTruckData } from '../hooks';
import { Button } from '../components/UI';
import { UI_LABELS, ERROR_MESSAGES } from '../constants';

// Styling untuk halaman dashboard modern fullscreen
const dashboardStyles = {
  container: 'w-full px-4 sm:px-6 lg:px-8',
  header: 'bg-white rounded-lg shadow-md p-6 mb-6',
  title: 'text-3xl font-bold text-gray-800 mb-2',
  subtitle: 'text-gray-600',
  buttonContainer: 'flex gap-2',
  content: 'mb-6'
};

/**
 * Halaman Dashboard utama yang menampilkan statistik dan visualisasi data
 */
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
      <div className={dashboardStyles.header}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={dashboardStyles.title}>
              Industrial Waste Management Dashboard
            </h1>
            <p className={dashboardStyles.subtitle}>
              {UI_LABELS.APP_SUBTITLE}
            </p>
          </div>
          <div className={dashboardStyles.buttonContainer}>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearAllData}
              disabled={trucks.length === 0}
            >
              🗑️ Hapus Semua
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.print()}
            >
              📊 Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard dengan Statistik dan Visualisasi */}
      <div className={`${dashboardStyles.content} w-full`}>
        <Dashboard totalStats={totalStats} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default DashboardPage;