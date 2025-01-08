import { AuthState } from '../features/authSlice/type';
import { UserState } from '../features/userInfo/type';

export interface RootState {
  auth: AuthState;
  user: UserState;
  
  // Add other slices' state here if you have more reducers
}