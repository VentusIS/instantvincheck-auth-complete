// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import filterDataReducer from "./features/filterDataSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    filterData: filterDataReducer,
    filter: filterReducer,        // <-- add this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
