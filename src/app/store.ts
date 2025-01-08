import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore,  PERSIST,  PURGE, REHYDRATE, } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { createReducer } from "./rootReducer";
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root', // Key for localStorage
  storage: storageSession,
  whitelist: ['auth','user'],
  // blacklist:[''],
};
const persistedReducer = persistReducer(persistConfig, createReducer());

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific actions
        ignoredActions: [PERSIST, REHYDRATE, PURGE],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
