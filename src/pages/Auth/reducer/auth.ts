import { createSlice } from "@reduxjs/toolkit";

import { authLoginFetch, authUserDataFetch } from "../thunk/auth";
import { authRemoveToken } from "../actions/auth";
import { User, UserCredential } from "firebase/auth";
import { User as UserType } from "../../../types";
import { DocumentReference } from "firebase/firestore";

export type AuthState = {
  loading: boolean;
  error: boolean | null;
  token?: string;
  data: Partial<User>;
  user: Partial<UserType>;
};

const initialState: AuthState = {
  loading: true,
  error: null,
  data: {},
  user: {},
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
        state.data = action.payload!;
      })
      .addCase(authLoginFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(authUserDataFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(authUserDataFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload!;
      })
      .addCase(authUserDataFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { authRemoveToken: authRemoveTokenAction } = authSlice.actions;

export default authSlice.reducer;
