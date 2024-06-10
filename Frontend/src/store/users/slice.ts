import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState, User, UsersState } from './types';

const initialState: UsersState = {
  usersCount: 0,
  isUserDetailOpen: false,
  displayedUsers: null,
  users: null,
  searchByNameValue: '',
  isLoadingUsers: false,
  error: {
    error: false,
    errorMessage: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state) => {
      if (state.users) {
        state.displayedUsers = state.users.filter(
          (user) =>
            user.user_name
              .toLowerCase()
              .includes(state.searchByNameValue.toLowerCase().trim()) ||
            user.direccion
              .toLowerCase()
              .includes(state.searchByNameValue.toLowerCase().trim()) ||
            user.auto
              .toLowerCase()
              .includes(state.searchByNameValue.toLowerCase().trim()),
        );
      }
    },
    setDisplayedUsers: (state, action: PayloadAction<User[]>) => {
      state.displayedUsers = action.payload;
    },
    setUsersCount: (state, action: PayloadAction<number>) => {
      state.usersCount = action.payload;
    },
    setUserToShow: (state, action: PayloadAction<User>) => {
      state.userToShow = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSearchByNameValue: (state, action: PayloadAction<string>) => {
      state.searchByNameValue = action.payload;
    },
    setIsLoadingUsers: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUsers = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.error = {
        error: action.payload.error,
        errorMessage: action.payload.errorMessage + '. Intentá nuevamente más tarde.',
      };
    },
    clearError: (state) => {
      state.error = {
        error: false,
        errorMessage: '',
      };
    },
    toggleUserDetail: (state) => {
      state.isUserDetailOpen = !state.isUserDetailOpen;
    },
    resetUsersState: () => initialState,
  },
});

export const {
  filterUsers,
  setDisplayedUsers,
  setUsersCount,
  setUserToShow,
  setUsers,
  setSearchByNameValue,
  setIsLoadingUsers,
  setError,
  clearError,
  toggleUserDetail,
  resetUsersState,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
