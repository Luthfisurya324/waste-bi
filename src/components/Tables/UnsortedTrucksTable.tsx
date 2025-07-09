import React from 'react';
import type { TruckData } from '../../types';
import { formatDate, formatWeight, formatTruckStatus } from '../../utils';
import { UI_LABELS, INFO_MESSAGES } from '../../constants';

/**
 * Props untuk komponen UnsortedTrucksTable
 */
export interface UnsortedTrucksTableProps {
  /** Daftar truk yang belum dicacah */
  trucks: TruckData[];
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Callback untuk memilih truk untuk dicacah */
  onSelectTruck?: (truck: TruckData) => void;
  
  /** Callback untuk menghapus truk */
  onDeleteTruck?: (truckId: string) => void;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen tabel untuk menampilkan daftar truk yang menunggu pencacahan
 */
export const UnsortedTrucksTable: React.FC<UnsortedTrucksTableProps> = ({
  trucks,
  isLoading = false,
  onSelectTruck,
  onDeleteTruck,
  className = ''
}) => {
  // Loading skeleton untuk tabel
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(3)].map((_, index) => (
        <tr key={index} className="border-b border-gray-200">
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </td>
        </tr>
      ))}
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <tr>
      <td colSpan={5} className="px-4 py-8 text-center">
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a1 1 0 011-1h1m-1 1v4h1m0-4h6m0 0v1m0-1h4v1m-4-1v4m0-4h1m0 0V9a1 1 0 011-1h1M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m-6 0h6" 
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium mb-2">
            Tidak ada truk yang menunggu
          </p>
          <p className="text-gray-400 text-sm">
            {INFO_MESSAGES.NO_UNSORTED_TRUCKS}
          </p>
        </div>
      </td>
    </tr>
  );

  const statusConfig = formatTruckStatus('initial');

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {UI_LABELS.UNSORTED_TABLE_TITLE} ({trucks.length} truk)
        </h2>
        
        {/* Header Icon */}
        <div className="p-2 bg-yellow-100 rounded-lg">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-yellow-50 border-b border-yellow-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.PLATE_NUMBER}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.ENTRY_DATE_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.INITIAL_WEIGHT_SHORT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {UI_LABELS.STATUS}
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                Aksi
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
                return (
                  <tr 
                    key={truck.id} 
                    className={`border-b border-gray-100 hover:bg-yellow-25 transition-colors ${
                      isEven ? 'bg-white' : 'bg-yellow-25'
                    }`}
                  >
                    {/* Nomor Plat */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Berat Awal */}
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {formatWeight(truck.initialWeight)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.className}`}>
                        <svg className="w-2 h-2 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {statusConfig.label}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {onSelectTruck && (
                          <button
                            onClick={() => onSelectTruck(truck)}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
                            title="Mulai pencacahan"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Cacah
                          </button>
                        )}
                        {onDeleteTruck && (
                          <button
                            onClick={() => onDeleteTruck(truck.id)}
                            className="inline-flex items-center px-2 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
                            title="Hapus data truk"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
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
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Menampilkan {trucks.length} truk yang menunggu pencacahan
            </span>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>Prioritas pencacahan berdasarkan urutan masuk</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsortedTrucksTable;