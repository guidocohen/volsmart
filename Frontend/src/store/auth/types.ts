export interface AuthState {
    authStatus: string;
    id: string | null;
    userName: string | null;
    errorMessage: string | null;
    isFirstInit: boolean;
    validateUser: boolean;
    isOpenLogoutDialog: boolean;
    successMessage: string;
    jwt: string | null;
  }