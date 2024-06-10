import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { setErrorMessage } from '../../store/auth';
import { RootState } from '../../store/reducers/types';

export const AuthErrorAlert = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {errorMessage && (
        <div
          id="alert"
          className="flex w-full items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-400"
          role="alert"
        >
          <InformationCircleIcon className="h-6 w-6 text-red-400" />
          <div className="ms-3 text-sm font-medium">
            <span className="sr-only">Info</span>
            {errorMessage || 'Hubo un error. Por favor, intentá nuevamente.'}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-200"
            data-dismiss-target="#alert"
            onClick={() => dispatch(setErrorMessage(null))}
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      )}
    </>
  );
};
