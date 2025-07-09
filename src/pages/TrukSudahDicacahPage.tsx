import React, { useState, useMemo } from 'react';
import { Layout, useNotification, Input } from '../components/UI';
import { SortedTrucksTable } from '../components/Tables';
import { useTruckData } from '../hooks';
import { ERROR_MESSAGES } from '../constants';
import { exportToCSV } from '../utils';

const TrukSudahDicacahPage: React.FC = () => {
  const { sortedTrucks, isLoading, deleteTruck } = useTruckData();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handler untuk menghapus truk
  const handleDeleteTruck = React.useCallback(async (truckId: string) => {
    try {
      const success = await deleteTruck(truckId);
      if (success) {
        showNotification('success', 'Data truk berhasil dihapus');
      }
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
    }
  }, [deleteTruck, showNotification]);
  
  // Handler untuk export data ke CSV
  const handleExportCSV = React.useCallback(() => {
    try {
      exportToCSV(sortedTrucks, 'truk-sudah-dicacah.csv');
      showNotification('success', 'Data berhasil diekspor ke CSV');
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // Error diabaikan, hanya menampilkan notifikasi
      showNotification('error', 'Gagal mengekspor data');
    }
  }, [sortedTrucks, showNotification]);
  
  // Filter truk berdasarkan pencarian
  const filteredTrucks = useMemo(() => {
    if (!searchQuery.trim()) return sortedTrucks;
    
    const query = searchQuery.toLowerCase();
    return sortedTrucks.filter(truck => 
      truck.plateNumber.toLowerCase().includes(query) ||
      truck.initialWeight.toString().includes(query) ||
      truck.organicWeight?.toString().includes(query) ||
      truck.inorganicWeight?.toString().includes(query) ||
      truck.entryDate.toLocaleDateString('id-ID').includes(query) ||
      (truck.sortingDate && truck.sortingDate.toLocaleDateString('id-ID').includes(query))
    );
  }, [sortedTrucks, searchQuery]);

  return (
    <Layout activePage="/truk-sudah-dicacah">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ✅ Truk Sudah Dicacah
            </h1>
            <p className="text-gray-600">
              Daftar truk yang sudah selesai dicacah
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <span className="mr-2">📊</span> Export CSV
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Cari berdasarkan nomor plat, berat, atau tanggal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Tabel Data Truk yang Sudah Dicacah */}
      <SortedTrucksTable
        trucks={filteredTrucks}
        isLoading={isLoading}
        onDeleteTruck={handleDeleteTruck}
      />
      
      {/* Info hasil pencarian */}
      {searchQuery && (
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-blue-700">
            Menampilkan {filteredTrucks.length} dari {sortedTrucks.length} truk
            {filteredTrucks.length === 0 && " (tidak ada hasil yang cocok)"}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default TrukSudahDicacahPage;