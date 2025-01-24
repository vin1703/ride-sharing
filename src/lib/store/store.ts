import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import passengerReducer from '../passengerSlice';
import driverReducer from '../driverSlice';

// Combine Reducers
const rootReducer = combineReducers({
  passenger: passengerReducer,
  driver: driverReducer,
});

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
};

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required to handle non-serializable values like localStorage
      }),
  });
};

// Persistor
export const persistor = persistStore(makeStore());

// Infer the type of the store
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
