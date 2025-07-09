import React from 'react';
import { RecyclingCategories } from './RecyclingCategories';
import { CO2EmissionsChart } from './CO2EmissionsChart';
import type { TotalStats } from '../../types/truck';
import { StatsCard } from './StatsCard';
import { ArchiveBoxIcon, DocumentIcon, CubeIcon, BeakerIcon, FunnelIcon } from '@heroicons/react/24/outline';

/**
 * Props untuk komponen Dashboard
 */
interface DashboardProps {
  /** Data statistik total */
  totalStats: TotalStats;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen Dashboard utama yang menampilkan header dan statistik
 */
export const Dashboard: React.FC<DashboardProps> = ({
  totalStats,
  isLoading = false,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>

      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Berat Awal"
          value={`${totalStats.totalInitial.toFixed(1)} kg`}
          color="text-blue-600"
          icon={<CubeIcon className="w-8 h-8" />}
          isLoading={isLoading}
        />
        <StatsCard 
          title="Total Diproses"
          value={`${(totalStats.totalOrganic + totalStats.totalInorganic).toFixed(1)} kg`}
          color="text-green-600"
          icon={<BeakerIcon className="w-8 h-8" />}
          isLoading={isLoading}
        />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Persentase Diproses</h3>
          <div className="flex items-center justify-center h-32">
            <div className="w-32 h-32 rounded-full border-8 border-green-500 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Diproses</p>
                  <p className="text-xl font-bold text-green-600">
                    {totalStats.totalInitial > 0 
                      ? `${((totalStats.totalOrganic + totalStats.totalInorganic) / totalStats.totalInitial * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Sampah Organik</p>
            <p className="text-2xl font-bold text-green-600">{totalStats.totalOrganic.toFixed(1)} kg</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Sampah Anorganik</p>
            <p className="text-2xl font-bold text-orange-600">{totalStats.totalInorganic.toFixed(1)} kg</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Selisih</p>
            <p className="text-2xl font-bold text-red-600">{totalStats.totalDifference.toFixed(1)} kg</p>
          </div>
        </div>
      </div>

      {/* Recycling Categories */}
      <RecyclingCategories
        categories={totalStats.recyclingCategories && totalStats.recyclingCategories.length > 0 
          ? totalStats.recyclingCategories
          : [
              {
                name: 'Belum ada data',
                value: 0,
                icon: <ArchiveBoxIcon className="w-10 h-10 text-gray-400" />
              }
            ]
        }
        isLoading={isLoading}
        className="mb-6"
      />

      {/* CO2 Emissions Chart */}
      <CO2EmissionsChart
        emissions={totalStats.co2Emissions || []}
        isLoading={isLoading}
        className="mb-6"
      />
    </div>
  );
};

export default Dashboard;