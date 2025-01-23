import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./type";
import { revertAll } from "../globalActions";
import { QuestionData } from "../../types/interface";


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
        setGridData(state, action: PayloadAction<QuestionData[]>){
            console.log('inside setgrid--',action.payload);
            
            state.gridData = action.payload;
        },
        deleteChat(state){
            state.messages = initialState.messages;
            state.gridData = initialState.gridData;
        }
    },
})

export const { setGlobalMessages, setGridData, deleteChat } = messageSlice.actions;
export default messageSlice.reducer;