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
    INITIAL: 'bg-blue-100 text-blue-800',
    SORTED: 'bg-green-100 text-green-800'
  },
  DIFFERENCE: {
    POSITIVE: 'text-green-600',
    NEGATIVE: 'text-red-600',
    ZERO: 'text-gray-600'
  },
  STATS: {
    INITIAL: 'bg-blue-500',
    ORGANIC: 'bg-green-500',
    INORGANIC: 'bg-amber-500',
    DIFFERENCE: 'bg-purple-500',
    RECYCLED: 'bg-emerald-500',
    NON_RECYCLED: 'bg-red-500',
    SAVINGS: 'bg-indigo-500'
  },
  RECYCLING: {
    CARDBOARD: '#4CAF50',
    PAPER: '#2196F3',
    METAL: '#FFC107',
    PLASTIC: '#9C27B0',
    OIL: '#FF5722'
  },
  CHART: {
    RECYCLED: '#4CAF50',
    COLLECTED: '#90EE90',
    EMISSIONS: '#8BC34A'
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