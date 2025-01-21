import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authSlice/index';
import userReducer from '../features/userInfo/index';
import  LastModifiedReducer  from '../features/lastModifiedSlice/index';
import messagesReducer from '../features/messagesSlice/index';
import chatReducer from '../features/chatSlice/index';
// Import your reducers here

export function createReducer() {
  return combineReducers({
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    lastModified: LastModifiedReducer,
    messages: messagesReducer,
    chat: chatReducer,
    // Add your other reducers here
  });
}