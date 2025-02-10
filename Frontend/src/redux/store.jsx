import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productReducer from "./features/productSlice";
import userReducer from "./features/useSlice";
import { rootSaga } from "./sagas/rootSagas";
import alluserReducer from "./features/alluserSlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  products: productReducer,
  user: persistReducer(persistConfig, userReducer),
  allusers: alluserReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
