import React, { useState, useMemo } from 'react';
import { Layout, useNotification, Input } from '../components/UI';
import { UnsortedTrucksTable } from '../components/Tables';
import { useTruckData } from '../hooks';
import { ERROR_MESSAGES } from '../constants';
import type { TruckData } from '../types';
import { useNavigate } from 'react-router-dom';
import { exportToCSV } from '../utils';
import { ClipboardDocumentListIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const TrukBelumDicacahPage: React.FC = () => {
  const { unsortedTrucks, isLoading, deleteTruck } = useTruckData();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handler untuk memilih truk untuk dicacah
  const handleSelectTruck = React.useCallback((truck: TruckData) => {
    // Simpan ID truk di localStorage untuk diambil di halaman pencacahan
    localStorage.setItem('selectedTruckId', truck.id);
    navigate('/pencacahan');
  }, [navigate]);

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
      exportToCSV(unsortedTrucks, 'truk-belum-dicacah.csv');
      showNotification('success', 'Data berhasil diekspor ke CSV');
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // Error diabaikan, hanya menampilkan notifikasi
      showNotification('error', 'Gagal mengekspor data');
    }
  }, [unsortedTrucks, showNotification]);
  
  // Filter truk berdasarkan pencarian
  const filteredTrucks = useMemo(() => {
    if (!searchQuery.trim()) return unsortedTrucks;
    
    const query = searchQuery.toLowerCase();
    return unsortedTrucks.filter(truck => 
      truck.plateNumber.toLowerCase().includes(query) ||
      truck.initialWeight.toString().includes(query) ||
      truck.entryDate.toLocaleDateString('id-ID').includes(query)
    );
  }, [unsortedTrucks, searchQuery]);

  return (
    <Layout activePage="/truk-belum-dicacah">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <ClipboardDocumentListIcon className="w-8 h-8 mr-3" />
              Truk Belum Dicacah
            </h1>
            <p className="text-gray-600">
              Daftar truk yang belum dilakukan pencacahan
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <ChartBarIcon className="w-4 h-4 mr-2" />
              Export CSV
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

      {/* Tabel Data Truk yang Menunggu Pencacahan */}
      <UnsortedTrucksTable
        trucks={filteredTrucks}
        isLoading={isLoading}
        onSelectTruck={handleSelectTruck}
        onDeleteTruck={handleDeleteTruck}
        className="mb-6"
      />
      
      {/* Info hasil pencarian */}
      {searchQuery && (
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-blue-700">
            Menampilkan {filteredTrucks.length} dari {unsortedTrucks.length} truk
            {filteredTrucks.length === 0 && " (tidak ada hasil yang cocok)"}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default TrukBelumDicacahPage;