import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export const WarningAlert = ({ error, clearError }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error.error) return;
    const timerId = setTimeout(() => dispatch(clearError()), 5000);
    return () => clearTimeout(timerId);
  }, [error.errorMessage]);

  return (
    <>
      {error.error && (
        <div
          className="absolute top-20 right-10 shadow-md rounded-sm items-center w-96 z-20 p-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-800"
          role="alert"
        >
          <div className="flex flex-row items-center">
            <InformationCircleIcon className="h-6 w-6 text-yellow-400" />
            <div className="w-full ms-3 text-sm font-medium">
              {error.errorMessage || 'Operación fallida'}
            </div>

            <button
              type="button"
              className="rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:bg-transparent dark:hover:text-yellow-400 dark:hover:bg-gray-700 text-yellow-500 bg-yellow-50 hover:bg-yellow-200 hover:text-gray-900"
              onClick={() => dispatch(clearError())}
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
