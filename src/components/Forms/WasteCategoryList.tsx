import React, { useState } from 'react';
import { Button } from '../UI';
import { WasteCategoryItem } from './WasteCategoryItem';
import type { WasteCategory, WasteCategoryItem as WasteCategoryItemType } from '../../types';
import { WASTE_CATEGORIES } from '../../constants';

interface WasteCategoryListProps {
  /** Daftar item kategori sampah dengan beratnya */
  items: WasteCategoryItemType[];
  
  /** Callback ketika daftar item berubah */
  onChange: (items: WasteCategoryItemType[]) => void;
  
  /** Error messages jika ada */
  errors?: Record<string, string>;
  
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Komponen untuk mengelola daftar kategori sampah
 */
export const WasteCategoryList: React.FC<WasteCategoryListProps> = ({
  items,
  onChange,
  errors = {},
  disabled = false
}) => {
  // State untuk kategori yang dipilih di dropdown
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // Daftar kategori yang tersedia (belum dipilih)
  const availableCategories = WASTE_CATEGORIES.filter(
    category => !items.some(item => item.categoryId === category.id)
  );

  // Handler untuk menambah kategori
  const handleAddCategory = () => {
    if (!selectedCategoryId) return;
    
    const newItems = [
      ...items,
      { categoryId: selectedCategoryId, weight: 0 }
    ];
    
    onChange(newItems);
    setSelectedCategoryId(''); // Reset dropdown
  };

  // Handler untuk mengubah berat kategori
  const handleWeightChange = (categoryId: string, weight: number) => {
    const newItems = items.map(item => {
      if (item.categoryId === categoryId) {
        return { ...item, weight };
      }
      return item;
    });
    
    onChange(newItems);
  };

  // Handler untuk menghapus kategori
  const handleRemoveCategory = (categoryId: string) => {
    const newItems = items.filter(item => item.categoryId !== categoryId);
    onChange(newItems);
  };

  // Mendapatkan kategori berdasarkan ID
  const getCategoryById = (id: string): WasteCategory | undefined => {
    return WASTE_CATEGORIES.find(category => category.id === id);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Kategori Sampah:</h3>
        
        {/* Daftar kategori yang sudah dipilih */}
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map(item => {
              const category = getCategoryById(item.categoryId);
              if (!category) return null;
              
              return (
                <WasteCategoryItem
                  key={item.categoryId}
                  category={category}
                  weight={item.weight}
                  onWeightChange={handleWeightChange}
                  onRemove={handleRemoveCategory}
                  error={errors[item.categoryId]}
                  disabled={disabled}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            Belum ada kategori sampah yang dipilih. Silakan tambahkan kategori di bawah.
          </p>
        )}
      </div>

      {/* Form untuk menambah kategori baru */}
      {availableCategories.length > 0 && (
        <div className="flex items-end gap-2 mt-4">
          <div className="flex-grow">
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
              Tambah Kategori Sampah
            </label>
            <select
              id="category-select"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              disabled={disabled}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">-- Pilih Kategori --</option>
              {availableCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleAddCategory}
            disabled={!selectedCategoryId || disabled}
          >
            Tambah
          </Button>
        </div>
      )}
    </div>
  );
};

export default WasteCategoryList;