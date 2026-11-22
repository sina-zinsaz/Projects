import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-blue-200',
    secondary: 'bg-blue-50 text-primary hover:bg-blue-100',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};