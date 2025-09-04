// lib/features/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  manufacturer?: string | number;
  model?: string | number;
  year?: string | number;
  [key: string]: unknown;
};

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FilterState>>) {
      Object.assign(state, action.payload);
    },
    clearFilter() {
      return {};
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
