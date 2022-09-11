import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { login } from "../../../api/auth";
import { User } from "../../../types";

const AUTH_LOGIN_THUNK_TYPE = "AUTH_LOGIN_THUNK_TYPE";

export const authLoginFetch = createAsyncThunk(
  AUTH_LOGIN_THUNK_TYPE,
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const user = await login(data);
      localStorage.setItem("token", user.token!);
      localStorage.setItem("id", user._id!);
      // window.location.reload();
      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response?.data.data);
          return rejectWithValue(error);
        }
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);
