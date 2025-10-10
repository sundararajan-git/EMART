import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/types";

type InitialStateType = {
  selectedUser: null | UserType;
};

const initialState: InitialStateType = {
  selectedUser: null,
};

const favouritSlice = createSlice({
  name: "favourits",
  initialState: initialState,
  reducers: {
    setSelectedFavourit: (state, action: PayloadAction<{ user: UserType }>) => {
      return { ...state, selectedUser: action.payload.user };
    },
    clearSelectedFavourit: (state) => {
      return { ...state, selectedUser: null };
    },
  },
});

export const { setSelectedFavourit, clearSelectedFavourit } =
  favouritSlice.actions;

export default favouritSlice.reducer;
