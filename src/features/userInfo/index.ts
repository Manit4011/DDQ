// counterSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserState } from './type';
import { IUserData } from '../../constants/constant';
import { revertAll } from '../globalActions';
// import { revertAll } from '../globalActions';

export const initialState: UserState = {
  username: '',
  user_id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setUser(state, action: PayloadAction<IUserData>) {
      state.username = action.payload.username;
      state.user_id = action.payload.user_id;
    },
    invalidateUser(state) {
      state.username = initialState.username;
    },
  },
});

export const { setUser, invalidateUser } = userSlice.actions;
export default userSlice.reducer;

// export const { actions: counterUpdateAction, reducer: counterReducer } = counterSlice
// export const useCounterSlice = () => {
//     return { actions: counterSlice.actions}
// }
