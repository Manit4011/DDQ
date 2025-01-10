import { AuthState } from '../features/authSlice/type';
import { LastModified } from '../features/lastModifiedSlice/type';
import { UserState } from '../features/userInfo/type';

export interface RootState {
  auth: AuthState;
  user: UserState;
  lastModified: LastModified;
  
  // Add other slices' state here if you have more reducers
}