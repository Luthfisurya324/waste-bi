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
  
  /** Berat sampah organik setelah dicacah (dalam kg) */
  organicWeight?: number;
  
  /** Berat sampah anorganik setelah dicacah (dalam kg) */
  inorganicWeight?: number;
  
  /** Total berat yang berhasil dicacah (organik + anorganik) */
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
 * Interface untuk form input data pencacahan
 */
export interface SortingFormData {
  truckId: string;
  organicWeight: number;
  inorganicWeight: number;
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
}

/**
 * Interface untuk validasi form
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}