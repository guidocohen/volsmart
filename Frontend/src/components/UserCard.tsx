import React from 'react';
import { MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useUsers } from '../hooks/useUsers';

export const UserCard = ({ user }) => {
  const { showUserDetail } = useUsers();
  return (
    <div
      onClick={() => showUserDetail(user)}
      className={`group my-3 flex flex-col text-left w-full overflow-hidden rounded-lg border shadow-sm
        duration-200 hover:scale-105 cursor-pointer dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white`}
    >
      <div className="flex flex-col justify-between py-3 pl-3 pr-1">
        <div className="mb-2">
          <div
            className="text-md tracking-tight font-semibold text-slate-900 overflow-hidden -webkit-box-orient-vertical truncate-1-lines dark:text-white"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
            title={user?.user_name?.charAt(0).toUpperCase() + user?.user_name?.slice(1)}
          >
            {user?.user_name?.charAt(0).toUpperCase() + user?.user_name?.slice(1)}
          </div>
        </div>
        <div className="mb-2">
          <div
            className="text-md tracking-tight text-slate-500 overflow-hidden -webkit-box-orient-vertical truncate-2-lines dark:text-slate-400"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            title={user?.direccion}
          >
            <MapPinIcon className="w-4 h-4 inline-block mr-1" />
            Dirección:{' '}
            {user?.direccion?.charAt(0).toUpperCase() + user?.direccion?.slice(1)}
          </div>
        </div>
        <div
          className="text-md tracking-tight text-slate-500 overflow-hidden -webkit-box-orient-vertical truncate-2-lines dark:text-slate-400"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
          title={user?.direccion}
        >
          <TruckIcon className="w-4 h-4 inline-block mr-1" />
          Auto: {user?.auto}
        </div>
      </div>
    </div>
  );
};
