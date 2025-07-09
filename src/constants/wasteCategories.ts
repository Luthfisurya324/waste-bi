/**
 * Konstanta untuk kategori sampah
 * Berisi daftar kategori sampah yang umum digunakan
 */
import type { WasteCategory } from '../types';

/**
 * Daftar kategori sampah yang umum digunakan
 */
export const WASTE_CATEGORIES: WasteCategory[] = [
  {
    id: 'organic',
    name: 'Organik',
    description: 'Sampah yang dapat terurai secara alami seperti sisa makanan, daun, dll.',
    color: '#4CAF50' // Hijau
  },
  {
    id: 'inorganic',
    name: 'Anorganik',
    description: 'Sampah yang sulit terurai seperti plastik, kaca, logam, dll.',
    color: '#FFC107' // Kuning
  },
  {
    id: 'paper',
    name: 'Kertas',
    description: 'Sampah berbahan kertas seperti kardus, koran, majalah, dll.',
    color: '#2196F3' // Biru
  },
  {
    id: 'hazardous',
    name: 'B3 (Bahan Berbahaya dan Beracun)',
    description: 'Sampah berbahaya seperti baterai, lampu, kemasan pestisida, dll.',
    color: '#F44336' // Merah
  },
  {
    id: 'residue',
    name: 'Residu',
    description: 'Sampah yang tidak dapat didaur ulang atau dikomposkan.',
    color: '#9E9E9E' // Abu-abu
  },
  {
    id: 'metal',
    name: 'Logam',
    description: 'Sampah berbahan logam seperti kaleng, besi, aluminium, dll.',
    color: '#607D8B' // Biru keabu-abuan
  },
  {
    id: 'glass',
    name: 'Kaca',
    description: 'Sampah berbahan kaca seperti botol, gelas, dll.',
    color: '#00BCD4' // Cyan
  },
  {
    id: 'plastic',
    name: 'Plastik',
    description: 'Sampah berbahan plastik seperti botol, kantong, dll.',
    color: '#FF9800' // Oranye
  },
  {
    id: 'textile',
    name: 'Tekstil',
    description: 'Sampah berbahan tekstil seperti pakaian, kain, dll.',
    color: '#9C27B0' // Ungu
  },
  {
    id: 'electronic',
    name: 'Elektronik',
    description: 'Sampah elektronik seperti ponsel, komputer, dll.',
    color: '#795548' // Coklat
  }
];

/**
 * Mendapatkan kategori sampah berdasarkan ID
 * @param id - ID kategori sampah
 * @returns Kategori sampah atau undefined jika tidak ditemukan
 */
export const getWasteCategoryById = (id: string): WasteCategory | undefined => {
  return WASTE_CATEGORIES.find(category => category.id === id);
};

/**
 * Mendapatkan warna untuk kategori sampah berdasarkan ID
 * @param id - ID kategori sampah
 * @returns Warna kategori sampah atau warna default jika tidak ditemukan
 */
export const getWasteCategoryColor = (id: string): string => {
  const category = getWasteCategoryById(id);
  return category?.color || '#9E9E9E'; // Default abu-abu
};