import type { UserType } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserType = {} as UserType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<{ value: UserType }>) => {
      return action.payload.value;
    },
    updateUser: (state, action: PayloadAction<{ value: UserType }>) => {
      return { ...state, ...action.payload.value };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
