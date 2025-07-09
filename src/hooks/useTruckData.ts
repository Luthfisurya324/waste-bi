import { useState, useCallback, useMemo } from 'react';
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
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

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
        const totalProcessed = formData.organicWeight + formData.inorganicWeight;
        const difference = targetTruck.initialWeight - totalProcessed;

        // Update data truk
        const updatedTrucks = trucks.map(truck => {
          if (truck.id === formData.truckId) {
            return {
              ...truck,
              organicWeight: formData.organicWeight,
              inorganicWeight: formData.inorganicWeight,
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
    (truckId: string): boolean => {
      try {
        const updatedTrucks = trucks.filter(truck => truck.id !== truckId);
        setTrucks(updatedTrucks);
        setSuccessMessage('Data truk berhasil dihapus');
        return true;
      } catch (err) {
        setError('Gagal menghapus data truk');
        return false;
      }
    },
    [trucks, setTrucks]
  );

  // Function untuk clear semua data
  const clearAllData = useCallback(() => {
    setTrucks([]);
    clearMessages();
    setSuccessMessage('Semua data berhasil dihapus');
  }, [setTrucks, clearMessages]);

  // Computed values dengan memoization untuk performance
  const unsortedTrucks = useMemo(
    () => trucks.filter(truck => truck.status === 'initial'),
    [trucks]
  );

  const sortedTrucks = useMemo(
    () => trucks.filter(truck => truck.status === 'sorted'),
    [trucks]
  );

  const totalStats = useMemo((): TotalStats => {
    return trucks.reduce(
      (acc, truck) => ({
        totalInitial: acc.totalInitial + truck.initialWeight,
        totalOrganic: acc.totalOrganic + (truck.organicWeight || 0),
        totalInorganic: acc.totalInorganic + (truck.inorganicWeight || 0),
        totalDifference: acc.totalDifference + (truck.difference || 0)
      }),
      { totalInitial: 0, totalOrganic: 0, totalInorganic: 0, totalDifference: 0 }
    );
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