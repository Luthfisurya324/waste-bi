/**
 * Konstanta untuk pesan aplikasi
 * Centralized messages untuk konsistensi dan kemudahan maintenance
 */

// Pesan sukses
export const SUCCESS_MESSAGES = {
  TRUCK_ADDED: 'Data truk berhasil ditambahkan',
  SORTING_COMPLETED: 'Data pencacahan berhasil disimpan',
  DATA_SAVED: 'Data berhasil disimpan ke penyimpanan lokal',
  DATA_LOADED: 'Data berhasil dimuat dari penyimpanan lokal'
} as const;

// Pesan error
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Mohon lengkapi semua field yang wajib diisi',
  INVALID_PLATE: 'Format nomor plat tidak valid',
  INVALID_WEIGHT: 'Berat harus berupa angka positif',
  INVALID_DATE: 'Tanggal tidak valid',
  FUTURE_DATE: 'Tanggal tidak boleh di masa depan',
  OLD_DATE: 'Tanggal tidak boleh lebih dari 1 tahun yang lalu',
  WEIGHT_EXCEEDED: 'Total berat cacah melebihi berat awal + toleransi',
  NO_TRUCK_SELECTED: 'Mohon pilih truk yang akan dicacah',
  NEGATIVE_WEIGHT: 'Berat tidak boleh negatif',
  ZERO_PROCESSING: 'Minimal harus ada sampah yang dicacah',
  SAVE_FAILED: 'Gagal menyimpan data',
  LOAD_FAILED: 'Gagal memuat data',
  GENERIC_ERROR: 'Terjadi kesalahan yang tidak terduga'
} as const;

// Pesan informasi
export const INFO_MESSAGES = {
  NO_UNSORTED_TRUCKS: 'Tidak ada truk yang menunggu untuk dicacah. Silakan input data awal terlebih dahulu.',
  NO_SORTED_TRUCKS: 'Belum ada truk yang selesai dicacah.',
  EMPTY_DATA: 'Belum ada data yang tersimpan',
  LOADING: 'Memuat data...',
  PROCESSING: 'Memproses data...'
} as const;

// Label untuk UI
export const UI_LABELS = {
  // Form labels
  PLATE_NUMBER: 'Nomor Plat',
  ENTRY_DATE: 'Tanggal Masuk',
  INITIAL_WEIGHT: 'Berat Total Awal (kg)',
  SELECT_TRUCK: 'Pilih Truk',
  ORGANIC_WEIGHT: 'Sampah Organik (kg)',
  INORGANIC_WEIGHT: 'Sampah Anorganik (kg)',
  
  // Button labels
  SAVE_INITIAL: 'Simpan Data Awal',
  SAVE_SORTING: 'Simpan Data Pencacahan',
  RESET_FORM: 'Reset Form',
  EXPORT_DATA: 'Export Data',
  
  // Table headers
  ENTRY_DATE_SHORT: 'Tgl Masuk',
  SORTING_DATE: 'Tgl Cacah',
  INITIAL_WEIGHT_SHORT: 'Berat Awal (kg)',
  ORGANIC_SHORT: 'Organik (kg)',
  INORGANIC_SHORT: 'Anorganik (kg)',
  TOTAL_PROCESSED: 'Total Cacah (kg)',
  DIFFERENCE: 'Selisih (kg)',
  STATUS: 'Status',
  
  // Stats labels
  TOTAL_INITIAL: 'Total Berat Awal',
  TOTAL_ORGANIC: 'Total Organik',
  TOTAL_INORGANIC: 'Total Anorganik',
  TOTAL_DIFFERENCE: 'Total Selisih',
  
  // App Header
  APP_TITLE: 'Dashboard BI Pengolahan Sampah',
  APP_SUBTITLE: 'Sistem monitoring penimbangan dan pencacahan sampah',

  // Section titles
  DASHBOARD_TITLE: 'Statistik Keseluruhan',
  DASHBOARD_SUBTITLE: 'Ringkasan data dari semua truk yang telah diproses',
  INITIAL_FORM_TITLE: '📝 Input Data Awal Truk (Saat Masuk)',
  SORTING_FORM_TITLE: '⚖️ Input Data Pencacahan (Setelah Dicacah)',
  UNSORTED_TABLE_TITLE: '🚛 Truk Menunggu Pencacahan',
  SORTED_TABLE_TITLE: '✅ Data Truk Sudah Dicacah'
} as const;

// Placeholder text
export const PLACEHOLDERS = {
  PLATE_NUMBER: 'B 1234 ABC',
  INITIAL_WEIGHT: '1000',
  ORGANIC_WEIGHT: '600',
  INORGANIC_WEIGHT: '300',
  SELECT_TRUCK: '-- Pilih Truk --'
} as const;

// Status labels
export const STATUS_LABELS = {
  INITIAL: 'Menunggu Pencacahan',
  SORTED: 'Sudah Dicacah'
} as const;