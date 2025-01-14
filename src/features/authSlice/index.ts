import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./type";
import { revertAll } from "../globalActions";

export interface ITokenData {
  access: string;
  refresh: string;
}
export const initialState: AuthState = {
  logged_in: false,
  access: "",
  refresh: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    setToken(state, action: PayloadAction<ITokenData>) {
      state.logged_in = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    setAll(state, action: PayloadAction<AuthState>) {
      state = action.payload;
    },
    invalidateToken(state) {
      state.logged_in = false;
      state.access = "";
      state.refresh = "";
    },
  },
});

export const { setToken, setAll, invalidateToken } = authSlice.actions;
export default authSlice.reducer;
