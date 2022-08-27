import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { AuthState } from "../reducer/auth";

export const authRemoveToken = (state: AuthState) => {
  state.data = {};
  localStorage.removeItem("token");
  localStorage.removeItem("id");
};
