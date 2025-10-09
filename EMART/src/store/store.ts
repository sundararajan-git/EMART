import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchQueries";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchQueries: searchReducer,
    cart: cartReducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
