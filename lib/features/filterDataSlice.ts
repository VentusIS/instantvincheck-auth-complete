import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Option = { id?: string | number; name?: string } | string;

export const fetchManufacturers = createAsyncThunk<Option[]>(
  "filterData/fetchManufacturers",
  async () => {
    // TODO: replace with real API call if needed
    // e.g., const res = await api.get("/manufacturers"); return res.data;
    return [];
  }
);

export const fetchModels = createAsyncThunk<Option[], { manufacturer?: string | number } | void>(
  "filterData/fetchModels",
  async (_arg) => {
    // TODO: replace with real API call if needed
    return [];
  }
);

export interface FilterDataState {
  manufacturers: Option[];
  models: Option[];
  loading: {
    manufacturers: boolean;
    models: boolean;
  };
  error: {
    manufacturers: string | null;
    models: string | null;
  };
}

const initialState: FilterDataState = {
  manufacturers: [],
  models: [],
  loading: {
    manufacturers: false,
    models: false,
  },
  error: {
    manufacturers: null,
    models: null,
  },
};

const filterDataSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    clearModels(state) {
      state.models = [];
      state.error.models = null;
      state.loading.models = false;
    },
  },
  extraReducers: (builder) => {
    // manufacturers
    builder
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading.manufacturers = true;
        state.error.manufacturers = null;
      })
      .addCase(
        fetchManufacturers.fulfilled,
        (state, action: PayloadAction<Option[]>) => {
          state.loading.manufacturers = false;
          state.manufacturers = action.payload || [];
        }
      )
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading.manufacturers = false;
        state.error.manufacturers =
          (action.error && String(action.error.message || action.error)) ||
          "Failed";
      });

    // models
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading.models = true;
        state.error.models = null;
      })
      .addCase(fetchModels.fulfilled, (state, action: PayloadAction<Option[]>) => {
        state.loading.models = false;
        state.models = action.payload || [];
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading.models = false;
        state.error.models =
          (action.error && String(action.error.message || action.error)) ||
          "Failed";
      });
  },
});

export const { clearModels } = filterDataSlice.actions;
export default filterDataSlice.reducer;
