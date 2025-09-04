import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

export interface UserState {
  userData: User | null;
  isUserLoggedin: boolean;
}

const initialState: UserState = {
  userData: null,
  isUserLoggedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.userData = action.payload;
      state.isUserLoggedin = true;
    },
    logout(state) {
      state.userData = null;
      state.isUserLoggedin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
