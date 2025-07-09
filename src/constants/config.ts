/**
 * Konstanta konfigurasi aplikasi
 * Centralized configuration untuk kemudahan maintenance
 */

// Konfigurasi validasi
export const VALIDATION_CONFIG = {
  // Batas minimum dan maksimum untuk berat (dalam kg)
  MIN_WEIGHT: 0,
  MAX_WEIGHT: 50000,
  
  // Toleransi untuk selisih berat (dalam persen)
  WEIGHT_TOLERANCE_PERCENT: 5,
  
  // Panjang minimum nomor plat
  MIN_PLATE_LENGTH: 3,
  
  // Batas waktu untuk tanggal entry (dalam hari)
  MAX_ENTRY_DATE_DAYS_AGO: 365,
  
  // Panjang maksimum untuk truncate text
  MAX_TEXT_LENGTH: 50
} as const;

// Konfigurasi localStorage
export const STORAGE_CONFIG = {
  // Key untuk menyimpan data truk
  TRUCKS_KEY: 'waste-bi-trucks',
  
  // Key untuk menyimpan pengaturan aplikasi
  SETTINGS_KEY: 'waste-bi-settings',
  
  // Versi data untuk migration
  DATA_VERSION: '1.0.0'
} as const;

// Konfigurasi tampilan
export const DISPLAY_CONFIG = {
  // Jumlah item per halaman untuk pagination
  ITEMS_PER_PAGE: 10,
  
  // Format tanggal default
  DATE_FORMAT: 'id-ID',
  
  // Locale untuk formatting angka
  NUMBER_LOCALE: 'id-ID',
  
  // Timeout untuk notifikasi (dalam ms)
  NOTIFICATION_TIMEOUT: 3000
} as const;

// Konfigurasi warna untuk status
export const COLOR_CONFIG = {
  STATUS: {
    INITIAL: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    },
    SORTED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200'
    }
  },
  DIFFERENCE: {
    POSITIVE: 'text-red-600',
    NEGATIVE: 'text-blue-600',
    ZERO: 'text-gray-900'
  },
  STATS: {
    INITIAL: 'text-blue-600',
    ORGANIC: 'text-green-600',
    INORGANIC: 'text-yellow-600',
    DIFFERENCE: 'text-red-600'
  }
} as const;

// Konfigurasi API (untuk future development)
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
} as const;

// Konfigurasi export data
export const EXPORT_CONFIG = {
  FILENAME_PREFIX: 'waste-bi-data',
  DATE_FORMAT: 'YYYY-MM-DD',
  SUPPORTED_FORMATS: ['csv', 'json', 'xlsx'] as const
} as const;

// Konfigurasi performance
export const PERFORMANCE_CONFIG = {
  // Debounce delay untuk search (dalam ms)
  SEARCH_DEBOUNCE: 300,
  
  // Throttle delay untuk scroll events (dalam ms)
  SCROLL_THROTTLE: 100,
  
  // Maksimal items untuk virtual scrolling
  VIRTUAL_SCROLL_THRESHOLD: 100
} as const;