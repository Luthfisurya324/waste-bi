import React, { forwardRef } from 'react';

/**
 * Interface untuk option dalam Select
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Props untuk komponen Select
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label untuk select */
  label?: string;
  
  /** Pesan error */
  error?: string;
  
  /** Pesan helper */
  helperText?: string;
  
  /** Options untuk select */
  options: SelectOption[];
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Required field indicator */
  required?: boolean;
}

/**
 * Komponen Select yang reusable dengan styling yang konsisten
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    error,
    helperText,
    options,
    placeholder,
    isLoading = false,
    required = false,
    className = '',
    id,
    ...props
  },
  ref
) => {
  // Generate unique ID jika tidak disediakan
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base select classes
  const baseSelectClasses = [
    'block',
    'w-full',
    'px-3',
    'py-2',
    'border',
    'rounded-md',
    'shadow-sm',
    'bg-white',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'transition-colors',
    'disabled:bg-gray-50',
    'disabled:text-gray-500',
    'disabled:cursor-not-allowed',
    'appearance-none'
  ];

  // Conditional classes berdasarkan state
  const stateClasses = error
    ? [
        'border-red-300',
        'text-red-900',
        'focus:ring-red-500',
        'focus:border-red-500'
      ]
    : [
        'border-gray-300',
        'text-gray-900',
        'focus:ring-blue-500',
        'focus:border-blue-500'
      ];

  // Combine all select classes
  const selectClasses = [
    ...baseSelectClasses,
    ...stateClasses,
    'pr-10', // Space for dropdown arrow
    className
  ].join(' ');

  // Label classes
  const labelClasses = [
    'block',
    'text-sm',
    'font-medium',
    'mb-2',
    error ? 'text-red-700' : 'text-gray-700'
  ].join(' ');

  // Helper/Error text classes
  const helperClasses = [
    'mt-1',
    'text-sm',
    error ? 'text-red-600' : 'text-gray-500'
  ].join(' ');

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label htmlFor={selectId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        {/* Select Field */}
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          disabled={isLoading || props.disabled}
          {...props}
        >
          {/* Placeholder Option */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {/* Loading Option */}
          {isLoading && (
            <option value="" disabled>
              Memuat data...
            </option>
          )}
          
          {/* Regular Options */}
          {!isLoading && options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className={`h-4 w-4 ${error ? 'text-red-400' : 'text-gray-400'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Helper Text or Error Message */}
      {(helperText || error) && (
        <p className={helperClasses}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

// Set display name untuk debugging
Select.displayName = 'Select';

export default Select;