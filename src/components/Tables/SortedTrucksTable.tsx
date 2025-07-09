import React from 'react';
import type { TruckData } from '../../types';
import { formatDate, formatWeight, formatDifference } from '../../utils';
import { UI_LABELS, INFO_MESSAGES } from '../../constants';

/**
 * Props untuk komponen SortedTrucksTable
 */
export interface SortedTrucksTableProps {
  /** Daftar truk yang sudah dicacah */
  trucks: TruckData[];
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Callback untuk menghapus truk */
  onDeleteTruck?: (truckId: string) => void;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen tabel untuk menampilkan daftar truk yang sudah selesai dicacah
 */
export const SortedTrucksTable: React.FC<SortedTrucksTableProps> = ({
  trucks,
  isLoading = false,
  onDeleteTruck,
  className = ''
}) => {
  // Loading skeleton untuk tabel
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(3)].map((_, index) => (
        <tr key={index} className="border-b border-gray-200">
          {[...Array(8)].map((_, cellIndex) => (
            <td key={cellIndex} className="px-4 py-3">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </td>
          ))}
        </tr>
      ))}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <tr>
      <td colSpan={8} className="px-4 py-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg 
            className="w-12 h-12 text-gray-300 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium mb-2">
            Belum ada data pencacahan
          </p>
          <p className="text-gray-400 text-sm">
            {INFO_MESSAGES.NO_SORTED_TRUCKS}
          </p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {UI_LABELS.SORTED_TABLE_TITLE} ({trucks.length} truk)
        </h2>
        
        {/* Header Icon */}
        <div className="p-2 bg-green-100 rounded-lg">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-green-50 border-b border-green-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.PLATE_NUMBER}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.ENTRY_DATE_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.SORTING_DATE}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.INITIAL_WEIGHT_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.ORGANIC_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.INORGANIC_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.TOTAL_PROCESSED}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.DIFFERENCE}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : trucks.length === 0 ? (
              <EmptyState />
            ) : (
              trucks.map((truck, index) => {
                const isEven = index % 2 === 0;
                const differenceData = formatDifference(truck.difference || 0);
                
                return (
                  <tr 
                    key={truck.id} 
                    className={`border-b border-gray-100 hover:bg-green-25 transition-colors ${
                      isEven ? 'bg-white' : 'bg-green-25'
                    }`}
                  >
                    {/* Nomor Plat */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {truck.plateNumber}
                        </span>
                      </div>
                    </td>

                    {/* Tanggal Masuk */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(truck.entryDate, {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </td>

                    {/* Tanggal Cacah */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {truck.sortingDate ? formatDate(truck.sortingDate, {
                        day: 'numeric',
                        month: 'short'
                      }) : '-'}
                    </td>

                    {/* Berat Awal */}
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {formatWeight(truck.initialWeight, false)}
                    </td>

                    {/* Sampah Organik */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-green-600">
                        {truck.organicWeight ? formatWeight(truck.organicWeight, false) : '-'}
                      </span>
                    </td>

                    {/* Sampah Anorganik */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-yellow-600">
                        {truck.inorganicWeight ? formatWeight(truck.inorganicWeight, false) : '-'}
                      </span>
                    </td>

                    {/* Total Dicacah */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {truck.totalProcessed ? formatWeight(truck.totalProcessed, false) : '-'}
                        </span>
                        {truck.totalProcessed && truck.initialWeight && (
                          <span className="text-xs text-gray-500">
                            {((truck.totalProcessed / truck.initialWeight) * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Selisih */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${differenceData.className}`}>
                          {differenceData.label}
                        </span>
                        {differenceData.value !== 0 && (
                          <div className="ml-2">
                            {differenceData.value > 0 ? (
                              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      {trucks.length > 0 && !isLoading && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
            <span>
              Menampilkan {trucks.length} truk yang sudah selesai dicacah
            </span>
            
            {/* Legend */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span>Organik</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span>Anorganik</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span>Selisih (+)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span>Selisih (-)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortedTrucksTable;