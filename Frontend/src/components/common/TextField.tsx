import React from 'react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export const TextField = ({
  id,
  label,
  type = 'text',
  onChange,
  value,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : type}
          value={value}
          aria-describedby={`${id}-error`}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm	
            ${
              error
                ? 'dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:border-red-600 dark:bg-gray-800 text-gray-900 dark:text-white'
                : disabled
                  ? 'bg-gray-100 text-gray-600 dark:bg-gray-300 cursor-not-allowed'
                  : 'dark:bg-gray-800 text-gray-900 dark:text-white'
            } rounded-lg border appearance-none focus:outline-none focus:ring-0 peer`}
          placeholder=" "
          onChange={onChange}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`absolute text-sm top-2 z-10 px-2 ${
            error
              ? 'text-red-600 dark:text-red-500'
              : disabled
                ? 'text-gray-400 dark:text-gray-500'
                : ''
          } bg-white dark:text-white dark:bg-gray-800 duration-300 transform -translate-y-4 scale-75 origin-[0] cursor-text
           peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
            start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
        >
          {label}
        </label>
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-1 flex items-center px-2"
            onClick={handleClickShowPassword}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
