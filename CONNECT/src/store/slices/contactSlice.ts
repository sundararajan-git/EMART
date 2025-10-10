import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/types";

type InitialStateType = {
  selectedUser: null | UserType;
  contactList: UserType[];
};

const initialState: InitialStateType = {
  selectedUser: null,
  contactList: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    setSelectedContact: (state, action: PayloadAction<UserType>) => {
      return { ...state, selectedUser: action.payload };
    },
    clearSelectedContact: (state) => {
      return { ...state, selectedUser: null };
    },
    updateContactList: (state, action: PayloadAction<UserType[]>) => {
      return { ...state, contactList: action.payload };
    },
  },
});

export const { setSelectedContact, clearSelectedContact, updateContactList } =
  contactSlice.actions;

export default contactSlice.reducer;
