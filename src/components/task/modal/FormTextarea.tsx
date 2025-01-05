interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function FormTextarea({ label, error, icon, className = '', ...props }: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <textarea
          className={`block w-full rounded-lg border-gray-300 
            ${icon ? 'pl-10' : 'pl-4'}
            transition-all duration-200
            focus:border-blue-500 focus:ring-blue-500 
            disabled:bg-gray-50 disabled:text-gray-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-fadeIn">{error}</p>
      )}
    </div>
  );
}