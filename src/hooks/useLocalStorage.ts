import { useState, useEffect, useCallback } from 'react';
import { STORAGE_CONFIG } from '../constants';

/**
 * Custom hook untuk mengelola data di localStorage dengan type safety
 * @param key - Key untuk localStorage
 * @param initialValue - Nilai awal jika tidak ada data di localStorage
 * @returns Array berisi [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Ambil data dari localStorage
      const item = window.localStorage.getItem(key);
      
      // Parse JSON atau return initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika error parsing, log error dan return initial value
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function untuk set value ke localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function untuk update berdasarkan previous value
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // Log error jika gagal save
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Function untuk remove value dari localStorage
  const removeValue = useCallback(() => {
    try {
      // Remove from localStorage
      window.localStorage.removeItem(key);
      
      // Reset state ke initial value
      setStoredValue(initialValue);
    } catch (error) {
      // Log error jika gagal remove
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook khusus untuk menyimpan data truk dengan versioning
 * @param initialValue - Nilai awal untuk data truk
 * @returns Array berisi [trucks, setTrucks, clearTrucks]
 */
export function useTruckStorage<T>(initialValue: T) {
  const [trucks, setTrucks, clearTrucks] = useLocalStorage(
    STORAGE_CONFIG.TRUCKS_KEY,
    initialValue
  );

  // Effect untuk migration data jika diperlukan
  useEffect(() => {
    const versionKey = `${STORAGE_CONFIG.TRUCKS_KEY}_version`;
    const currentVersion = localStorage.getItem(versionKey);
    
    if (currentVersion !== STORAGE_CONFIG.DATA_VERSION) {
      // Perform data migration if needed
      console.log('Data migration might be needed');
      localStorage.setItem(versionKey, STORAGE_CONFIG.DATA_VERSION);
    }
  }, []);

  return [trucks, setTrucks, clearTrucks] as const;
}

/**
 * Hook untuk menyimpan pengaturan aplikasi
 * @returns Object dengan methods untuk mengelola settings
 */
export function useAppSettings() {
  const [settings, setSettings] = useLocalStorage(STORAGE_CONFIG.SETTINGS_KEY, {
    theme: 'light',
    language: 'id',
    autoSave: true,
    notifications: true
  });

  type SettingValue = string | boolean | number;

  const updateSetting = useCallback(
    (key: string, value: SettingValue) => {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    },
    [setSettings]
  );

  const resetSettings = useCallback(() => {
    setSettings({
      theme: 'light',
      language: 'id',
      autoSave: true,
      notifications: true
    });
  }, [setSettings]);

  return {
    settings,
    updateSetting,
    resetSettings
  };
}