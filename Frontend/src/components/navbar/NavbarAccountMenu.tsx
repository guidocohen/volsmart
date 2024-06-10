import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Avatar } from '../common/Avatar';
import { navItems } from './navItems';
import { toggleOpenLogoutDialog } from '../../store/auth';

export const NavbarAccountMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClickAccount = (text, to, close) => {
    if (text === 'Cerrar sesión') {
      dispatch(toggleOpenLogoutDialog());
    } else {
      navigate(to);
    }
    close();
  };

  return (
    <Popover as="div" className="relative inline-block text-left">
      <PopoverButton
        className={
          'inline-flex w-full md:w-auto justify-center items-center gap-x-1.5 rounded-lg pr-1.5 pl-3 py-2 text-sm font-semibold hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
        }
      >
        <Avatar imageURL={null} />
        <ChevronDownIcon className="mr-1 h-5 w-5" />
      </PopoverButton>
      {/* TODO button "Ingresar" si no está logueado*/}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <PopoverPanel className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:ring-gray-700 dark:text-gray-200">
          {({ close }) => (
            <div className="flex flex-col py-1">
              {navItems.map(({ text, to }) => (
                <button
                  key={text}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600"
                  onClick={() => handleOnClickAccount(text, to, close)}
                >
                  {text === 'Cerrar sesión' ? 'Cerrar sesión' : text}
                </button>
              ))}
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
