import React from 'react';
import type { TotalStats } from '../../types';
import { formatWeight } from '../../utils';
import { UI_LABELS, COLOR_CONFIG } from '../../constants';

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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      description: 'Total berat sampah yang masuk'
    },
    {
      title: UI_LABELS.TOTAL_ORGANIC,
      value: stats.totalOrganic,
      colorClass: COLOR_CONFIG.STATS.ORGANIC,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Sampah organik yang berhasil dicacah'
    },
    {
      title: UI_LABELS.TOTAL_INORGANIC,
      value: stats.totalInorganic,
      colorClass: COLOR_CONFIG.STATS.INORGANIC,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      description: 'Sampah anorganik yang berhasil dicacah'
    },
    {
      title: UI_LABELS.TOTAL_DIFFERENCE,
      value: stats.totalDifference,
      colorClass: COLOR_CONFIG.STATS.DIFFERENCE,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
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