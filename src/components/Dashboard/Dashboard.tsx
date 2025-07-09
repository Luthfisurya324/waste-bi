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
          title="Recycled YTD"
          value={totalStats.totalRecycled || 519}
          color="text-green-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
          isLoading={isLoading}
        />
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Sent for Recycling</p>
            <p className="text-2xl font-bold text-green-600">1027</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Not Recyclable</p>
            <p className="text-2xl font-bold text-green-600">508</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recycled vs Collected</h3>
          <div className="flex items-center justify-center h-32">
            <div className="w-32 h-32 rounded-full border-8 border-green-500 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Recycled</p>
                  <p className="text-xl font-bold text-green-600">66.43%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Sent for Recycling</p>
            <p className="text-2xl font-bold text-green-600">1027</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Not Recyclable</p>
            <p className="text-2xl font-bold text-green-600">508</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Recycled</p>
            <p className="text-2xl font-bold text-green-600">519</p>
          </div>
        </div>
      </div>

      {/* Recycling Categories */}
      <RecyclingCategories
        categories={totalStats.recyclingCategories || [
          {
            name: 'Cardboard',
            value: 72.2,
            icon: <ArchiveBoxIcon className="w-10 h-10 text-green-600" />
          },
          {
            name: 'Paper',
            value: 10.0,
            icon: <DocumentIcon className="w-10 h-10 text-green-600" />
          },
          {
            name: 'Metal',
            value: 13,
            icon: <CubeIcon className="w-10 h-10 text-green-600" />
          },
          {
            name: 'Plastic',
            value: 1372.5,
            icon: <BeakerIcon className="w-10 h-10 text-green-600" />
          },
          {
            name: 'Oil & Grease',
            value: 6,
            icon: <FunnelIcon className="w-10 h-10 text-green-600" />
          }
        ]}
        isLoading={isLoading}
        className="mb-6"
      />

      {/* CO2 Emissions Chart */}
      <CO2EmissionsChart
        emissions={totalStats.co2Emissions || [
          { year: 2014, value: 78000 },
          { year: 2015, value: 70000 },
          { year: 2016, value: 47000 },
          { year: 2017, value: 18000 }
        ]}
        isLoading={isLoading}
        className="mb-6"
      />
    </div>
  );
};

export default Dashboard;