import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import {
  startCreatingUserWithEmailPassword,
  clearErrorMessage,
  setValidateUser,
} from '../../store/auth';
import { TextField } from '../../components/common/TextField';
import { AuthErrorAlert } from '../components/AuthErrorAlert';
import { ArrowButton } from '../../components/common/ArrowButton';
import { PROCESSING } from '../../store/auth/authStatusTypes';

const formData = {
  password: '',
  userName: '',
};

const formValidations = {
  userName: [
    (value) => value.length > 4,
    'El nombre de usuario debe tener más de 4 caracteres.',
  ],
  password: [(value) => value.length > 4, 'La contraseña debe ser mayor a 4 caracteres.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { authStatus, validateUser, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => authStatus === PROCESSING, [authStatus]);

  const {
    formState,
    userName,
    password,
    onInputChange,
    isFormValid,
    userNameValid,
    passwordValid,
  } = useForm(formData, formValidations, errorMessage, clearErrorMessage);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(clearErrorMessage());
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  useEffect(() => {
    if (validateUser) {
      Swal.fire({
        title: '¡Registrado!',
        text: 'Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonColor: '#2d3451',
        confirmButtonText: '<b>¡Ok!</b>',
      }).then(() => navigate(`/auth/login`));
      dispatch(setValidateUser(false));
    }
  }, [validateUser]);

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-8 justify-center items-center">
          <TextField
            id="userName"
            label="Nombre de usuario *"
            value={userName}
            onChange={onInputChange}
            error={formSubmitted && userNameValid}
          />
          <div className="w-full dark:text-white">
            <TextField
              id="password"
              label="Contraseña *"
              type="password"
              value={password}
              onChange={onInputChange}
              error={formSubmitted && passwordValid}
            />
            <PasswordStrengthBar
              // Barra
              style={{ width: '100%', marginTop: '1rem' }}
              password={password}
              minLength={6}
              scoreWords={['', '', '', '', '']}
              shortScoreWord={''}
            />
            <PasswordStrengthBar
              // Nivel de seguridad
              style={{ width: '100%', display: 'flex' }}
              password={password}
              minLength={6}
              scoreWords={[
                'Seguridad muy baja',
                'Seguridad baja',
                'Seguridad media',
                'Seguridad alta',
                'Seguridad muy alta',
              ]}
              shortScoreWord={''}
            />
          </div>
          <AuthErrorAlert />
          <ArrowButton
            direction="right"
            className="w-full"
            text="Registrarme"
            type="submit"
            disabled={isCheckingAuthentication || !userName || !password}
          />
        </div>
      </form>
    </AuthLayout>
  );
};
