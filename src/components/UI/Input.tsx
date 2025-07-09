import React, { forwardRef } from 'react';

/**
 * Props untuk komponen Input
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label untuk input */
  label?: string;
  
  /** Pesan error */
  error?: string;
  
  /** Pesan helper */
  helperText?: string;
  
  /** Icon di sebelah kiri */
  leftIcon?: React.ReactNode;
  
  /** Icon di sebelah kanan */
  rightIcon?: React.ReactNode;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Required field indicator */
  required?: boolean;
}

/**
 * Komponen Input yang reusable dengan validasi dan styling yang konsisten
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    isLoading = false,
    required = false,
    className = '',
    id,
    ...props
  },
  ref
) => {
  // Generate unique ID jika tidak disediakan
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base input classes
  const baseInputClasses = [
    'block',
    'w-full',
    'px-3',
    'py-2',
    'border',
    'rounded-md',
    'shadow-sm',
    'placeholder-gray-400',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'transition-colors',
    'disabled:bg-gray-50',
    'disabled:text-gray-500',
    'disabled:cursor-not-allowed'
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

  // Icon padding classes
  const iconPaddingClasses = {
    left: leftIcon ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : ''
  };

  // Combine all input classes
  const inputClasses = [
    ...baseInputClasses,
    ...stateClasses,
    iconPaddingClasses.left,
    iconPaddingClasses.right,
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
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={error ? 'text-red-400' : 'text-gray-400'}>
              {leftIcon}
            </span>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={isLoading || props.disabled}
          {...props}
        />

        {/* Right Icon or Loading Spinner */}
        {(rightIcon || isLoading) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
              <span className={error ? 'text-red-400' : 'text-gray-400'}>
                {rightIcon}
              </span>
            )}
          </div>
        )}
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
Input.displayName = 'Input';

export default Input;