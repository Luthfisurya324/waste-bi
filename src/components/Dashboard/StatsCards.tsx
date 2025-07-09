import React from 'react';
import { UI_LABELS, COLOR_CONFIG } from '../../constants';
import type { TotalStats } from '../../types/truck';
import { CubeIcon, SparklesIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline';

import { formatWeight } from '../../utils';

/**
 * Props untuk komponen StatsCards
 */
interface StatsCardsProps {
  /** Data statistik total */
  stats: TotalStats;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Interface untuk konfigurasi card statistik
 */
interface StatCard {
  title: string;
  value: number;
  colorClass: string;
  icon: React.ReactNode;
  description?: string;
}

/**
 * Komponen untuk menampilkan kartu-kartu statistik
 */
export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  isLoading = false,
  className = ''
}) => {
  // Konfigurasi untuk setiap card statistik
  const statCards: StatCard[] = [
    {
      title: UI_LABELS.TOTAL_INITIAL,
      value: stats.totalInitial,
      colorClass: COLOR_CONFIG.STATS.INITIAL,
      icon: <CubeIcon className="w-8 h-8" />,
      description: 'Total berat sampah yang masuk'
    },
    {
      title: UI_LABELS.TOTAL_ORGANIC,
      value: stats.totalOrganic,
      colorClass: COLOR_CONFIG.STATS.ORGANIC,
      icon: <SparklesIcon className="w-8 h-8" />,
      description: 'Sampah organik yang berhasil dicacah'
    },
    {
      title: UI_LABELS.TOTAL_INORGANIC,
      value: stats.totalInorganic,
      colorClass: COLOR_CONFIG.STATS.INORGANIC,
      icon: <TrashIcon className="w-8 h-8" />,
      description: 'Sampah anorganik yang berhasil dicacah'
    },
    {
      title: UI_LABELS.TOTAL_DIFFERENCE,
      value: stats.totalDifference,
      colorClass: COLOR_CONFIG.STATS.DIFFERENCE,
      icon: <ChartBarIcon className="w-8 h-8" />,
      description: 'Selisih total berat awal dengan hasil cacah'
    }
  ];

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Header dengan icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-opacity-10 ${card.colorClass.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <div className={card.colorClass}>
                    {card.icon}
                  </div>
                </div>
                
                {/* Trend indicator (placeholder untuk future enhancement) */}
                <div className="text-xs text-gray-400">
                  {/* Bisa ditambahkan trend arrow di sini */}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>

              {/* Value */}
              <p className={`text-3xl font-bold ${card.colorClass} mb-1`}>
                {formatWeight(card.value, false)}
                <span className="text-lg font-normal text-gray-500 ml-1">kg</span>
              </p>

              {/* Description */}
              {card.description && (
                <p className="text-sm text-gray-500">
                  {card.description}
                </p>
              )}

              {/* Additional info untuk selisih */}
              {card.title === UI_LABELS.TOTAL_DIFFERENCE && (
                <div className="mt-2 text-xs">
                  {stats.totalDifference > 0 && (
                    <span className="text-red-600">↑ Berat awal lebih besar</span>
                  )}
                  {stats.totalDifference < 0 && (
                    <span className="text-blue-600">↓ Hasil cacah lebih besar</span>
                  )}
                  {stats.totalDifference === 0 && (
                    <span className="text-green-600">✓ Seimbang</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;