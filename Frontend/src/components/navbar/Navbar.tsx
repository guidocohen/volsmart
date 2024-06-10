import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { DarkSwitcher } from './DarkSwitcher';
import { InfiniteLoader } from '../common/InfiniteLoader';
import { AUTHENTICATED } from '../../store/auth/authStatusTypes';
import { SearchInput } from './SearchInput';
import { BrandBackButton } from './BrandBackButton';
import { NavbarAccountMenu } from './NavbarAccountMenu';
import { filterUsers, setSearchByNameValue } from '../../store/users/slice';
import { RootState } from '../../store/reducers/types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const { searchByNameValue, isLoadingUsers } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    setIsUserAuthenticated(location.pathname === '/' && authStatus === AUTHENTICATED);
  }, [location.pathname, authStatus]);

  return (
    <nav className="h-16 fixed z-10 top-0 w-screen text-md font-light gap-6 whitespace-nowrap bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="flex lg:flex-row items-center justify-between px-5 py-1 border-b">
        <BrandBackButton setSearchByNameValue={setSearchByNameValue} />
        {isUserAuthenticated && (
          <SearchInput
            isLoadingUsers={isLoadingUsers}
            searchByNameValue={searchByNameValue}
            setSearchByNameValue={setSearchByNameValue}
            filterUsers={filterUsers}
          />
        )}
        <div className="flex flex-row justify-end lg:w-4/12">
          <DarkSwitcher />
          {authStatus === AUTHENTICATED && <NavbarAccountMenu />}
        </div>
      </div>

      {isLoadingUsers && <InfiniteLoader />}
    </nav>
  );
};
