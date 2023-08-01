import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

interface UserState {
  isLoggedIn: boolean,
  name: string | null,
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{name: string}>) => {
      state.isLoggedIn = true
      state.name = action.payload.name
    }
  }
})

export const { signIn } = userSlice.actions

export const selectUser = (state: RootState) => state.user.isLoggedIn

export default userSlice.reducer