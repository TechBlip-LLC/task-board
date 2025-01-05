import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm 
          ${error ? 'border-red-300' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}