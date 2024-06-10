// PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularLoader } from '../components/common/CircularLoader';
import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  PROCESSING,
} from '../store/auth/authStatusTypes';
import { Navbar } from '../components/navbar/Navbar';
import { setAuthStatus } from '../store/auth';
import React, { useEffect } from 'react';
import { RootState } from '../store/reducers/types';

export const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const dispatch = useDispatch();
  const { authStatus, jwt } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (jwt) dispatch(setAuthStatus(AUTHENTICATED));
  }, [jwt, dispatch]);

  const pathname = window.location.pathname;

  if (authStatus === NOT_AUTHENTICATED && pathname.includes('/auth/')) {
    return <>{element}</>;
  }
  if (authStatus === AUTHENTICATED && pathname.includes('/auth/login')) {
    return <Navigate to="/" replace />;
  }

  switch (authStatus) {
    case PROCESSING:
      return <CircularLoader />;
    case AUTHENTICATED: {
      return <>{element}</>;
    }
    default:
      return <Navigate to="/auth/login" replace />;
  }
};
