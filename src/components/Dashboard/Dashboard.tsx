import React from 'react';
import { StatsCards } from './StatsCards';
import type { TotalStats } from '../../types';
import { UI_LABELS } from '../../constants';

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
    <div className={className}>
      {/* Header Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {UI_LABELS.DASHBOARD_TITLE}
            </h1>
            <p className="text-gray-600">
              {UI_LABELS.DASHBOARD_SUBTITLE}
            </p>
          </div>
          
          {/* Dashboard Icon */}
          <div className="hidden md:block">
            <div className="p-4 bg-blue-100 rounded-full">
              <svg 
                className="w-12 h-12 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Quick Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Real-time monitoring
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
              </svg>
              Data analytics
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Automated reporting
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards 
        stats={totalStats} 
        isLoading={isLoading}
        className="mb-6"
      />
    </div>
  );
};

export default Dashboard;