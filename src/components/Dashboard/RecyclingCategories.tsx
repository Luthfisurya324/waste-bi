import React from 'react';
import { formatWeight } from '../../utils';

/**
 * Interface untuk kategori daur ulang
 */
export interface RecyclingCategory {
  name: string;
  value: number;
  icon: React.ReactNode;
}

/**
 * Props untuk komponen RecyclingCategories
 */
interface RecyclingCategoriesProps {
  /** Data kategori daur ulang */
  categories: RecyclingCategory[];
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen untuk menampilkan kategori daur ulang dengan ikon dan nilai
 */
export const RecyclingCategories: React.FC<RecyclingCategoriesProps> = ({
  categories,
  isLoading = false,
  className = ''
}) => {
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-6 bg-gray-200 rounded w-12"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recycled by Category YTD</h3>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-2 bg-green-50">
                {category.icon}
              </div>
              <p className="text-sm text-gray-600 mb-1">{category.name}</p>
              <p className="text-xl font-bold text-green-600">{formatWeight(category.value, false)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecyclingCategories;