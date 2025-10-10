import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/types";

type InitialStateType = {
  selectedUser: null | UserType;
};

const initialState: InitialStateType = {
  selectedUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<{ user: UserType }>) => {
      return { ...state, selectedUser: action.payload.user };
    },
    clearSelectedChat: (state) => {
      return { ...state, selectedUser: null };
    },
  },
});

export const { setSelectedChat, clearSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
