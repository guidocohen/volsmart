import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Spinner } from './Spinner';
import { RootState } from '../../store/reducers/types';
import { useSelector } from 'react-redux';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

const buttonStyle = {
  backgroundColor: '#3B82A6',
  color: 'white',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  borderRadius: '0.375rem',
  textAlign: 'center',
  cursor: 'pointer',
  border: 'none',
};

const buttonHoverStyle = {
  backgroundColor: '#256D8D',
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  text,
  className = '',
  type = 'button',
  disabled,
  isLoading = false,
}) => {
  const { darkSide } = useSelector((state: RootState) => state.theme);

  return (
    <button
      type={type}
      className={`${className} group inline-flex items-center justify-center rounded-md px-6 py-4 text-lg font-semibold transition-all duration-200 ease-in-out
      ${
        disabled
          ? 'bg-gray-600 text-gray-200 cursor-not-allowed dark:bg-gray-300'
          : 'bg-gray-800 text-white focus:shadow hover:bg-primary-700 dark:bg-primary dark:hover:bg-primary-800'
      }
      `}
      style={{ backgroundColor: disabled ? 'gray' : buttonStyle.backgroundColor }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = disabled
          ? 'gray'
          : buttonHoverStyle.backgroundColor;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = disabled
          ? 'gray'
          : buttonStyle.backgroundColor;
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <Spinner />}
      {direction === 'left' && !isLoading && (
        <ArrowLeftIcon
          className={`${disabled ? '' : 'group-hover:mr-6'} mr-4 h-5 w-5 transition-all`}
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
      {!isLoading && text}
      {direction === 'right' && !isLoading && (
        <ArrowRightIcon
          className={`${disabled ? '' : 'group-hover:ml-6'} ml-4 h-5 w-5 transition-all`}
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
    </button>
  );
};
