import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { Home } from '../pages/Home';

export const AppRoutes = () => {
  sessionStorage.setItem('processingSignOn', false);

  return useRoutes([
    { path: '/', element: <PrivateRoute element={<Home />} /> },

    { path: '/auth/*', element: <AuthRoutes /> },
    { path: '/*', element: <Navigate to="/auth/login" /> },
  ]);
};
