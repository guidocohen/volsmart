import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';

export const SearchInput = ({
  isLoadingUsers,
  searchByNameValue,
  setSearchByNameValue,
  filterUsers,
}) => {
  const dispatch = useDispatch();

  const handleChangeSearch = (value) => {
    dispatch(setSearchByNameValue(value));
    dispatch(filterUsers());
  };

  return (
    <div className="flex relative w-full h-12">
      <label htmlFor="simple-search" className="sr-only">
        Buscar usuario por nombre, dirección o auto
      </label>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        className={`${
          isLoadingUsers
            ? 'dark:bg-gray-500 text-gray-800 cursor-not-allowed'
            : 'dark:bg-gray-700 text-black dark:text-white'
        } bg-white focus:border block w-full pl-10 p-2 text-md rounded-lg border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 focus:shadow-sm focus:outline-none`}
        placeholder="Buscar usuario por nombre, dirección o auto"
        value={searchByNameValue}
        onChange={(event) => handleChangeSearch(event.target.value)}
        disabled={isLoadingUsers}
      />
      {searchByNameValue && searchByNameValue.length > 0 && (
        <button
          className="absolute right-3.5 top-1/4 focus:outline-none h-6 w-6 inline-flex items-center justify-center mt-0.5
              text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => handleChangeSearch('')}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
