import React from 'react';
import { Layout, useNotification } from '../components/UI';
import { SortingForm } from '../components/Forms';
import { useTruckData } from '../hooks';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import { formatDate } from '../utils';
import type { TruckData } from '../types';

const PencacahanPage: React.FC = () => {
  const { isLoading, addSortingData, unsortedTrucks } = useTruckData();
  const { showNotification } = useNotification();
  
  // State untuk truk yang dipilih untuk dicacah
  const [selectedTruck, setSelectedTruck] = React.useState<TruckData | null>(null);

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

  // Handler untuk membatalkan pencacahan
  const handleCancelSorting = React.useCallback(() => {
    setSelectedTruck(null);
  }, []);


  return (
    <Layout activePage="/pencacahan">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ⚖️ Pencacahan
            </h1>
            <p className="text-gray-600">
              Input data hasil pencacahan sampah
            </p>
          </div>
        </div>
      </div>

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
            ⚖️ Pencacahan
          </h2>
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">
              Pilih truk dari halaman Truk Belum Dicacah untuk memulai pencacahan
            </p>
            <p className="text-gray-400 text-sm">
              Klik tombol "Cacah" pada tabel truk yang belum dicacah
            </p>
          </div>
        </div>
      )}

      {/* Daftar Truk yang Belum Dicacah */}
      {unsortedTrucks.length > 0 && !selectedTruck && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📋 Pilih Truk untuk Dicacah
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Polisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat Kotor (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {unsortedTrucks.map((truck) => (
                  <tr key={truck.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{truck.plateNumber}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(truck.entryDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{truck.initialWeight.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTruck(truck)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Cacah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PencacahanPage;