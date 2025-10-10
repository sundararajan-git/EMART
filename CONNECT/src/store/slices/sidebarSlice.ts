import { navRoute } from "@/lib/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navRoute: navRoute,
  activeItem: navRoute[0],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    updateRoute: (state, action) => {
      return { ...state, activeItem: action.payload };
    },
  },
});

export const { updateRoute } = sidebarSlice.actions;

export default sidebarSlice.reducer;
