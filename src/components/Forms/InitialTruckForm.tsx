import React, { useState, useCallback } from 'react';
import { Button, Input } from '../UI';
import type { InitialTruckFormData } from '../../types';
import { validateInitialTruckForm, formatDateForInput } from '../../utils';
import { UI_LABELS, PLACEHOLDERS, ERROR_MESSAGES } from '../../constants';

/**
 * Props untuk komponen InitialTruckForm
 */
interface InitialTruckFormProps {
  /** Callback ketika form di-submit */
  onSubmit: (data: InitialTruckFormData) => Promise<boolean>;
  
  /** Loading state dari parent */
  isLoading?: boolean;
  
  /** Class CSS tambahan */
  className?: string;
}

/**
 * Komponen form untuk input data awal truk
 * Menghandle validasi dan state management secara internal
 */
export const InitialTruckForm: React.FC<InitialTruckFormProps> = ({
  onSubmit,
  isLoading = false,
  className = ''
}) => {
  // State untuk form data
  const [formData, setFormData] = useState<InitialTruckFormData>({
    plateNumber: '',
    initialWeight: 0,
    entryDate: formatDateForInput(new Date())
  });

  // State untuk validasi errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State untuk form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler untuk perubahan input
  const handleInputChange = useCallback(
    (field: keyof InitialTruckFormData) => 
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field === 'initialWeight' 
          ? Number(e.target.value) 
          : e.target.value;
        
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
        const validation = validateInitialTruckForm(formData);
        
        if (!validation.isValid) {
          // Set errors untuk setiap field
          const fieldErrors: Record<string, string> = {};
          validation.errors.forEach(error => {
            if (error.includes('plat')) {
              fieldErrors.plateNumber = error;
            } else if (error.includes('berat')) {
              fieldErrors.initialWeight = error;
            } else if (error.includes('tanggal')) {
              fieldErrors.entryDate = error;
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
            plateNumber: '',
            initialWeight: 0,
            entryDate: formatDateForInput(new Date())
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ general: ERROR_MESSAGES.SAVE_FAILED });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit]
  );

  // Handler untuk reset form
  const handleReset = useCallback(() => {
    setFormData({
      plateNumber: '',
      initialWeight: 0,
      entryDate: formatDateForInput(new Date())
    });
    setErrors({});
  }, []);

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {UI_LABELS.INITIAL_FORM_TITLE}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nomor Plat */}
          <Input
            label={UI_LABELS.PLATE_NUMBER}
            type="text"
            value={formData.plateNumber}
            onChange={handleInputChange('plateNumber')}
            placeholder={PLACEHOLDERS.PLATE_NUMBER}
            error={errors.plateNumber}
            required
            disabled={isFormLoading}
            className="uppercase"
          />

          {/* Tanggal Masuk */}
          <Input
            label={UI_LABELS.ENTRY_DATE}
            type="date"
            value={formData.entryDate}
            onChange={handleInputChange('entryDate')}
            error={errors.entryDate}
            required
            disabled={isFormLoading}
          />

          {/* Berat Awal */}
          <Input
            label={UI_LABELS.INITIAL_WEIGHT}
            type="number"
            value={formData.initialWeight || ''}
            onChange={handleInputChange('initialWeight')}
            placeholder={PLACEHOLDERS.INITIAL_WEIGHT}
            error={errors.initialWeight}
            min="0"
            step="0.1"
            required
            disabled={isFormLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isFormLoading}
            disabled={isFormLoading}
          >
            {UI_LABELS.SAVE_INITIAL}
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
    </div>
  );
};

export default InitialTruckForm;