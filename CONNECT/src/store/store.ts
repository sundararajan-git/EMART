import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import contactReducer from "./slices/contactSlice";
import favouritReducer from "./slices/favouritSlice";
import chatReducer from "./slices/chatSlice";
import statusReducer from "./slices/statusSlice";
import sidebarReducer from "./slices/sidebarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    status: statusReducer,
    favourit: favouritReducer,
    contact: contactReducer,
    sidebar: sidebarReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisapatch = typeof store.dispatch;
export default store;
