import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface TabState {
  idx: number;
}

const initialState: TabState = {
  idx: 0,
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<{ setIdx: number }>) => {
      state.idx = action.payload.setIdx;
    },
  },
});

export const { switchTab } = tabSlice.actions;

export const selectIdx = (state: RootState) => state.tab.idx;

export default tabSlice.reducer;
