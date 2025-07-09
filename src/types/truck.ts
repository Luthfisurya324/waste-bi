/**
 * Interface untuk data truk sampah
 * Mendefinisikan struktur data untuk tracking truk dari masuk hingga selesai dicacah
 */
export interface TruckData {
  /** ID unik untuk setiap truk */
  id: string;
  
  /** Nomor plat kendaraan */
  plateNumber: string;
  
  /** Berat total awal saat truk masuk (dalam kg) */
  initialWeight: number;
  
  /** Tanggal dan waktu truk masuk ke fasilitas */
  entryDate: Date;
  
  /** Daftar kategori sampah dengan beratnya */
  wasteItems?: WasteCategoryItem[];
  
  /** Berat sampah organik setelah dicacah (dalam kg) - untuk kompatibilitas */
  organicWeight?: number;
  
  /** Berat sampah anorganik setelah dicacah (dalam kg) - untuk kompatibilitas */
  inorganicWeight?: number;
  
  /** Total berat yang berhasil dicacah (semua kategori) */
  totalProcessed?: number;
  
  /** Selisih antara berat awal dan total yang dicacah */
  difference?: number;
  
  /** Tanggal dan waktu pencacahan dilakukan */
  sortingDate?: Date;
  
  /** Status pemrosesan truk */
  status: TruckStatus;
}

/**
 * Enum untuk status truk
 */
export type TruckStatus = 'initial' | 'sorted';

/**
 * Interface untuk form input data awal truk
 */
export interface InitialTruckFormData {
  plateNumber: string;
  initialWeight: number;
  entryDate: string; // Format YYYY-MM-DD untuk input date
}

/**
 * Interface untuk kategori sampah
 */
export interface WasteCategory {
  /** ID unik kategori */
  id: string;
  
  /** Nama kategori sampah */
  name: string;
  
  /** Deskripsi kategori (opsional) */
  description?: string;
  
  /** Warna yang terkait dengan kategori */
  color?: string;
}

/**
 * Interface untuk item kategori sampah dengan berat
 */
export interface WasteCategoryItem {
  /** ID kategori sampah */
  categoryId: string;
  
  /** Berat sampah dalam kategori ini (kg) */
  weight: number;
}

/**
 * Interface untuk form input data pencacahan
 */
export interface SortingFormData {
  /** ID truk yang dicacah */
  truckId: string;
  
  /** Daftar kategori sampah dengan beratnya */
  wasteItems: WasteCategoryItem[];
  
  /** Untuk kompatibilitas dengan kode lama */
  organicWeight?: number;
  inorganicWeight?: number;
}

/**
 * Interface untuk kategori daur ulang
 */
export interface RecyclingCategory {
  /** Nama kategori */
  name: string;
  
  /** Nilai dalam kg */
  value: number;
  
  /** Ikon untuk kategori */
  icon: React.ReactNode;
}

/**
 * Interface untuk data emisi CO2
 */
export interface CO2Emission {
  /** Tahun */
  year: number;
  
  /** Nilai emisi dalam kg */
  value: number;
}

/**
 * Interface untuk statistik keseluruhan
 */
export interface TotalStats {
  /** Total berat awal semua truk */
  totalInitial: number;
  
  /** Total berat sampah organik */
  totalOrganic: number;
  
  /** Total berat sampah anorganik */
  totalInorganic: number;
  
  /** Total selisih dari semua truk */
  totalDifference: number;
  
  /** Total sampah yang didaur ulang */
  totalRecycled?: number;
  
  /** Total sampah yang tidak didaur ulang */
  totalNonRecycled?: number;
  
  /** Kategori daur ulang */
  recyclingCategories?: RecyclingCategory[];
  
  /** Data emisi CO2 per tahun */
  co2Emissions?: CO2Emission[];
}

/**
 * Interface untuk validasi form
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}