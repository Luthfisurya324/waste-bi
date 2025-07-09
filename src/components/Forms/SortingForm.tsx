import React, { useState, useCallback } from 'react';
import { Button, Input } from '../UI';
import type { SortingFormData, TruckData } from '../../types';
import { validateSortingForm, formatDate, formatWeight } from '../../utils';
import { UI_LABELS, PLACEHOLDERS, ERROR_MESSAGES, INFO_MESSAGES } from '../../constants';

/**
 * Props untuk komponen SortingForm
 */
interface SortingFormProps {
  /** Callback ketika form di-submit */
  onSubmit: (data: SortingFormData) => Promise<boolean>;
  
  /** Truk yang dipilih untuk dicacah */
  selectedTruck?: TruckData | null;
  
  /** Callback ketika form dibatalkan */
  onCancel?: () => void;
  
  /** Loading state dari parent */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen form untuk input data pencacahan sampah
 * Menghandle validasi dan state management secara internal
 */
export const SortingForm: React.FC<SortingFormProps> = ({
  onSubmit,
  selectedTruck,
  onCancel,
  isLoading = false,
  className = ''
}) => {
  // State untuk form data
  const [formData, setFormData] = useState<SortingFormData>({
    truckId: selectedTruck?.id || '',
    organicWeight: 0,
    inorganicWeight: 0
  });

  // Update truckId ketika selectedTruck berubah
  React.useEffect(() => {
    if (selectedTruck) {
      setFormData(prev => ({
        ...prev,
        truckId: selectedTruck.id
      }));
    }
  }, [selectedTruck]);

  // State untuk validasi errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State untuk form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Truck info untuk display
  const truckInfo = selectedTruck ? 
    `${selectedTruck.plateNumber} - ${formatWeight(selectedTruck.initialWeight)} (${formatDate(selectedTruck.entryDate, { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })})` : '';

  // Handler untuk perubahan input
  const handleInputChange = useCallback(
    (field: keyof SortingFormData) => 
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = field === 'truckId' 
          ? e.target.value 
          : Number(e.target.value);
        
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));

        // Clear error untuk field yang sedang diubah
        if (errors[field]) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      },
    [errors]
  );

  // Handler untuk submit form
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Clear previous errors
      setErrors({});
      setIsSubmitting(true);

      try {
        // Validasi form
        const initialWeight = selectedTruck?.initialWeight || 0;
        const validation = validateSortingForm(formData, initialWeight);
        
        if (!validation.isValid) {
          // Set errors untuk setiap field
          const fieldErrors: Record<string, string> = {};
          validation.errors.forEach(error => {
            if (error.includes('truk')) {
              fieldErrors.truckId = error;
            } else if (error.includes('organik')) {
              fieldErrors.organicWeight = error;
            } else if (error.includes('anorganik')) {
              fieldErrors.inorganicWeight = error;
            } else {
              fieldErrors.general = error;
            }
          });
          setErrors(fieldErrors);
          return;
        }

        // Submit form
        const success = await onSubmit(formData);
        
        if (success) {
          // Reset form jika berhasil
          setFormData({
            truckId: '',
            organicWeight: 0,
            inorganicWeight: 0
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ general: ERROR_MESSAGES.SAVE_FAILED });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, selectedTruck, onSubmit]
  );

  // Handler untuk reset form
  const handleReset = useCallback(() => {
    setFormData({
      truckId: '',
      organicWeight: 0,
      inorganicWeight: 0
    });
    setErrors({});
  }, []);

  const isFormLoading = isLoading || isSubmitting;

  // Hitung total dan sisa berat
  const totalProcessed = formData.organicWeight + formData.inorganicWeight;
  const remainingWeight = selectedTruck ? selectedTruck.initialWeight - totalProcessed : 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {UI_LABELS.SORTING_FORM_TITLE}
      </h2>
      
      {!selectedTruck ? (
        <p className="text-gray-500 text-center py-8">
          Pilih truk dari tabel untuk memulai pencacahan
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Info Truk Terpilih */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Truk Terpilih:</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">{selectedTruck.plateNumber}</p>
                <p className="text-sm text-gray-600">
                  Berat Awal: {formatWeight(selectedTruck.initialWeight)} | 
                  Masuk: {formatDate(selectedTruck.entryDate, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              {onCancel && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={onCancel}
                  disabled={isFormLoading}
                >
                  Batal
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Sampah Organik */}
            <Input
              label={UI_LABELS.ORGANIC_WEIGHT}
              type="number"
              value={formData.organicWeight || ''}
              onChange={handleInputChange('organicWeight')}
              placeholder={PLACEHOLDERS.ORGANIC_WEIGHT}
              error={errors.organicWeight}
              min="0"
              step="0.1"
              required
              disabled={isFormLoading}
            />

            {/* Sampah Anorganik */}
            <Input
              label={UI_LABELS.INORGANIC_WEIGHT}
              type="number"
              value={formData.inorganicWeight || ''}
              onChange={handleInputChange('inorganicWeight')}
              placeholder={PLACEHOLDERS.INORGANIC_WEIGHT}
              error={errors.inorganicWeight}
              min="0"
              step="0.1"
              required
              disabled={isFormLoading}
            />
          </div>

          {/* Info Summary */}
          {selectedTruck && (totalProcessed > 0) && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="text-sm text-blue-800">
                <p><strong>Berat Awal:</strong> {formatWeight(selectedTruck.initialWeight)}</p>
                <p><strong>Total Dicacah:</strong> {formatWeight(totalProcessed)}</p>
                <p className={`font-medium ${
                  remainingWeight < 0 ? 'text-red-600' : 
                  remainingWeight > 0 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  <strong>Selisih:</strong> {formatWeight(Math.abs(remainingWeight))} 
                  {remainingWeight > 0 && ' (kurang)'}
                  {remainingWeight < 0 && ' (lebih)'}
                  {remainingWeight === 0 && ' (pas)'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="success"
              isLoading={isFormLoading}
              disabled={isFormLoading || !formData.truckId}
            >
              {UI_LABELS.SAVE_SORTING}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={isFormLoading}
            >
              {UI_LABELS.RESET_FORM}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SortingForm;