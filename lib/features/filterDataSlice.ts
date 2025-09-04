// lib/features/filterDataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Option = { id?: string | number; name?: string } | string;

export const fetchManufacturers = createAsyncThunk<Option[]>(
  "filterData/fetchManufacturers",
  async () => {
    // TODO: replace with real API call if needed
    return []; // placeholder: empty list
  }
);

export const fetchModels = createAsyncThunk<Option[], { manufacturer?: string | number }>(
  "filterData/fetchModels",
  async (_arg) => {
    // TODO: replace with real API call if needed
    return []; // placeholder: empty list
  }
);

export interface FilterDataState {
  manufacturers: Option[];
  models: Option[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FilterDataState = {
  manufacturers: [],
  models: [],
  status: "idle",
  error: null,
};

const filterDataSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    clearModels(state) {
      state.models = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // manufacturers
      .addCase(fetchManufacturers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action: PayloadAction<Option[]>) => {
        state.status = "succeeded";
        state.manufacturers = action.payload || [];
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error && String(action.error.message || action.error)) || "Failed";
      })
      // models
      .addCase(fetchModels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action: PayloadAction<Option[]>) => {
        state.status = "succeeded";
        state.models = action.payload || [];
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error && String(action.error.message || action.error)) || "Failed";
      });
  },
});

export const { clearModels } = filterDataSlice.actions;
export default filterDataSlice.reducer;
