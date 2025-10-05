import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const searchQueries = createSlice({
  name: "searchQueries/",
  initialState,
  reducers: {
    upQueries: (state, action: PayloadAction<{ value: string[] }>) => {
      return [...state, ...action.payload.value];
    },
  },
});

export const { upQueries } = searchQueries.actions;
export default searchQueries.reducer;
