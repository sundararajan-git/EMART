import type { UserType } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState extends UserType {
  isVerified: boolean;
  authLoading: boolean;
}

const initialState: AuthState = {
  isVerified: false,
  authLoading: true,
} as AuthState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ value: UserType }>) => {
      Object.assign(state, action.payload.value);
      state.isVerified = true;
      state.authLoading = false;
    },
    clearUser: (state) => {
      state.isVerified = false;
      state.authLoading = false;
      Object.keys(state).forEach((key) => {
        delete (state as any)[key];
      });
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;
