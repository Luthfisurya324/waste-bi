import React from 'react';
import { Input } from '../UI';
import type { WasteCategory } from '../../types';

interface WasteCategoryItemProps {
  /** Kategori sampah */
  category: WasteCategory;
  
  /** Berat sampah dalam kategori ini */
  weight: number;
  
  /** Callback ketika berat berubah */
  onWeightChange: (categoryId: string, weight: number) => void;
  
  /** Callback ketika kategori dihapus */
  onRemove: (categoryId: string) => void;
  
  /** Error message jika ada */
  error?: string;
  
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Komponen untuk menampilkan item kategori sampah dengan input berat
 */
export const WasteCategoryItem: React.FC<WasteCategoryItemProps> = ({
  category,
  weight,
  onWeightChange,
  onRemove,
  error,
  disabled = false
}) => {
  // Handler untuk perubahan berat
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : Number(value);
    onWeightChange(category.id, numValue);
  };

  // Handler untuk menghapus kategori
  const handleRemove = () => {
    onRemove(category.id);
  };

  return (
    <div 
      className="flex items-center gap-2 p-3 rounded-md mb-2"
      style={{ borderLeft: `4px solid ${category.color || '#9E9E9E'}` }}
    >
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: category.color || '#9E9E9E' }}
          />
          <span className="font-medium">{category.name}</span>
        </div>
        {category.description && (
          <p className="text-xs text-gray-500">{category.description}</p>
        )}
      </div>
      
      <div className="w-32">
        <Input
          type="number"
          value={weight || ''}
          onChange={handleWeightChange}
          placeholder="Berat (kg)"
          min="0"
          step="0.1"
          error={error}
          disabled={disabled}
          className="text-right"
        />
      </div>
      
      <button
        type="button"
        onClick={handleRemove}
        disabled={disabled}
        className="text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Hapus kategori"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default WasteCategoryItem;