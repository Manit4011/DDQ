import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./type";
import { revertAll } from "../globalActions";
import { ChatbotResponseData } from "../../types/interface";


export const initialState: MessageState = {
    messages:[],
    gridData:null,
};
const messageSlice = createSlice({
    name: 'messages',
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        addGlobalMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload;
        },
        setGridData(state, action: PayloadAction<ChatbotResponseData>){
            state.gridData = action.payload;
        },
        deleteChat(state){
            state.messages = initialState.messages;
            state.gridData = initialState.gridData;
        }
    },
})

export const { addGlobalMessages, setGridData, deleteChat } = messageSlice.actions;
export default messageSlice.reducer;