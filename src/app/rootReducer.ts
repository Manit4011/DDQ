import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authSlice/index';
import userReducer from '../features/userInfo/index';
import  LastModifiedReducer  from '../features/lastModifiedSlice/index';
// Import your reducers here

export function createReducer() {
  return combineReducers({
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    lastModified: LastModifiedReducer,
    // Add your other reducers here
  });
}