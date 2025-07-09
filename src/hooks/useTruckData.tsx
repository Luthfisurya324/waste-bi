import React, { useState, useCallback, useMemo } from 'react';
import type {
  TruckData,
  InitialTruckFormData,
  SortingFormData,
  TotalStats
} from '../types';
import {
  validateInitialTruckForm,
  validateSortingForm,
  formatPlateNumber,
  generateUniqueId
} from '../utils';
import { useTruckStorage } from './useLocalStorage';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_CONFIG } from '../constants';

/**
 * Custom hook untuk mengelola data truk dengan validasi dan error handling
 * Mengimplementasikan business logic untuk operasi CRUD data truk
 */
export function useTruckData() {
  // State untuk data truk dengan localStorage persistence
  const [trucks, setTrucks] = useTruckStorage<TruckData[]>([]);
  
  // State untuk loading dan error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper function untuk clear messages
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  // Function untuk menambah data truk awal
  const addInitialTruckData = useCallback(
    async (formData: InitialTruckFormData): Promise<boolean> => {
      setIsLoading(true);
      clearMessages();

      try {
        // Validasi form data
        const validation = validateInitialTruckForm(formData);
        if (!validation.isValid) {
          setError(validation.errors.join(', '));
          return false;
        }

        // Format dan sanitasi data
        const formattedPlateNumber = formatPlateNumber(formData.plateNumber);
        
        // Cek duplikasi nomor plat untuk tanggal yang sama
        const entryDate = new Date(formData.entryDate);
        const isDuplicate = trucks.some(truck => 
          truck.plateNumber === formattedPlateNumber &&
          truck.entryDate.toDateString() === entryDate.toDateString()
        );

        if (isDuplicate) {
          setError(`Truk dengan nomor plat ${formattedPlateNumber} sudah terdaftar untuk tanggal ${entryDate.toLocaleDateString('id-ID')}`);
          return false;
        }

        // Buat data truk baru
        const newTruck: TruckData = {
          id: generateUniqueId(),
          plateNumber: formattedPlateNumber,
          initialWeight: formData.initialWeight,
          entryDate,
          status: 'initial'
        };

        // Update state
        setTrucks(prevTrucks => [...prevTrucks, newTruck]);
        setSuccessMessage(SUCCESS_MESSAGES.TRUCK_ADDED);
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.SAVE_FAILED;
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [trucks, setTrucks, clearMessages]
  );

  // Function untuk menambah data pencacahan
  const addSortingData = useCallback(
    async (formData: SortingFormData): Promise<boolean> => {
      setIsLoading(true);
      clearMessages();

      try {
        // Cari truk yang akan dicacah
        const targetTruck = trucks.find(truck => truck.id === formData.truckId);
        if (!targetTruck) {
          setError('Truk tidak ditemukan');
          return false;
        }

        // Validasi form data dengan berat awal truk
        const validation = validateSortingForm(formData, targetTruck.initialWeight);
        if (!validation.isValid) {
          setError(validation.errors.join(', '));
          return false;
        }

        // Hitung data pencacahan
        let totalProcessed = 0;
        let organicWeight = 0;
        let inorganicWeight = 0;
        
        // Jika menggunakan format baru (wasteItems)
        if (formData.wasteItems && formData.wasteItems.length > 0) {
          // Hitung total dari semua kategori
          totalProcessed = formData.wasteItems.reduce((sum, item) => sum + item.weight, 0);
          
          // Untuk kompatibilitas dengan kode lama, tetap hitung organik dan anorganik
          // Cari kategori organik dan anorganik jika ada
          const organicItem = formData.wasteItems.find(item => item.categoryId === 'organic');
          const inorganicItem = formData.wasteItems.find(item => item.categoryId === 'inorganic');
          
          organicWeight = organicItem ? organicItem.weight : 0;
          inorganicWeight = inorganicItem ? inorganicItem.weight : 0;
        } 
        // Jika menggunakan format lama
        else if (formData.organicWeight !== undefined && formData.inorganicWeight !== undefined) {
          organicWeight = formData.organicWeight;
          inorganicWeight = formData.inorganicWeight;
          totalProcessed = (organicWeight ?? 0) + (inorganicWeight ?? 0);
          
          // Konversi ke format baru untuk konsistensi
          formData.wasteItems = [
            { categoryId: 'organic', weight: organicWeight },
            { categoryId: 'inorganic', weight: inorganicWeight }
          ];
        } else {
          setError('Data pencacahan tidak valid');
          return false;
        }
        
        const difference = targetTruck.initialWeight - totalProcessed;

        // Update data truk
        const updatedTrucks = trucks.map(truck => {
          if (truck.id === formData.truckId) {
            return {
              ...truck,
              wasteItems: formData.wasteItems,
              organicWeight, // Untuk kompatibilitas
              inorganicWeight, // Untuk kompatibilitas
              totalProcessed,
              difference,
              sortingDate: new Date(),
              status: 'sorted' as const
            };
          }
          return truck;
        });

        // Update state
        setTrucks(updatedTrucks);
        setSuccessMessage(SUCCESS_MESSAGES.SORTING_COMPLETED);
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.SAVE_FAILED;
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [trucks, setTrucks, clearMessages]
  );

  // Function untuk menghapus data truk
  const deleteTruck = useCallback(
    async (truckId: string): Promise<boolean> => {
      try {
        // Konfirmasi penghapusan
        const confirmMessage = 'Apakah Anda yakin ingin menghapus data truk ini? Tindakan ini tidak dapat dibatalkan.';
        if (!window.confirm(confirmMessage)) {
          return false;
        }
        
        const updatedTrucks = trucks.filter(truck => truck.id !== truckId);
        setTrucks(updatedTrucks);
        setSuccessMessage('Data truk berhasil dihapus');
        return true;
      } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
        setError('Gagal menghapus data truk');
        return false;
      }
    },
    [trucks, setTrucks]
  );

  // Function untuk clear semua data
  const clearAllData = React.useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_CONFIG.TRUCKS_KEY);
      setTrucks([]);
      setSuccessMessage('Semua data berhasil dihapus');
    } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // Error diabaikan karena tidak mempengaruhi fungsionalitas utama
      setError(ERROR_MESSAGES.GENERIC_ERROR);
    }
  }, []);

  // Computed values dengan memoization untuk performance
  const unsortedTrucks = useMemo(
    () => trucks.filter(truck => truck.status === 'initial'),
    [trucks]
  );

  const sortedTrucks = useMemo(
    () => trucks.filter(truck => truck.status === 'sorted'),
    [trucks]
  );

  // Menghitung total statistik dari data truk
  const totalStats = useMemo<TotalStats>(() => {
    const totalInitial = trucks.reduce((sum, truck) => sum + truck.initialWeight, 0);
    const totalOrganic = trucks.reduce((sum, truck) => sum + (truck.organicWeight || 0), 0);
    const totalInorganic = trucks.reduce((sum, truck) => sum + (truck.inorganicWeight || 0), 0);
    const totalProcessed = trucks.reduce((sum, truck) => sum + (truck.totalProcessed || 0), 0);

    const totalDifference = trucks.reduce((sum, truck) => {
      const truckProcessed = (truck.organicWeight || 0) + (truck.inorganicWeight || 0);
      return sum + (truck.initialWeight - truckProcessed);
    }, 0);
    
    // Hitung kategori sampah berdasarkan data real
    const wasteByCategory = new Map<string, number>();
    
    trucks.forEach(truck => {
      if (truck.wasteItems) {
        truck.wasteItems.forEach(item => {
          const currentWeight = wasteByCategory.get(item.categoryId) || 0;
          wasteByCategory.set(item.categoryId, currentWeight + item.weight);
        });
      }
    });
    
    // Konversi ke format RecyclingCategory dengan ikon
    const recyclingCategories = Array.from(wasteByCategory.entries()).map(([categoryId, weight]) => {
      const categoryName = {
        'organic': 'Organik',
        'inorganic': 'Anorganik', 
        'paper': 'Kertas',
        'plastic': 'Plastik',
        'metal': 'Logam',
        'glass': 'Kaca',
        'hazardous': 'B3',
        'residue': 'Residu',
        'textile': 'Tekstil',
        'electronic': 'Elektronik'
      }[categoryId] || categoryId;
      
      const getIcon = (id: string) => {
        const iconClass = "w-10 h-10 text-green-600";
        switch (id) {
          case 'organic':
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            );
          case 'paper':
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            );
          case 'plastic':
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            );
          case 'metal':
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            );
          case 'glass':
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            );
          default:
            return (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            );
        }
      };
      
      return {
        name: categoryName,
        value: weight,
        icon: getIcon(categoryId)
      };
    });
    
    // Hitung persentase daur ulang berdasarkan data real
    const totalRecycled = totalProcessed;
    const totalNonRecycled = totalDifference;
    
    // Data emisi CO2 berdasarkan tahun (simulasi berdasarkan data real)
    const currentYear = new Date().getFullYear();
    const co2Emissions = [
      { year: currentYear - 3, value: Math.round(totalInitial * 0.8) },
      { year: currentYear - 2, value: Math.round(totalInitial * 0.6) },
      { year: currentYear - 1, value: Math.round(totalInitial * 0.4) },
      { year: currentYear, value: Math.round(totalDifference * 0.2) }
    ];
    
    return {
      totalInitial,
      totalOrganic,
      totalInorganic,
      totalDifference,
      totalRecycled,
      totalNonRecycled,
      recyclingCategories,
      co2Emissions
    };
  }, [trucks]);

  // Return hook interface
  return {
    // Data
    trucks,
    unsortedTrucks,
    sortedTrucks,
    totalStats,
    
    // State
    isLoading,
    error,
    successMessage,
    
    // Actions
    addInitialTruckData,
    addSortingData,
    deleteTruck,
    clearAllData,
    clearMessages
  };
}