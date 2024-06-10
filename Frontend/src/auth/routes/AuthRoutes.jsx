import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PrivateRoute } from '../../router/PrivateRoute';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<PrivateRoute element={<LoginPage />} />} />
      <Route path="register" element={<PrivateRoute element={<RegisterPage />} />} />

      <Route path="/*" element={<Navigate to="login" />} />
    </Routes>
  );
};
