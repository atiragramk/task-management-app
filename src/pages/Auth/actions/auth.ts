import { AuthState } from "../reducer/auth";

export const authRemoveToken = (state: AuthState) => {
  state.data = {};
  state.user = {};
  localStorage.removeItem("token");
};
