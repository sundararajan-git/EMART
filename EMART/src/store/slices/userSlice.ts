import type { userType } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: userType = {} as userType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<{ value: userType }>) => {
      return action.payload.value;
    },
    updateUser: (
      state,
      action: PayloadAction<{ value: Partial<userType> }>
    ) => {
      if (!state) return state;
      return { ...state, ...action.payload.value };
    },
  },
});

export const { updateUser, setUser } = userSlice.actions;
export default userSlice.reducer;
