import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { UserCard } from '../components/UserCard';
import { WarningAlert } from '../components/common/WarningAlert';
import { SkeletonCard } from '../components/SkeletonCard';
import './css/Home.css';
import '../components/css/InfiniteLoader.css';
import { fetchUsers, syncUsers } from '../store/users/thunks';
import { clearError, filterUsers, setSearchByNameValue } from '../store/users/slice';
import { ArrowButton } from '../components/common/ArrowButton';
import { UserDetail } from '../components/UserDetail';

export const Home = () => {
  const dispatch = useDispatch();
  const { users, displayedUsers, isLoadingUsers, error } = useSelector(
    (state) => state.users,
    shallowEqual,
  );
  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers({ jwt }));
    }
  }, [users]);

  const clearSearch = () => {
    dispatch(setSearchByNameValue(''));
    displayedUsers && dispatch(filterUsers());
  };

  return (
    <>
      <UserDetail />
      <WarningAlert error={error} clearError={clearError} />
      <div className="flex justify-center w-full h-full pt-[6.3rem] lg:pt-16">
        <div className="flex flex-col justify-center mt-10 gap-5 mx-5 lg:mx-20 max-w-3xl w-full">
          <div className="flex flex-row gap-5 justify-center mt-5">
            <ArrowButton
              direction="loop"
              text="Sincronizar Usuarios"
              type="button"
              disabled={isLoadingUsers}
              onClick={() => dispatch(syncUsers({ jwt }))}
            />
            <ArrowButton
              direction="loop"
              text="Recargar Usuarios"
              type="button"
              disabled={isLoadingUsers}
              onClick={() => dispatch(fetchUsers({ jwt }))}
            />
          </div>
          {isLoadingUsers
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
            : users &&
              displayedUsers &&
              displayedUsers.length > 0 &&
              displayedUsers.map((user) => <UserCard key={user.id} user={user} />)}
          {!isLoadingUsers && (!displayedUsers || displayedUsers.length === 0) && (
            <div className="flex flex-col items-center mx-auto">
              <ExclamationCircleIcon className="h-20 w-20 text-blue-500 mt-32" />
              <p className="text-lg text-gray-400 p-4">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
