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
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import cartSlice from "./reducers/cartSlice";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import { cartApi } from "./api/cartApi";
import productSlice from "./reducers/productSlice";

const persistConfig = {
  key: "sneakers",
  storage,
};
const rootReducer = combineReducers({
  cart: cartSlice,
  user: userSlice,
  product: productSlice,
  [authApi.reducerPath]: authApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    cartApi.middleware,
    productApi.middleware,
  ],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
