// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import filterDataReducer from "./features/filterDataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    filterData: filterDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
