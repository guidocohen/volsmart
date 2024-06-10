import { AuthState } from '../auth/types';
import { ThemeState } from '../theme/types';
import { UsersState } from '../users/types';

export interface RootState {
  auth: AuthState;
  users: UsersState;
  theme: ThemeState;
}
