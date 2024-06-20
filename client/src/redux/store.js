// store.js

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'; // Importez le type de stockage que vous souhaitez utiliser

import userReducer from './userSlice';
import adminSlice from './adminSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // whitelist: ['user'], 
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer= persistReducer(persistConfig, adminSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

//  export const store = configureStore({
//    reducer: persistedUserReducer,
//    middleware: (getDefaultMiddleware) =>
//    getDefaultMiddleware({
//    serializableCheck: {
//    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
//   }),
// });

export const persistor = persistStore(store);