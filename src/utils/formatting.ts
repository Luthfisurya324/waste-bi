/**
 * Utility functions untuk formatting data dan tampilan
 */

/**
 * Format angka dengan pemisah ribuan untuk tampilan yang lebih mudah dibaca
 * @param value - Angka yang akan diformat
 * @param locale - Locale untuk formatting (default: 'id-ID')
 * @returns String angka yang sudah diformat
 */
export const formatNumber = (value: number, locale: string = 'id-ID'): string => {
  return value.toLocaleString(locale);
};

/**
 * Format tanggal untuk tampilan Indonesia
 * @param date - Date object yang akan diformat
 * @param options - Opsi formatting tanggal
 * @returns String tanggal yang sudah diformat
 */
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  return date.toLocaleDateString('id-ID', options);
};

/**
 * Format tanggal untuk input HTML date
 * @param date - Date object yang akan diformat
 * @returns String dalam format YYYY-MM-DD
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Format berat dengan satuan kg
 * @param weight - Berat dalam kg
 * @param showUnit - Apakah menampilkan satuan 'kg' (default: true)
 * @returns String berat yang sudah diformat
 */
export const formatWeight = (weight: number, showUnit: boolean = true): string => {
  const formattedNumber = formatNumber(weight);
  return showUnit ? `${formattedNumber} kg` : formattedNumber;
};

/**
 * Format persentase dengan 2 desimal
 * @param value - Nilai yang akan diformat sebagai persentase
 * @param total - Total untuk menghitung persentase
 * @returns String persentase yang sudah diformat
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(2)}%`;
};

/**
 * Format nomor plat dengan uppercase dan spacing yang konsisten
 * @param plateNumber - Nomor plat yang akan diformat
 * @returns String nomor plat yang sudah diformat
 */
export const formatPlateNumber = (plateNumber: string): string => {
  return plateNumber
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
};

/**
 * Format status truk untuk tampilan
 * @param status - Status truk
 * @returns Object dengan label dan class CSS untuk styling
 */
export const formatTruckStatus = (status: 'initial' | 'sorted') => {
  const statusMap = {
    initial: {
      label: 'Menunggu Pencacahan',
      className: 'bg-yellow-100 text-yellow-800'
    },
    sorted: {
      label: 'Sudah Dicacah',
      className: 'bg-green-100 text-green-800'
    }
  };

  return statusMap[status];
};

/**
 * Format selisih berat dengan warna yang sesuai
 * @param difference - Selisih berat
 * @returns Object dengan nilai yang diformat dan class CSS
 */
export const formatDifference = (difference: number) => {
  const formattedValue = formatWeight(Math.abs(difference));
  
  let className = 'text-gray-900';
  let label = formattedValue;
  
  if (difference > 0) {
    className = 'text-red-600';
    label = `+${formattedValue}`;
  } else if (difference < 0) {
    className = 'text-blue-600';
    label = `-${formattedValue}`;
  }
  
  return {
    label,
    className,
    value: difference
  };
};

/**
 * Truncate text dengan ellipsis jika melebihi panjang maksimal
 * @param text - Text yang akan di-truncate
 * @param maxLength - Panjang maksimal (default: 50)
 * @returns String yang sudah di-truncate
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generate ID unik berdasarkan timestamp dan random number
 * @returns String ID yang unik
 */
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};