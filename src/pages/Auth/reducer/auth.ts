import { createSlice } from "@reduxjs/toolkit";
import { authLoginFetch } from "../thunk/auth";
import { authRemoveToken } from "../actions/auth";
import { User } from "../../../types";

export type AuthState = {
  loading: boolean;
  error: boolean | null;
  token?: string;
  data: Partial<User> | {};
};

const initialState: AuthState = {
  loading: true,
  error: null,
  data: {},
};

const name = "AUTH";
const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    authRemoveToken,
  },
  extraReducers(builder) {
    builder
      .addCase(authLoginFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(authLoginFetch.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(authLoginFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { authRemoveToken: authRemoveTokenAction } = authSlice.actions;

export default authSlice.reducer;
