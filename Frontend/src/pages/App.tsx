import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { AppRoutes } from '../router/AppRoutes';
import { LogoutDialog } from '../auth/components/LogoutDialog';
import { setTheme } from '../store/theme/slice';
import './css/App.css';
import { Navbar } from '../components/navbar/Navbar';

export const App = () => {
  const dispatch = useDispatch();
  dispatch(setTheme());

  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <AppRoutes />
        <LogoutDialog />
      </Layout>
    </BrowserRouter>
  );
};
