import React from 'react';
import { formatWeight } from '../../utils';

/**
 * Props untuk komponen StatsCard
 */
interface StatsCardProps {
  /** Judul kartu */
  title: string;
  
  /** Nilai statistik */
  value: number;
  
  /** Warna untuk kartu (class Tailwind) */
  color: string;
  
  /** Ikon untuk kartu */
  icon?: React.ReactNode;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen untuk menampilkan kartu statistik individual
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color,
  icon,
  isLoading = false,
  className = ''
}) => {
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  );

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {icon && (
              <div className={`p-2 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <div className={color}>
                  {icon}
                </div>
              </div>
            )}
          </div>
          <p className={`text-3xl font-bold ${color} mb-1`}>
            {formatWeight(value, false)}
          </p>
        </>
      )}
    </div>
  );
};

export default StatsCard;