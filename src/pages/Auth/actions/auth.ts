
import { AuthState } from "../reducer/auth";

export const authRemoveToken = (state: AuthState) => {
  state.data = {};
  localStorage.removeItem("token");
};
