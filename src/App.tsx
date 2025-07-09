import React from 'react';
import './App.css';

// Import types
import type { TruckData } from './types';

// Import hooks
import { useTruckData } from './hooks';

// Import components
import {
  Dashboard,
  InitialTruckForm,
  SortingForm,
  UnsortedTrucksTable,
  SortedTrucksTable,
  Button
} from './components';

// Import constants
import { UI_LABELS, SUCCESS_MESSAGES, ERROR_MESSAGES } from './constants';

function App() {
  // Menggunakan custom hook untuk mengelola data truk
  const {
    trucks,
    unsortedTrucks,
    sortedTrucks,
    totalStats,
    isLoading,
    addInitialTruckData,
    addSortingData,
    deleteTruck,
    clearAllData
  } = useTruckData();
  
  // State untuk truk yang dipilih untuk dicacah
  const [selectedTruck, setSelectedTruck] = React.useState<TruckData | null>(null);
  
  // State untuk menampilkan notifikasi
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Fungsi untuk menampilkan notifikasi
  const showNotification = React.useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Handler untuk form data awal truk
  const handleInitialTruckSubmit = React.useCallback(async (formData: any): Promise<boolean> => {
    try {
      await addInitialTruckData(formData);
      showNotification('success', SUCCESS_MESSAGES.TRUCK_ADDED);
      return true;
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      return false;
    }
  }, [addInitialTruckData, showNotification]);

  // Handler untuk form pencacahan
  const handleSortingSubmit = React.useCallback(async (formData: any): Promise<boolean> => {
    if (!selectedTruck) {
      showNotification('error', 'Pilih truk terlebih dahulu');
      return false;
    }

    try {
      await addSortingData(formData);
      setSelectedTruck(null);
      showNotification('success', SUCCESS_MESSAGES.SORTING_COMPLETED);
      return true;
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      return false;
    }
  }, [selectedTruck, addSortingData, showNotification]);

  // Handler untuk memilih truk untuk dicacah
  const handleSelectTruck = React.useCallback((truck: TruckData) => {
    setSelectedTruck(truck);
  }, []);

  // Handler untuk membatalkan pencacahan
  const handleCancelSorting = React.useCallback(() => {
    setSelectedTruck(null);
  }, []);

  // Handler untuk menghapus truk
  const handleDeleteTruck = React.useCallback(async (truckId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data truk ini?')) {
      try {
        await deleteTruck(truckId);
        showNotification('success', 'Data truk berhasil dihapus');
      } catch (error) {
        showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      }
    }
  }, [deleteTruck, showNotification]);

  // Handler untuk menghapus semua data
  const handleClearAllData = React.useCallback(async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await clearAllData();
        setSelectedTruck(null);
        showNotification('success', 'Semua data berhasil dihapus');
      } catch (error) {
        showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      }
    }
  }, [clearAllData, showNotification]);

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🚛 {UI_LABELS.APP_TITLE}
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

        {/* Form Input Data Awal Truk */}
        <InitialTruckForm
          onSubmit={handleInitialTruckSubmit}
          isLoading={isLoading}
        />

        {/* Form Input Data Pencacahan */}
        {selectedTruck ? (
          <SortingForm
            selectedTruck={selectedTruck}
            onSubmit={handleSortingSubmit}
            onCancel={handleCancelSorting}
            isLoading={isLoading}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ⚖️ {UI_LABELS.SORTING_FORM_TITLE}
            </h2>
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">
                Pilih truk dari tabel di bawah untuk memulai pencacahan
              </p>
              <p className="text-gray-400 text-sm">
                Klik tombol "Cacah" pada tabel truk yang belum dicacah
              </p>
            </div>
          </div>
        )}

        {/* Dashboard dengan Statistik */}
        <Dashboard totalStats={totalStats} isLoading={isLoading} />

        {/* Tabel Data Truk yang Menunggu Pencacahan */}
        <UnsortedTrucksTable
          trucks={unsortedTrucks}
          isLoading={isLoading}
          onSelectTruck={handleSelectTruck}
          onDeleteTruck={handleDeleteTruck}
          className="mb-6"
        />

        {/* Tabel Data Truk yang Sudah Dicacah */}
        <SortedTrucksTable
          trucks={sortedTrucks}
          isLoading={isLoading}
          onDeleteTruck={handleDeleteTruck}
        /></div>
    </div>
  );
}

export default App;
