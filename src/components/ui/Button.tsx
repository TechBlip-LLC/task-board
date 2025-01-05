import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium border rounded-md 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}