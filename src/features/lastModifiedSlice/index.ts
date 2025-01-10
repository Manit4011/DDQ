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
        }
    }
})
export const { setTime } = lastModifiedSlice.actions;
export default lastModifiedSlice.reducer;