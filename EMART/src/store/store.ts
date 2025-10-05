import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchQueries";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchQueries: searchReducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
