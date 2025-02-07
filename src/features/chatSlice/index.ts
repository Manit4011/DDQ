import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, PageEnum, SizeEnum } from "./type";
import { revertAll } from "../globalActions";


export const initialState: ChatState = {
    page: "chat",
    chatName: 'Chatbot',
    size: "expanded",
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        setPage(state, action: PayloadAction<PageEnum>) {
            state.page = action.payload;
        },
        setChatName(state,action:PayloadAction<string>){
            state.chatName = action.payload;
        },
        setPageSize(state, action: PayloadAction<SizeEnum>){
            state.size = action.payload;
        }
    },
})

export const { setPage, setChatName, setPageSize } = chatSlice.actions;
export default chatSlice.reducer;