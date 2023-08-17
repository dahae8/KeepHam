import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
  id: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ id: string }>) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
    }
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
