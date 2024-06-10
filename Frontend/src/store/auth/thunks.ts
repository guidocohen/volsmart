import { logout, login, setValidateUser, processingCredentials } from '.';
import { registerUser, loginLocal } from '../../auth/helpers';
import { resetUsersState } from '../users/slice';

export const signOn = ({
  dispatch,
  user,
}: {
  dispatch;
  user: { data: string; ok: boolean; userName: string | null };
}) => {
  const jwt = user.data;
  console.log('🚀 ~ signOn ~ jwt:', jwt);

  if (!user.ok) {
    return dispatch(
      logout({
        errorMessage:
          'No se pudieron obtener los datos de tu usuario. Por favor, intentá de nuevo más tarde.',
      }),
    );
  }

  dispatch(
    login({
      ...user,
      jwt,
      userName: '',
    }),
  );
};

export const startCreatingUserWithEmailPassword = ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  return async (dispatch) => {
    dispatch(processingCredentials());

    const user = await registerUser({ userName, password });
    if (!user.ok) return dispatch(logout(user));

    dispatch(logout({}));
    dispatch(setValidateUser(true));
    //await signOn({ dispatch, user });
  };
};

export const startLoginWithEmailPassword = ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  return async (dispatch) => {
    try {
      dispatch(processingCredentials());

      const user = await loginLocal({ userName, password });
      if (!user.ok) return dispatch(logout({}));

      await signOn({ dispatch, user: { ...user, userName } });
    } catch (error) {
      dispatch(logout({ errorMessage: "Credenciales inválidas. Por favor, intentá nuevamente." }));
    }
  };
};

const resetStateAndLogout = (dispatch, errorMessage) => {
  dispatch(resetUsersState());
  dispatch(logout(errorMessage));
};

export const startLogout = (errorMessage) => {
  return async (dispatch) => {
    resetStateAndLogout(dispatch, errorMessage);
  };
};
