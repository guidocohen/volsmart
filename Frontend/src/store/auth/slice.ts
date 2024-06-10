import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTHENTICATED, PROCESSING, NOT_AUTHENTICATED } from './authStatusTypes';
import { AuthState } from './types';

const initialState: AuthState = {
  authStatus: sessionStorage.getItem('jwt') ? AUTHENTICATED : NOT_AUTHENTICATED,
  id: null,
  userName: null,
  errorMessage: null,
  isFirstInit: true,
  validateUser: false,
  isOpenLogoutDialog: false,
  successMessage: '',
  jwt: sessionStorage.getItem('jwt') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userName: string; jwt: string }>) => {
      state.authStatus = AUTHENTICATED;
      state.userName = action.payload.userName;
      state.jwt = action.payload.jwt;
      state.errorMessage = null;
      sessionStorage.setItem('processingSignOn', 'false');
      sessionStorage.setItem('jwt', action.payload.jwt);
    },
    logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
      state.authStatus = NOT_AUTHENTICATED;
      state.userName = null;
      state.errorMessage = action.payload?.errorMessage || null;
      state.isFirstInit = false;
      state.validateUser = false;
      state.isOpenLogoutDialog = false;
      state.jwt = null;
      state.successMessage = '';
      sessionStorage.removeItem('jwt');
    },
    processingCredentials: (state) => {
      state.authStatus = PROCESSING;
      sessionStorage.setItem('processingSignOn', 'true');
    },
    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.authStatus = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    isFirstInitFalse: (state) => {
      state.isFirstInit = false;
    },
    toggleOpenLogoutDialog: (state) => {
      state.isOpenLogoutDialog = !state.isOpenLogoutDialog;
    },
    setValidateUser: (state, action: PayloadAction<boolean>) => {
      state.validateUser = action.payload;
      if (action.payload) {
        state.authStatus = NOT_AUTHENTICATED;
        sessionStorage.setItem('processingSignOn', 'false');
      }
    },
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    },
    resetAuthState: () => initialState,
  },
});

export const {
  login,
  logout,
  processingCredentials,
  setAuthStatus,
  setErrorMessage,
  clearErrorMessage,
  isFirstInitFalse,
  toggleOpenLogoutDialog,
  setValidateUser,
  setUserName,
  clearSuccessMessage,
  resetAuthState,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
