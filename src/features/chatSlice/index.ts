import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatNameState, PageEnum } from "./type";
import { revertAll } from "../globalActions";


export const initialState: ChatNameState = {
    page: "chat",
    chatName: 'Chatbot',
};
const chatNameSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        setPage(state, action: PayloadAction<PageEnum>) {
            state.page = action.payload;
        },
        setChatName(state,action:PayloadAction<string>){
            state.chatName = action.payload;
        }
    },
})

export const { setPage, setChatName } = chatNameSlice.actions;
export default chatNameSlice.reducer;