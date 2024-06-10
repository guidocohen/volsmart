import { combineReducers } from 'redux';
import { authReducer } from '../auth/slice';
import { themeReducer } from '../theme/slice';
import { usersReducer } from '../users/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  theme: themeReducer,
});
