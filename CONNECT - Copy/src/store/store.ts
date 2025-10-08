import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisapatch = typeof store.dispatch;
export default store;
