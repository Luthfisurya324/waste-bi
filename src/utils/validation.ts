import type { InitialTruckFormData, SortingFormData, ValidationResult } from '../types';

/**
 * Validasi data form input truk awal
 * @param data - Data form yang akan divalidasi
 * @returns Hasil validasi dengan status dan daftar error
 */
export const validateInitialTruckForm = (data: InitialTruckFormData): ValidationResult => {
  const errors: string[] = [];

  // Validasi nomor plat
  if (!data.plateNumber.trim()) {
    errors.push('Nomor plat tidak boleh kosong');
  } else if (data.plateNumber.trim().length < 3) {
    errors.push('Nomor plat minimal 3 karakter');
  } else if (!validateIndonesianPlateNumber(data.plateNumber)) {
    errors.push('Format nomor plat tidak valid (contoh: B 1234 ABC)');
  }

  // Validasi berat awal
  if (!data.initialWeight || data.initialWeight <= 0) {
    errors.push('Berat awal harus lebih dari 0 kg');
  } else if (data.initialWeight > 50000) {
    errors.push('Berat awal tidak boleh lebih dari 50,000 kg');
  }

  // Validasi tanggal
  if (!data.entryDate) {
    errors.push('Tanggal masuk tidak boleh kosong');
  } else {
    const entryDate = new Date(data.entryDate);
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    if (entryDate > today) {
      errors.push('Tanggal masuk tidak boleh di masa depan');
    } else if (entryDate < oneYearAgo) {
      errors.push('Tanggal masuk tidak boleh lebih dari 1 tahun yang lalu');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validasi data form pencacahan
 * @param data - Data form pencacahan yang akan divalidasi
 * @param initialWeight - Berat awal truk untuk validasi
 * @returns Hasil validasi dengan status dan daftar error
 */
export const validateSortingForm = (data: SortingFormData, initialWeight: number): ValidationResult => {
  const errors: string[] = [];

  // Validasi truk ID
  if (!data.truckId) {
    errors.push('Mohon pilih truk yang akan dicacah');
  }

  // Hitung total berat dari semua kategori sampah
  let totalProcessed = 0;
  
  // Jika menggunakan format baru (wasteItems)
  if (data.wasteItems && data.wasteItems.length > 0) {
    // Validasi setiap item kategori sampah
    for (const item of data.wasteItems) {
      if (item.weight < 0) {
        errors.push(`Berat sampah tidak boleh negatif`);
        break;
      }
      totalProcessed += item.weight;
    }
    
    // Validasi minimal ada satu kategori sampah yang dicacah
    if (data.wasteItems.length === 0) {
      errors.push('Minimal harus ada satu kategori sampah yang dicacah');
    }
  } 
  // Jika menggunakan format lama (organicWeight dan inorganicWeight)
  else if (data.organicWeight !== undefined && data.inorganicWeight !== undefined) {
    // Validasi berat organik
    if (data.organicWeight < 0) {
      errors.push('Berat sampah organik tidak boleh negatif');
    }

    // Validasi berat anorganik
    if (data.inorganicWeight < 0) {
      errors.push('Berat sampah anorganik tidak boleh negatif');
    }

    totalProcessed = data.organicWeight + data.inorganicWeight;
  } 
  // Jika tidak ada data yang valid
  else {
    errors.push('Data pencacahan tidak valid');
  }

  // Validasi total berat tidak melebihi berat awal + toleransi 5%
  const maxAllowed = initialWeight * 1.05; // Toleransi 5%
  
  if (totalProcessed > maxAllowed) {
    errors.push(`Total berat cacah (${totalProcessed.toLocaleString()} kg) melebihi berat awal + toleransi 5% (${maxAllowed.toLocaleString()} kg)`);
  }

  // Validasi minimal ada sampah yang dicacah
  if (totalProcessed === 0) {
    errors.push('Minimal harus ada sampah yang dicacah');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validasi nomor plat kendaraan Indonesia
 * @param plateNumber - Nomor plat yang akan divalidasi
 * @returns True jika format valid
 */
export const validateIndonesianPlateNumber = (plateNumber: string): boolean => {
  // Format umum: B 1234 ABC atau B 1234 AB
  const plateRegex = /^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/i;
  return plateRegex.test(plateNumber.trim());
};

/**
 * Sanitasi input string untuk mencegah XSS
 * @param input - String yang akan disanitasi
 * @returns String yang sudah disanitasi
 */
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"'&]/g, (match) => {
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[match] || match;
    });
};