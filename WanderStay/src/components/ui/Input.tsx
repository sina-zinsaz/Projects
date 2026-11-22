import type { InputHTMLAttributes, FC, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3.5 text-gray-400">{icon}</span>}
        <input
          className={`w-full py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-sm ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};