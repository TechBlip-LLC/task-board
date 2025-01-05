import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function Input({ label, error, required, className = '', ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm 
          ${error ? 'border-red-300' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}