import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpenLogoutDialog } from '../store/auth';
import { toggleUserDetail } from '../store/users/slice';
import { RootState } from '../store/reducers/types';

export const Layout = ({ children }) => {
  const { isOpenLogoutDialog } = useSelector((state: RootState) => state.auth);
  const { isUserDetailOpen } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();

  const handleCloseSideMenuOrModal = () => {
    isOpenLogoutDialog && dispatch(toggleOpenLogoutDialog());
    isUserDetailOpen && dispatch(toggleUserDetail());
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white w-full h-full min-h-screen antialiased">
      <div
        className={`${
          isUserDetailOpen || isOpenLogoutDialog
            ? 'bg-black bg-opacity-50 fixed z-20 w-screen h-screen'
            : 'hidden'
        }`}
        onClick={handleCloseSideMenuOrModal}
      />
      {children}
    </div>
  );
};
