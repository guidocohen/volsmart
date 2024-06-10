import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { logout, startLogout } from '../auth';
import { getUsers, postSyncUsers } from '../../api/users';
import {
  clearError,
  setDisplayedUsers,
  setError,
  setIsLoadingUsers,
  setUsers,
  setUsersCount,
} from './slice';
import { RootState } from '../reducers/types';

type AppThunk = ThunkAction<void, RootState, unknown, any>;

const handleErrorResponse = (dispatch: any, error: any, errorMessage: string) => {
  if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
    dispatch(
      startLogout({
        errorMessage: 'Credenciales inválidas. Por favor, intentá nuevamente.',
      }),
    );
    return;
  }
  dispatch(setError({ error: true, errorMessage }));
  dispatch(setIsLoadingUsers(false));
};

const dispatchUsers = (dispatch, data) => {
  dispatch(setUsers(data));
  dispatch(setDisplayedUsers(data));
  dispatch(setUsersCount(data.length));

  dispatch(setError({ error: false, errorMessage: '' }));
  dispatch(setIsLoadingUsers(false));
};

export const fetchUsers =
  ({ jwt }: { jwt: string }) =>
  async (dispatch) => {
    try {
      dispatch(clearError());
      dispatch(setIsLoadingUsers(true));

      const response = await getUsers({ jwt });
      if (response.status === axios.HttpStatusCode.Unauthorized) {
        dispatch(
          startLogout({
            errorMessage: 'Credenciales inválidas. Por favor, intentá nuevamente.',
          }),
        );
        return;
      }
      if (!response.ok) throw new Error();

      dispatchUsers(dispatch, response.data);
    } catch (error) {
      handleErrorResponse(dispatch, error, 'No se pudieron obtener usuarios');
    }
  };

export const syncUsers =
  ({ jwt }: { jwt: string }) =>
  async (dispatch) => {
    try {
      dispatch(clearError());
      dispatch(setIsLoadingUsers(true));

      const response = await postSyncUsers({ jwt });
      if (response.status === axios.HttpStatusCode.Unauthorized) {
        dispatch(
          startLogout({
            errorMessage: 'Credenciales inválidas. Por favor, intentá nuevamente.',
          }),
        );
        return;
      }
      if (!response.ok) throw new Error();

      dispatchUsers(dispatch, response.data);
    } catch (error) {
      handleErrorResponse(dispatch, error, 'No se pudieron sincronizar los usuarios');
    }
  };
