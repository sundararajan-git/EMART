import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/types";

type InitialStateType = {
  selectedUser: null | UserType;
};

const initialState: InitialStateType = {
  selectedUser: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState: initialState,
  reducers: {
    setSelectedStatus: (state, action: PayloadAction<{ user: UserType }>) => {
      return { ...state, selectedUser: action.payload.user };
    },

    clearSelectedStatus: (state) => {
      return { ...state, selectedUser: null };
    },
  },
});

export const { setSelectedStatus, clearSelectedStatus } = statusSlice.actions;

export default statusSlice.reducer;
