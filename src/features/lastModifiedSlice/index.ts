import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LastModified } from "./type";
import { revertAll } from "../globalActions";

export interface LastModifiedData {
    lastModifiedTime: string;
  }
export const initialState: LastModified = {
  lastModifiedTime: "",
};

const lastModifiedSlice = createSlice({
    name: "lastModified",
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        setTime(state, action: PayloadAction<LastModifiedData>){
            state.lastModifiedTime = action.payload.lastModifiedTime;
        },
        resetLastModified(state){
          state.lastModifiedTime = initialState.lastModifiedTime;
        }
    }
})
export const { setTime, resetLastModified } = lastModifiedSlice.actions;
export default lastModifiedSlice.reducer;