import React, { useState, useCallback } from 'react';
import { Button, Input } from '../UI';
import { WasteCategoryList } from './WasteCategoryList';
import type { SortingFormData, TruckData, WasteCategoryItem } from '../../types';
import { validateSortingForm, formatDate, formatWeight } from '../../utils';
import { UI_LABELS, PLACEHOLDERS, ERROR_MESSAGES } from '../../constants';

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
    wasteItems: [],
    // Untuk kompatibilitas dengan kode lama
    organicWeight: 0,
    inorganicWeight: 0
  });

  // Update truckId dan wasteItems ketika selectedTruck berubah
  React.useEffect(() => {
    if (selectedTruck) {
      // Jika truk sudah memiliki data wasteItems, gunakan itu
      if (selectedTruck.wasteItems && selectedTruck.wasteItems.length > 0) {
        setFormData(prev => ({
          ...prev,
          truckId: selectedTruck.id,
          wasteItems: [...selectedTruck.wasteItems],
          organicWeight: selectedTruck.organicWeight || 0,
          inorganicWeight: selectedTruck.inorganicWeight || 0
        }));
      } 
      // Jika truk belum memiliki data wasteItems tapi memiliki data organik/anorganik (kode lama)
      else if (selectedTruck.organicWeight !== undefined || selectedTruck.inorganicWeight !== undefined) {
        const organicWeight = selectedTruck.organicWeight || 0;
        const inorganicWeight = selectedTruck.inorganicWeight || 0;
        
        // Konversi ke format baru
        const wasteItems: WasteCategoryItem[] = [];
        
        if (organicWeight > 0) {
          wasteItems.push({ categoryId: 'organic', weight: organicWeight });
        }
        
        if (inorganicWeight > 0) {
          wasteItems.push({ categoryId: 'inorganic', weight: inorganicWeight });
        }
        
        setFormData(prev => ({
          ...prev,
          truckId: selectedTruck.id,
          wasteItems,
          organicWeight,
          inorganicWeight
        }));
      }
      // Jika truk belum memiliki data sama sekali
      else {
        setFormData(prev => ({
          ...prev,
          truckId: selectedTruck.id,
          wasteItems: [],
          organicWeight: 0,
          inorganicWeight: 0
        }));
      }
    }
  }, [selectedTruck]);

  // State untuk validasi errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State untuk form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler untuk perubahan input
  const handleInputChange = useCallback(
    (field: keyof SortingFormData) => 
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (field === 'truckId') {
          // Untuk field truckId, gunakan string value
          setFormData(prev => ({
            ...prev,
            [field]: e.target.value
          }));
        } else {
          // Untuk field numerik (organicWeight, inorganicWeight)
          const inputValue = e.target.value;
          
          // Validasi input numerik
          if (inputValue === '') {
            // Jika input kosong, set ke 0
            setFormData(prev => ({
              ...prev,
              [field]: 0
            }));
          } else {
            // Konversi ke number dan validasi
            const numValue = Number(inputValue);
            
            // Pastikan nilai tidak negatif
            if (numValue < 0) {
              // Jika negatif, tolak perubahan dan set error
              setErrors(prev => ({
                ...prev,
                [field]: 'Nilai tidak boleh negatif'
              }));
              return;
            }
            
            // Update form data dengan nilai yang valid
            setFormData(prev => ({
              ...prev,
              [field]: numValue
            }));
            
            // Jika field adalah organicWeight atau inorganicWeight, update juga wasteItems
            if (field === 'organicWeight' || field === 'inorganicWeight') {
              updateWasteItemFromLegacyField(field, numValue);
            }
          }
        }

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
  
  // Handler untuk perubahan daftar kategori sampah
  const handleWasteItemsChange = useCallback((wasteItems: WasteCategoryItem[]) => {
    // Update wasteItems
    setFormData(prev => ({
      ...prev,
      wasteItems
    }));
    
    // Update juga field organicWeight dan inorganicWeight untuk kompatibilitas
    const organicItem = wasteItems.find(item => item.categoryId === 'organic');
    const inorganicItem = wasteItems.find(item => item.categoryId === 'inorganic');
    
    setFormData(prev => ({
      ...prev,
      wasteItems,
      organicWeight: organicItem ? organicItem.weight : 0,
      inorganicWeight: inorganicItem ? inorganicItem.weight : 0
    }));
    
    // Clear errors untuk wasteItems
    if (errors.wasteItems) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.wasteItems;
        return newErrors;
      });
    }
  }, [errors]);
  
  // Helper untuk mengupdate wasteItems dari field legacy (organicWeight, inorganicWeight)
  const updateWasteItemFromLegacyField = useCallback((field: 'organicWeight' | 'inorganicWeight', value: number) => {
    const categoryId = field === 'organicWeight' ? 'organic' : 'inorganic';
    
    setFormData(prev => {
      // Cek apakah kategori sudah ada di wasteItems
      const existingIndex = prev.wasteItems.findIndex(item => item.categoryId === categoryId);
      
      let updatedWasteItems;
      
      if (existingIndex >= 0) {
        // Update item yang sudah ada
        updatedWasteItems = [...prev.wasteItems];
        updatedWasteItems[existingIndex] = {
          ...updatedWasteItems[existingIndex],
          weight: value
        };
      } else {
        // Tambahkan item baru
        updatedWasteItems = [
          ...prev.wasteItems,
          { categoryId, weight: value }
        ];
      }
      
      return {
        ...prev,
        wasteItems: updatedWasteItems,
        [field]: value
      };
    });
  }, []);

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
            } else if (error.includes('kategori sampah')) {
              fieldErrors.wasteItems = error;
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
            wasteItems: [],
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
      wasteItems: [],
      organicWeight: 0,
      inorganicWeight: 0
    });
    setErrors({});
  }, []);

  const isFormLoading = isLoading || isSubmitting;

  // Hitung total dan sisa berat dengan useMemo untuk optimasi performa
  const { totalProcessed, remainingWeight } = React.useMemo(() => {
    // Hitung total dari wasteItems
    const totalFromWasteItems = formData.wasteItems.reduce(
      (sum, item) => sum + (item.weight || 0), 
      0
    );
    
    // Gunakan total dari wasteItems jika ada, jika tidak gunakan organicWeight + inorganicWeight
    const total = totalFromWasteItems > 0 
      ? totalFromWasteItems 
      : formData.organicWeight + formData.inorganicWeight;
      
    const remaining = selectedTruck ? selectedTruck.initialWeight - total : 0;
    return { totalProcessed: total, remainingWeight: remaining };
  }, [formData.wasteItems, formData.organicWeight, formData.inorganicWeight, selectedTruck]);

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

          {/* Kategori Sampah Dinamis */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">Kategori Sampah</h3>
            <WasteCategoryList
              items={formData.wasteItems}
              onChange={handleWasteItemsChange}
              errors={errors.wasteItems ? { general: errors.wasteItems } : {}}
              disabled={isFormLoading}
            />
          </div>
          
          {/* Untuk kompatibilitas dengan kode lama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
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