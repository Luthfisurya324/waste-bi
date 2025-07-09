import React from 'react';
import { Layout, useNotification } from '../components/UI';
import { InitialTruckForm } from '../components/Forms';
import { useTruckData } from '../hooks';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import type { InitialTruckFormData } from '../types';
import { TruckIcon } from '@heroicons/react/24/outline';

const InputTrukPage: React.FC = () => {
  const { isLoading, addInitialTruckData } = useTruckData();
  const { showNotification } = useNotification();

  // Handler untuk form data awal truk
  const handleInitialTruckSubmit = React.useCallback(async (formData: InitialTruckFormData): Promise<boolean> => {
    try {
      await addInitialTruckData(formData);
      showNotification('success', SUCCESS_MESSAGES.TRUCK_ADDED);
      return true;
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR);
      return false;
    }
  }, [addInitialTruckData, showNotification]);

  return (
    <Layout activePage="/input-truk">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <TruckIcon className="w-8 h-8 mr-3" />
              Input Data Truk
            </h1>
            <p className="text-gray-600">
              Masukkan data awal truk yang akan dicacah
            </p>
          </div>
        </div>
      </div>

      {/* Form Input Data Awal Truk */}
      <InitialTruckForm
        onSubmit={handleInitialTruckSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default InputTrukPage;