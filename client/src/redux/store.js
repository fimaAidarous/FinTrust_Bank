import {  combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import accountReducer from './accountSlice';
import transactionReducer from './transactionSlice';
import transferReducer from './transferSlice';
import loanReducer from './LoanSlice';
import cardReducer from './cardSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer,
    transfer:transferReducer,
    loan:loanReducer,
    card:cardReducer,
});

const persistConfig = {
  key:'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);