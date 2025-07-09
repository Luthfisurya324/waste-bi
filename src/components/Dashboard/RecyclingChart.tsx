import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// Perbaikan path impor untuk TooltipProps, NameType, dan ValueType
import { TooltipProps } from 'recharts/lib/component/Tooltip';
import { NameType, ValueType } from 'recharts/lib/component/DefaultTooltipContent';
import { formatPercentage, formatWeight } from '../../utils';
import { COLOR_CONFIG } from '../../constants';

/**
 * Props untuk komponen RecyclingChart
 */
interface RecyclingChartProps {
  /** Data untuk recycled dan collected */
  recycledWeight: number;
  collectedWeight: number;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen untuk menampilkan grafik perbandingan sampah yang didaur ulang vs yang terkumpul
 */
export const RecyclingChart: React.FC<RecyclingChartProps> = ({
  recycledWeight,
  collectedWeight,
  isLoading = false,
  className = ''
}) => {
  // Data untuk pie chart
  const data = [
    { name: 'Didaur Ulang', value: recycledWeight, color: '#4CAF50' },
    { name: 'Tidak Didaur Ulang', value: collectedWeight - recycledWeight, color: '#B0BEC5' }
  ];

  // Persentase daur ulang
  const recyclingPercentage = collectedWeight > 0 
    ? (recycledWeight / collectedWeight) * 100 
    : 0;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse flex flex-col items-center justify-center h-full">
      <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  // Custom tooltip untuk pie chart
  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{formatWeight(payload[0].value)}</p>
          <p>{formatPercentage(payload[0].value, collectedWeight)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recycled vs Collected</h3>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex flex-col items-center">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <div className="flex justify-between w-full">
              <div className="text-center">
                <p className="text-sm text-gray-500">Didaur Ulang</p>
                <p className="text-2xl font-bold text-green-600">{recyclingPercentage.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Tidak Didaur Ulang</p>
                <p className="text-2xl font-bold text-gray-500">{(100 - recyclingPercentage).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclingChart;