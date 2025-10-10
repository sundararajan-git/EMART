import axiosInstance from "@/lib/axios/axios";
import { showErrorToast } from "@/lib/utils";
import type { ErrorToastType } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialState: number = 0;

export const getCartCounts = createAsyncThunk(
  "cart/getCartCounts",
  async () => {
    try {
      const { data } = await axiosInstance.get("/emart/cart-counts");
      console.log(data);
      switch (data.status) {
        case "FETCHED":
          return data.cartCount;
          break;
        default:
          console.warn("Unhandled status:", data.status);
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<{ value: number }>) => {
      return action.payload.value;
    },
    updateCart: (_, action: PayloadAction<{ value: number }>) => {
      return action.payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCartCounts.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { setCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
