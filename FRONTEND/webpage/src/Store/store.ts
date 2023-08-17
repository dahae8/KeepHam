/* eslint-disable prefer-const */
import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import tab from "./tabSlice";

export const store = configureStore({
  reducer: {
    user,
    tab,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
