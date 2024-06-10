import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startLoginWithEmailPassword, clearErrorMessage } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';
import { TextField } from '../../components/common/TextField';
import { ArrowButton } from '../../components/common/ArrowButton';
import { AuthErrorAlert } from '../components/AuthErrorAlert';
import { PROCESSING } from '../../store/auth/authStatusTypes';

const formData = {
  userName: '',
  password: '',
};

const formValidations = {
  userName: [
    (value) => value.length > 4 && value.length <= 20,
    'El nombre de usuario debe tener entre 4 y 20 caracteres.',
  ],
  password: [
    (value) => value.length >= 4 && value.length <= 20,
    'La contraseña debe tener entre 4 y 20 caracteres.',
  ],
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { authStatus, isFirstInit, errorMessage } = useSelector((state) => state.auth);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(false);

  const { userName, password, userNameValid, passwordValid, isFormValid, onInputChange } =
    useForm(formData, formValidations, errorMessage, clearErrorMessage);

  useEffect(() => {
    setIsCheckingAuthentication(authStatus === PROCESSING);
  }, [authStatus]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(clearErrorMessage());
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ userName, password }));
  };

  return (
    <AuthLayout isFirstInit={isFirstInit}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-8 justify-center items-center">
          <TextField
            id="userName"
            label="Nombre de usuario *"
            value={userName}
            onChange={onInputChange}
            error={formSubmitted && userNameValid}
          />
          <TextField
            id="password"
            label="Contraseña *"
            type="password"
            value={password}
            onChange={onInputChange}
            error={formSubmitted && passwordValid}
          />
          <AuthErrorAlert />
          <ArrowButton
            direction="right"
            className="w-full"
            text="Iniciar Sesión"
            type="submit"
            disabled={isCheckingAuthentication || !userName || !password}
          />
        </div>
      </form>
    </AuthLayout>
  );
};
