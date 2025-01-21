import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./type";
import { revertAll } from "../globalActions";


export const initialState: MessageState = {
    messages:[],
    gridData:null,
};
const messageSlice = createSlice({
    name: 'messages',
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        setGlobalMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload;
        },
        setGridData(state, action: PayloadAction<any>){
            state.gridData = action.payload;
        }
    },
})

export const { setGlobalMessages, setGridData } = messageSlice.actions;
export default messageSlice.reducer;